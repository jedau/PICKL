#!/usr/bin/env node
import { execSync } from 'child_process'
import 'dotenv/config'

// Parse command line arguments
const args = process.argv.slice(2)
let featurePath = 'test/features/'
let cliTags = ''

// Process arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg === '--tags' && args[i + 1]) {
    cliTags = args[i + 1] ?? ''
    i++ // Skip next argument as it's the tag value
  } else if (arg && !arg.startsWith('--')) {
    featurePath = arg
  }
}

// CLI tags take precedence over environment variable
const tagsOption = cliTags || process.env.TAGS ? `--tags "${cliTags || process.env.TAGS}"` : ''

// Get existing NODE_OPTIONS or start with tsx/dotenv imports
const baseNodeOptions = '--import tsx --import dotenv/config'
const existingNodeOptions = process.env.NODE_OPTIONS ?? ''
const nodeOptions = existingNodeOptions
  ? `${baseNodeOptions} ${existingNodeOptions}`
  : baseNodeOptions

// const command = `cross-env NODE_OPTIONS="${nodeOptions}" cucumber-js --config cucumber.js --import 'test/support/**/*.ts' --import 'test/steps/**/*.ts' --format ./test/support/verbose-formatter.ts --format json:test-results/cucumber-report.json ${tagsOption} ${featurePath}`

const command = `cross-env NODE_OPTIONS="${nodeOptions}" cucumber-js --config cucumber.js --import 'test/support/**/*.ts' --import 'test/steps/**/*.ts' --format ./test/support/verbose-formatter.ts --format json:test-results/cucumber-report.json --format html:test-results/report.html ${tagsOption} ${featurePath}`

try {
  execSync(command, { stdio: 'inherit' })
} catch {
  // Provide helpful context - the actual error was already displayed above via stdio: 'inherit'
  console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.error('❌ TEST EXECUTION FAILED')
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.error('\n⚠️  Ignore the "Command failed: cross-env..." error above.')
  console.error('The actual error is displayed BEFORE that message.\n')
  console.error('Common issues to check:')
  console.error('  • Feature file syntax errors (indentation, keywords, colons)')
  console.error('  • Missing step definitions')
  console.error('  • Browser/Playwright installation issues')
  console.error('  • Incorrect tags or feature file paths\n')

  process.exit(1)
}
