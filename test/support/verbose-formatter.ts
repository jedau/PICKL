import { Formatter, IFormatterOptions } from '@cucumber/cucumber'
import * as messages from '@cucumber/messages'

class VerboseFormatter extends Formatter {
  private passedCount = 0
  private failedCount = 0
  private skippedCount = 0
  private totalSteps = 0
  private startTime = 0
  private scenariosPassed = 0
  private scenariosFailed = 0
  private scenariosSkipped = 0
  private totalScenarios = 0

  constructor(options: IFormatterOptions) {
    super(options)

    options.eventBroadcaster.on('envelope', (envelope: messages.Envelope) => {
      if (envelope.testRunStarted) {
        this.startTime = Date.now()
      }
      if (envelope.testCaseStarted) {
        this.logTestCaseStarted(envelope.testCaseStarted)
      }
      if (envelope.testCaseFinished) {
        this.trackScenarioResult(envelope.testCaseFinished)
      }
      if (envelope.testStepStarted) {
        this.logTestStepStarted(envelope.testStepStarted)
      }
      if (envelope.testStepFinished) {
        this.logTestStepFinished(envelope.testStepFinished)
      }
      if (envelope.testRunFinished) {
        this.logTestRunFinished()
      }
    })
  }

  private logTestCaseStarted(testCaseStarted: messages.TestCaseStarted) {
    const testCase = this.eventDataCollector.getTestCaseAttempt(testCaseStarted.id)
    if (testCase) {
      this.log(`\n▶️  Running: ${testCase.pickle.name}\n`)
    }
  }

  private trackScenarioResult(testCaseFinished: messages.TestCaseFinished) {
    const testCase = this.eventDataCollector.getTestCaseAttempt(testCaseFinished.testCaseStartedId)
    if (testCase) {
      this.totalScenarios++
      const worstResult = testCase.worstTestStepResult
      const status: messages.TestStepResultStatus = worstResult.status

      if (status === messages.TestStepResultStatus.PASSED) {
        this.scenariosPassed++
      } else if (status === messages.TestStepResultStatus.FAILED) {
        this.scenariosFailed++
      } else if (status === messages.TestStepResultStatus.SKIPPED) {
        this.scenariosSkipped++
      }
    }
  }

  private logTestStepStarted(testStepStarted: messages.TestStepStarted) {
    const testCase = this.eventDataCollector.getTestCaseAttempt(testStepStarted.testCaseStartedId)
    if (testCase) {
      const testStep = testCase.testCase?.testSteps?.find(s => s.id === testStepStarted.testStepId)

      if (testStep?.pickleStepId) {
        const gherkinStep = testCase.pickle.steps.find(s => s.id === testStep.pickleStepId)
        if (gherkinStep?.text) {
          this.log(`  ⏳ ${gherkinStep.text}`)
        }
      }
    }
  }

  private getStatusIcon(status: messages.TestStepResultStatus): string {
    if (status === messages.TestStepResultStatus.PASSED) {
      return '✅'
    }
    if (status === messages.TestStepResultStatus.FAILED) {
      return '❌'
    }
    if (status === messages.TestStepResultStatus.SKIPPED) {
      return '⊘'
    }
    return '⚠️'
  }

  private updateStepCounts(status: messages.TestStepResultStatus): void {
    this.totalSteps++
    if (status === messages.TestStepResultStatus.PASSED) {
      this.passedCount++
    } else if (status === messages.TestStepResultStatus.FAILED) {
      this.failedCount++
    } else if (status === messages.TestStepResultStatus.SKIPPED) {
      this.skippedCount++
    }
  }

  private logTestStepFinished(testStepFinished: messages.TestStepFinished) {
    const testCase = this.eventDataCollector.getTestCaseAttempt(testStepFinished.testCaseStartedId)
    if (!testCase) {
      return
    }

    const testStep = testCase.testCase?.testSteps?.find(s => s.id === testStepFinished.testStepId)
    if (!testStep?.pickleStepId) {
      return
    }

    const gherkinStep = testCase.pickle.steps.find(s => s.id === testStep.pickleStepId)
    if (!gherkinStep?.text) {
      return
    }

    const status = testStepFinished.testStepResult.status
    const icon = this.getStatusIcon(status)
    this.updateStepCounts(status)

    // Clear line and rewrite with final icon
    // \r returns the cursor to the start of the line, and \x1b[K clears the line.
    // This enables in-place updates of the step status in the terminal.
    this.log(`\r\x1b[K  ${icon} ${gherkinStep.text}\n`)
  }

  private logTestRunFinished() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(3)
    this.log(`\nTest Execution Summary:`)

    // Scenarios summary
    this.log(`\n${this.totalScenarios} scenarios (${this.scenariosPassed} passed`)
    if (this.scenariosFailed > 0) {
      this.log(`, ${this.scenariosFailed} failed`)
    }
    if (this.scenariosSkipped > 0) {
      this.log(`, ${this.scenariosSkipped} skipped`)
    }
    this.log(`)\n`)

    // Steps summary
    this.log(`${this.totalSteps} steps (${this.passedCount} passed`)
    if (this.failedCount > 0) {
      this.log(`, ${this.failedCount} failed`)
    }
    if (this.skippedCount > 0) {
      this.log(`, ${this.skippedCount} skipped`)
    }
    this.log(`)\n${duration}s\n`)
  }
}

export default VerboseFormatter
