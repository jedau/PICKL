#!/usr/bin/env tsx
import { existsSync, readFileSync } from 'fs'

import Debug from 'debug'
const debug = Debug('framework:validate-env')

/**
 * Environment variable validation configuration
 */
interface EnvVarConfig {
  name: string
  required: boolean
  pattern?: RegExp
  description: string
}

/**
 * Environment variables to validate
 */
const envVars: EnvVarConfig[] = [
  {
    name: 'BASE_URL',
    required: false,
    pattern: /^https?:\/\/.+/,
    description: 'Must be a valid HTTP(S) URL',
  },
  {
    name: 'HEADLESS',
    required: false,
    pattern: /^(true|false)$/,
    description: 'Must be "true" or "false"',
  },
  {
    name: 'BROWSER',
    required: false,
    pattern: /^(chromium|firefox|webkit)$/,
    description: 'Must be "chromium", "firefox", or "webkit"',
  },
  {
    name: 'TAGS',
    required: false,
    description: 'Cucumber tag filter (e.g., "@smoke", "not @skip")',
  },
]

/**
 * Patterns that indicate potentially dangerous secrets
 */
const dangerousPatterns = [
  { pattern: /prod.*password/i, message: 'Production password detected' },
  { pattern: /prod.*secret/i, message: 'Production secret detected' },
  { pattern: /prod.*key/i, message: 'Production key detected' },
  { pattern: /api.*secret/i, message: 'API secret detected' },
  { pattern: /AKIA[0-9A-Z]{16}/i, message: 'AWS access key detected' },
  { pattern: /sk-[a-zA-Z0-9]{48}/i, message: 'OpenAI API key detected' },
  { pattern: /ghp_[a-zA-Z0-9]{36}/i, message: 'GitHub personal access token detected' },
  { pattern: /AIza[0-9A-Za-z\\-_]{35}/i, message: 'Google API key detected' },
]

function checkEnvFileExists(): void {
  if (!existsSync('.env')) {
    debug('ℹ️  .env file not found. Using defaults from .env.example')
    debug('   (This is OK for CI/CD environments)\n')
  }
}

function checkGitignore(): { hasError: boolean; hasWarning: boolean } {
  try {
    const gitIgnore = readFileSync('.gitignore', 'utf-8')
    if (!gitIgnore.includes('.env')) {
      console.error('❌ CRITICAL: .env is not in .gitignore!')
      console.error('   Add ".env" to .gitignore immediately to prevent secret leaks\n')
      return { hasError: true, hasWarning: false }
    }
    debug('✅ .env is properly gitignored')
    return { hasError: false, hasWarning: false }
  } catch {
    console.warn('⚠️  Could not read .gitignore file')
    return { hasError: false, hasWarning: true }
  }
}

function checkEnvExample(): boolean {
  if (!existsSync('.env.example')) {
    console.error('❌ ERROR: .env.example file is missing!')
    console.error('   This file should contain placeholder values for all environment variables\n')
    return true
  }
  debug('✅ .env.example exists')
  return false
}

function maskValue(value: string): string {
  return value.length > 20
    ? `${value.substring(0, 10)}...${value.substring(value.length - 5)}`
    : value
}

function validateEnvVar(envVar: EnvVarConfig): boolean {
  const value = process.env[envVar.name]

  if (envVar.required && !value) {
    console.error(`❌ ERROR: Required variable ${envVar.name} is not set`)
    console.error(`   ${envVar.description}`)
    return true
  }

  if (value && envVar.pattern && !envVar.pattern.test(value)) {
    console.error(`❌ ERROR: ${envVar.name}="${value}" is invalid`)
    console.error(`   ${envVar.description}\n`)
    return true
  }

  if (value) {
    debug(`✅ ${envVar.name}="${maskValue(value)}"`)
  }

  return false
}

function isSystemVariable(key: string): boolean {
  return (
    key.startsWith('npm_') ||
    key.startsWith('NODE_') ||
    key === 'PATH' ||
    key === 'PWD' ||
    key === 'SHELL' ||
    key === 'HOME' ||
    key === 'USER'
  )
}

function scanForDangerousPatterns(): boolean {
  let hasErrors = false

  debug('🔒 Scanning for potentially sensitive data...\n')

  for (const [key, value] of Object.entries(process.env)) {
    if (isSystemVariable(key)) {
      continue
    }

    for (const { pattern, message } of dangerousPatterns) {
      const keyMatch = pattern.test(key)
      const valueMatch = value && pattern.test(value)

      if (keyMatch || valueMatch) {
        console.error(`❌ ERROR: ${message}`)
        console.error(`   Found in: ${key}`)
        console.error('   Production credentials should NEVER be used in tests!\n')
        hasErrors = true
      }
    }
  }

  return hasErrors
}

/**
 * Main validation function
 */
function validateEnvironment(): void {
  debug('🔍 Validating environment configuration...\n')

  checkEnvFileExists()

  const { hasError, hasWarning } = checkGitignore()
  let hasErrors = hasError
  const hasWarnings = hasWarning

  if (checkEnvExample()) {
    hasErrors = true
  }

  debug('')

  for (const envVar of envVars) {
    if (validateEnvVar(envVar)) {
      hasErrors = true
    }
  }

  debug('')

  if (scanForDangerousPatterns()) {
    hasErrors = true
  }

  // Summary
  debug('─'.repeat(60))

  if (hasErrors) {
    console.error('\n❌ Environment validation FAILED!')
    console.error('\n📚 See docs/SECRETS-MANAGEMENT.md for guidance on:')
    console.error('   - Setting up .env files correctly')
    console.error('   - Using test credentials only')
    console.error('   - Proper gitignore configuration\n')
    process.exit(1)
  }

  if (hasWarnings) {
    debug('\n⚠️  Environment validation passed with warnings')
    debug('   Please review the warnings above\n')
  } else {
    debug('\n✅ Environment validation passed!')
    debug('   All checks completed successfully\n')
  }
}

// Run validation
try {
  validateEnvironment()
} catch (error) {
  console.error('💥 Unexpected error during validation:', error)
  process.exit(1)
}
