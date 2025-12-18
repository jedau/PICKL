import Debug from 'debug'
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
const debug = Debug('framework:generate-pr-comment')

interface CucumberFeature {
  name: string
  elements: CucumberScenario[]
}

interface CucumberScenario {
  name: string
  type: string
  steps: CucumberStep[]
  tags?: { name: string }[]
}

interface CucumberStep {
  result: {
    status: string
    duration?: number
    error_message?: string
  }
}

interface TestResults {
  totalScenarios: number
  passedScenarios: number
  failedScenarios: number
  skippedScenarios: number
  totalSteps: number
  passedSteps: number
  failedSteps: number
  skippedSteps: number
  duration: number
  features: FeatureSummary[]
}

interface FeatureSummary {
  name: string
  scenarios: number
  passed: number
  failed: number
  skipped: number
}

async function parseTestResults(): Promise<TestResults> {
  const reportPath = 'test-results/cucumber-report.json'

  if (!existsSync(reportPath)) {
    throw new Error(`Report file not found: ${reportPath}`)
  }

  const content = await readFile(reportPath, 'utf-8')
  const features = JSON.parse(content) as CucumberFeature[]

  const results: TestResults = {
    totalScenarios: 0,
    passedScenarios: 0,
    failedScenarios: 0,
    skippedScenarios: 0,
    totalSteps: 0,
    passedSteps: 0,
    failedSteps: 0,
    skippedSteps: 0,
    duration: 0,
    features: [],
  }

  for (const feature of features) {
    const featureSummary: FeatureSummary = {
      name: feature.name,
      scenarios: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    }

    for (const scenario of feature.elements) {
      if (scenario.type !== 'scenario') {
        continue
      }

      featureSummary.scenarios++
      results.totalScenarios++

      let scenarioStatus = 'passed'
      for (const step of scenario.steps) {
        results.totalSteps++
        results.duration += step.result.duration ?? 0

        if (step.result.status === 'passed') {
          results.passedSteps++
        } else if (step.result.status === 'failed') {
          results.failedSteps++
          scenarioStatus = 'failed'
        } else if (step.result.status === 'skipped') {
          results.skippedSteps++
          if (scenarioStatus !== 'failed') {
            scenarioStatus = 'skipped'
          }
        }
      }

      if (scenarioStatus === 'passed') {
        featureSummary.passed++
        results.passedScenarios++
      } else if (scenarioStatus === 'failed') {
        featureSummary.failed++
        results.failedScenarios++
      } else {
        featureSummary.skipped++
        results.skippedScenarios++
      }
    }

    if (featureSummary.scenarios > 0) {
      results.features.push(featureSummary)
    }
  }

  return results
}

function formatDuration(nanoseconds: number): string {
  const seconds = nanoseconds / 1_000_000_000
  if (seconds < 60) {
    return `${seconds.toFixed(2)}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}m ${remainingSeconds}s`
}

function generateComment(results: TestResults): string {
  const passRate =
    results.totalScenarios > 0
      ? ((results.passedScenarios / results.totalScenarios) * 100).toFixed(1)
      : '0.0'

  const status = results.failedScenarios === 0 ? '✅' : '❌'
  const statusText = results.failedScenarios === 0 ? '**PASSED**' : '**FAILED**'

  let comment = `## ${status} Test Results ${statusText}\n\n`

  comment += `### 📊 Summary\n\n`
  comment += `| Metric | Count |\n`
  comment += `|--------|-------|\n`
  comment += `| **Total Scenarios** | ${results.totalScenarios} |\n`
  comment += `| ✅ Passed | ${results.passedScenarios} |\n`
  comment += `| ❌ Failed | ${results.failedScenarios} |\n`
  comment += `| ⏭️ Skipped | ${results.skippedScenarios} |\n`
  comment += `| **Pass Rate** | ${passRate}% |\n`
  comment += `| **Duration** | ${formatDuration(results.duration)} |\n\n`

  if (results.features.length > 0) {
    comment += `### 📝 Features\n\n`
    comment += `| Feature | Scenarios | ✅ Passed | ❌ Failed | ⏭️ Skipped |\n`
    comment += `|---------|-----------|----------|----------|----------|\n`

    for (const feature of results.features) {
      const icon = feature.failed > 0 ? '❌' : '✅'
      comment += `| ${icon} ${feature.name} | ${feature.scenarios} | ${feature.passed} | ${feature.failed} | ${feature.skipped} |\n`
    }
    comment += `\n`
  }

  if (results.failedScenarios > 0) {
    comment += `### 🔍 Action Required\n\n`
    comment += `${results.failedScenarios} scenario(s) failed. Please review the test results and fix the failing tests.\n\n`
  }

  comment += `### 📦 Artifacts\n\n`
  comment += `- [📄 Full HTML Report](https://github.com/$\{GITHUB_REPOSITORY}/actions/runs/$\{GITHUB_RUN_ID})\n`
  comment += `- [📊 Test Results JSON](https://github.com/$\{GITHUB_REPOSITORY}/actions/runs/$\{GITHUB_RUN_ID})\n`
  if (results.failedScenarios > 0) {
    comment += `- [📸 Screenshots](https://github.com/$\{GITHUB_REPOSITORY}/actions/runs/$\{GITHUB_RUN_ID}) – open this run and download the "Screenshots" artifact from the Artifacts section (if available)\n`
    comment += `- [🎥 Videos](https://github.com/$\{GITHUB_REPOSITORY}/actions/runs/$\{GITHUB_RUN_ID}) – open this run and download the "Videos" artifact from the Artifacts section (if available)\n`
  }

  comment += `\n---\n`
  comment += `*Generated by PICKL Test Automation* 🥒\n`

  return comment
}

async function generatePRComment(): Promise<void> {
  debug('📊 Parsing test results...')
  const results = await parseTestResults()

  debug('📝 Generating PR comment...')
  const comment = generateComment(results)

  debug(comment)

  // Write to file for GitHub Actions to use
  await writeFile('test-results/pr-comment.md', comment, 'utf-8')

  debug('✅ PR comment generated: test-results/pr-comment.md')

  // Log test failures but do not exit; the CI workflow handles test failure status separately
  if (results.failedScenarios > 0) {
    debug(`⚠️ Tests have ${results.failedScenarios} failed scenario(s).`)
  }
}

// Run PR comment generation
void generatePRComment().catch((error: unknown) => {
  debug('❌ Error generating PR comment:', error instanceof Error ? error.message : 'Unknown error')
  process.exit(1)
})
