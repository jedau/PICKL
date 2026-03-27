#!/usr/bin/env node
import { execFileSync } from 'child_process'
import 'dotenv/config'
import { existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Get current directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Path to cucumber-js binary
const cucumberPath = join(
  __dirname,
  '..',
  'node_modules',
  '@cucumber',
  'cucumber',
  'bin',
  'cucumber.js',
)

// Parse command line arguments
const cliArgs = process.argv.slice(2)
let featurePath = 'test/features/'
let cliTags = ''

// Process arguments
for (let i = 0; i < cliArgs.length; i++) {
  const arg = cliArgs[i]
  if (arg === '--tags' && cliArgs[i + 1]) {
    cliTags = cliArgs[i + 1] ?? ''
    i++ // Skip next argument as it's the tag value
  } else if (arg && !arg.startsWith('--')) {
    featurePath = arg
  }
}

// Build cucumber-js arguments array (safe from command injection)
const args = [
  '--config',
  'cucumber.js',
  '--import',
  'test/support/**/*.ts',
  '--import',
  'test/steps/**/*.ts',
  '--format',
  './test/support/verbose-formatter.ts',
  '--format',
  'json:test-results/cucumber-report.json',
]

// Add tags if specified (CLI tags take precedence over environment variable)
if (cliTags || process.env.TAGS) {
  args.push('--tags', cliTags || (process.env.TAGS ?? ''))
}

// Add feature path
args.push(featurePath)

// Get existing NODE_OPTIONS or start with tsx/dotenv imports
const baseNodeOptions = '--import tsx --import dotenv/config'
const existingNodeOptions = process.env.NODE_OPTIONS ?? ''
const nodeOptions = existingNodeOptions
  ? `${baseNodeOptions} ${existingNodeOptions}`
  : baseNodeOptions

// Validate cucumber binary exists before attempting execution
if (!existsSync(cucumberPath)) {
  console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.error('❌ SETUP ERROR: Cucumber binary not found')
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.error(`\n❌ Cucumber binary does not exist at:`)
  console.error(`   ${cucumberPath}\n`)
  console.error('💡 Please ensure dependencies are installed:')
  console.error('   npm install\n')
  process.exit(1)
}

try {
  // Use execFileSync with separate arguments array (no shell, no injection risk)
  // Use process.execPath to ensure same Node.js binary (avoids PATH manipulation)
  execFileSync(process.execPath, [cucumberPath, ...args], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: nodeOptions,
    },
  })
} catch (error) {
  // Capture error details for proper debugging
  const err = error as Error & { code?: string; status?: number; stderr?: Buffer | string }

  console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.error('❌ TEST EXECUTION FAILED')
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  // Check if this is a setup/execution problem vs actual test failures
  const isModuleNotFound =
    err.message?.includes('Cannot find module') ||
    err.message?.includes('MODULE_NOT_FOUND') ||
    err.message?.includes('ENOENT')
  const isSetupError = err.code && err.code !== 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER'

  // If the error occurred before spawning (e.g., file not found, permission denied)
  // OR if Node reported a module not found error
  if (isSetupError || isModuleNotFound) {
    console.error('\n❌ Failed to execute test runner:')
    console.error(`   Error: ${err.message}`)
    if (err.code) {
      console.error(`   Code: ${err.code}`)
    }
    console.error('\n💡 Possible causes:')
    if (isModuleNotFound) {
      console.error('  • Cucumber dependencies missing or corrupted')
      console.error('  • Run: npm install')
    }
    console.error('  • Node.js binary not found or not executable')
    console.error('  • Permission denied to execute files')
    console.error(`  • Tried to execute: ${process.execPath}`)
    console.error(`  • With cucumber at: ${cucumberPath}\n`)
  } else {
    // Test execution started but failed (cucumber ran but tests failed)
    console.error('\n⚠️  Test failures or errors occurred during execution.')
    console.error('\nCommon issues to check:')
    console.error('  • Feature file syntax errors (indentation, keywords, colons)')
    console.error('  • Missing step definitions')
    console.error('  • Browser/Playwright installation issues')
    console.error('  • Incorrect tags or feature file paths\n')
  }

  process.exit(1)
}
