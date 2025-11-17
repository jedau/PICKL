#!/usr/bin/env node
import 'dotenv/config'
import { exec } from 'child_process'

// Parse command line arguments
const args = process.argv.slice(2)
let featurePath = 'test/features/'
let cliTags = ''

// Process arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg === '--tags' && args[i + 1]) {
    cliTags = args[i + 1]
    i++ // Skip next argument as it's the tag value
  } else if (arg && !arg.startsWith('--')) {
    featurePath = arg
  }
}

// CLI tags take precedence over environment variable
const tagsOption = cliTags
  ? `--tags "${cliTags}"`
  : process.env.TAGS
    ? `--tags "${process.env.TAGS}"`
    : ''

const command = `cross-env NODE_OPTIONS="--import tsx --import dotenv/config" cucumber-js --config cucumber.js --import 'test/support/**/*.ts' --import 'test/steps/**/*.ts' --format ./test/support/verbose-formatter.ts --format json:test-results/cucumber-report.json ${tagsOption} ${featurePath}`

const child = exec(command, error => {
  if (error) {
    process.exit(error.code ?? 1)
  }
})

child.stdout?.pipe(process.stdout)
child.stderr?.pipe(process.stderr)
