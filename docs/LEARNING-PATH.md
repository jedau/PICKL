# PICKL Learning Path 🥒

A structured 3-week intensive program to master BDD test automation with Playwright and Cucumber.

## 📋 Overview

This learning path is an intensive, hands-on program where you'll learn the PICKL framework while automating tests for a website of your choice. You'll receive daily support, feedback sessions, and culminate with a demo of your automated test suite.

### Program Structure

- **Total Duration**: 3 weeks (14 days) + Week 0 (pre-work)
- **Format**: Self-paced learning with daily online check-ins
- **Commitment**: Full-time intensive (6-8 hours daily)
- **Final Deliverable**: Automated test suite demo

### Prerequisites

- Basic understanding of JavaScript/TypeScript
- Familiarity with web applications
- Ability to commit to full-time learning for 3 weeks
- A website/application you want to automate (discussed in Week 0)

---

## 🎬 Week 0: Introduction & Preparation

### Goal

Prepare for the intensive program and set up your learning environment.

### Schedule

#### Introduction Session (1 hour, Online)

**Topics:**

- Program overview and expectations
- Learning objectives and outcomes
- Support structure (daily stand-ups, review sessions)
- Final demo and retrospective format
- Q&A

**Deliverables:**

- Choose a website/application to automate (e.g., e-commerce site, SaaS product, public API)
- Identify key test scenarios for your chosen site
- Set personal learning goals

---

#### Pre-Requisites (Self-Paced)

**Complete before Week 1 begins:**

- ✅ JavaScript/TypeScript fundamentals review
- ✅ Understanding of async/await
- ✅ Basic HTML/CSS selector knowledge
- ✅ Git basics
- ✅ Development environment setup

**Resources:**

- [Getting Started Guide](GETTING-STARTED.md)
- TypeScript Handbook (optional refresher)
- Git basics tutorial (if needed)

---

#### Detailed Walkthrough Session (1 hour, Online)

**Topics:**

- PICKL architecture deep dive
- How Cucumber connects to Playwright
- Page Object Model pattern explained
- Custom World pattern
- Test execution flow
- Reporting and debugging tools

**Activities:**

- Live demo of test execution
- Code walkthrough of existing tests
- Q&A about framework internals

**Preparation:**

- Read [Architecture Documentation](ARCHITECTURE.md) beforehand
- Prepare questions about the framework

---

## 🚀 Week 1: Foundation & Core Concepts

### Goal

Learn PICKL fundamentals while setting up your test automation project.

### Support Structure

- **Daily Stand-Up**: 15 minutes, online, every morning
  - What you learned yesterday
  - What you're working on today
  - Any blockers or questions

- **Initial Reviews**: 30-minute optional sessions, book as needed
  - Code review and feedback
  - Troubleshooting assistance
  - Best practices guidance

---

### Day 1: Setup and Exploration + Understanding Page Objects

**Self-Paced Learning**

**Morning: Setup and Exploration (3-4 hours)**

- Complete [Getting Started Guide](GETTING-STARTED.md)
- Install and verify all dependencies
- Run existing tests with `npm test`
- Read [Architecture Documentation](ARCHITECTURE.md) - Project Structure section
- Explore the `pages/`, `test/features/`, and `test/steps/` directories
- Generate and review HTML reports

**Exercise**: [Exercise 1.1 - Run and Understand Existing Tests](TRAINING-EXERCISES.md#exercise-11-run-and-understand-existing-tests)

**Afternoon: Understanding Page Objects (3-4 hours)**

- Study `pages/LoginPage.ts` line by line
- Read [Architecture - Page Object Model](ARCHITECTURE.md#page-object-model)
- Review [API Reference - LoginPage](API-REFERENCE.md#loginpage)
- Study `pages/CheckboxesPage.ts`
- Compare page objects to identify common patterns

**Your Project:**

- Create project structure for your chosen website
- Identify 3-5 pages to automate initially
- Create your first page object file

**Checkpoint**: Can you explain the Page Object Model pattern in your own words?

---

### Day 2: Gherkin + Step Definitions + Hands-On Practice + Automate

**Self-Paced Learning**

**Morning: Gherkin and Feature Files (2 hours)**

- Read [Writing Tests Guide](WRITING-TESTS.md) - Gherkin Syntax section
- Study `test/features/login.feature` and `test/features/checkboxes.feature`
- Learn about Background, Scenario, and tags (@smoke, @positive, @negative)

**Exercise**: [Exercise 1.2 - Modify an Existing Scenario](TRAINING-EXERCISES.md#exercise-12-modify-an-existing-scenario)

**Late Morning: Step Definitions (2 hours)**

- Read [Architecture - Custom World Pattern](ARCHITECTURE.md#custom-world-pattern)
- Study `test/steps/login.steps.ts` and `test/steps/checkboxes.steps.ts`
- Understand the relationship between Gherkin and TypeScript
- Learn the `this: ICustomWorld` pattern

**Exercise**: Trace the flow from a Gherkin step to its implementation

**Afternoon: Hands-On Practice (2 hours)**

- [Exercise 1.3 - Create Your First Page Object](TRAINING-EXERCISES.md#exercise-13-create-your-first-page-object)
- [Exercise 1.4 - Write Your First Feature File](TRAINING-EXERCISES.md#exercise-14-write-your-first-feature-file)
- [Exercise 1.5 - Implement Step Definitions](TRAINING-EXERCISES.md#exercise-15-implement-step-definitions)

**Evening: Automate Your Tests (2-3 hours)**

**Your Project:**

- Write feature files for your chosen website
- Implement page objects for those features
- Create step definitions
- Run your tests and fix any issues
- Generate reports

**Milestone**: You have working automated tests for your chosen website!

---

### Day 3: Scenario Outlines + Form Handling

**Self-Paced Learning**

**Morning: Scenario Outlines (3 hours)**

- Read about Scenario Outlines in [Writing Tests](WRITING-TESTS.md)
- Study the Scenario Outline example in `login.feature`
- Understand Examples tables and data-driven testing

**Exercise**: [Exercise 2.5 - Scenario Outline with Data Tables](TRAINING-EXERCISES.md#exercise-25-scenario-outline-with-data-tables)

**Your Project:**

- Convert at least 2 scenarios to Scenario Outlines
- Add multiple test data examples
- Test edge cases with different data sets

**Afternoon: Form Handling (3-4 hours)**

- Research different HTML input types
- Study Playwright's form interaction methods: `fill()`, `check()`, `selectOption()`, `setInputFiles()`
- Learn about handling dropdowns, checkboxes, radio buttons, file uploads

**Exercise**: [Exercise 2.1 - Add Form Page with Multiple Input Types](TRAINING-EXERCISES.md#exercise-21-add-form-page-with-multiple-input-types)

**Your Project:**

- Add form interaction tests to your project
- Handle different input types in your application
- Test form validation scenarios

**Checkpoint**: Can you handle any form element confidently?

---

### Day 4: Dynamic Content + File Operations

**Self-Paced Learning**

**Morning: Dynamic Content (3-4 hours)**

- Learn about Playwright's auto-waiting mechanism
- Understand `waitForSelector`, `waitForLoadState`, `waitForResponse`
- Read about handling AJAX requests and dynamic page updates

**Exercise**: [Exercise 2.2 - Working with Dynamic Content](TRAINING-EXERCISES.md#exercise-22-working-with-dynamic-content)

**Your Project:**

- Identify dynamic elements in your application
- Add wait strategies for dynamic content
- Test scenarios with asynchronous operations

**Afternoon: File Operations (3 hours)**

- Research file upload/download in Playwright
- Learn about `setInputFiles()` and download handling
- Create test fixtures directory for sample files

**Exercise**: [Exercise 2.3 - File Upload Functionality](TRAINING-EXERCISES.md#exercise-23-file-upload-functionality)

**Your Project (if applicable):**

- Add file upload/download tests
- Verify uploaded files
- Handle download assertions

**Checkpoint**: Can you handle asynchronous operations and file interactions?

---

### Day 5: Code Reusability

**Self-Paced Learning (Full Day: 6-8 hours)**

**Morning: Code Reusability Concepts (2 hours)**

- Review DRY (Don't Repeat Yourself) principle
- Study helper patterns and utility functions
- Learn about step definition reusability

**Afternoon: Refactoring (4-6 hours)**

- [Exercise 2.4 - Create a Reusable Step Helper](TRAINING-EXERCISES.md#exercise-24-create-a-reusable-step-helper)

**Your Project:**

- Identify duplicated code in your project
- Create helper functions and utilities
- Refactor step definitions for reusability
- Refactor page objects to share common patterns
- Document before/after comparison

**Run full test suite to verify nothing broke!**

**Week 1 Milestone**: You have a clean, maintainable test suite with your initial scenarios automated!

---

### Week 1 Assessment

Before moving to Week 2, ensure you can:

- [ ] Explain the Page Object Model pattern
- [ ] Write Gherkin scenarios following best practices
- [ ] Create page objects with proper locators and methods
- [ ] Implement step definitions connecting Gherkin to code
- [ ] Use Scenario Outlines for data-driven tests
- [ ] Handle forms, dynamic content, and file operations
- [ ] Write clean, reusable code
- [ ] Run tests and interpret reports

---

## 🎯 Week 2: Advanced Patterns & Integration

### Goal

Master advanced patterns and prepare for professional-grade test automation.

### Support Structure

- **Daily Stand-Up**: 15 minutes, online, every morning
- **Review Sessions**: Available upon request

---

### Day 6: Custom Wait Utilities + Test Data Management

**Self-Paced Learning**

**Morning: Custom Wait Utilities (3-4 hours)**

- Read about Playwright's waiting strategies in depth
- Study async/await patterns and Promise handling
- Review timing issues in [Common Mistakes](COMMON-MISTAKES.md)

**Exercise**: [Exercise 3.1 - Custom Helper Utilities](TRAINING-EXERCISES.md#exercise-31-custom-helper-utilities)

**Your Project:**

- Create custom wait utilities for your application's specific needs
- Replace hard-coded waits with intelligent waiting strategies
- Add retry logic for flaky operations

**Afternoon: Test Data Management (3-4 hours)**

- Learn about test data fixtures and factories
- Study data isolation strategies
- Understand test data cleanup

**Exercise**: [Exercise 3.2 - Test Data Management System](TRAINING-EXERCISES.md#exercise-32-test-data-management-system)

**Your Project:**

- Create test data fixtures for your application
- Implement data builders/factories
- Centralize test data management
- Add data cleanup strategies

**Checkpoint**: Is your test data organized and maintainable?

---

### Day 7: Error Handling + Base Page Class

**Self-Paced Learning**

**Morning: Error Handling (3 hours)**

- Read about TypeScript error handling best practices
- Study custom error classes
- Learn about graceful failure handling

**Exercise**: [Exercise 3.3 - Custom Error Handling](TRAINING-EXERCISES.md#exercise-33-custom-error-handling)

**Your Project:**

- Implement custom error classes for your project
- Add meaningful error messages
- Improve error logging and debugging

**Afternoon: Base Page Class (3-4 hours)**

- Study object-oriented inheritance in TypeScript
- Learn about abstract classes and interfaces
- Understand the DRY principle applied to page objects

**Exercise**: [Exercise 3.4 - Base Page Class](TRAINING-EXERCISES.md#exercise-34-base-page-class)

**Your Project:**

- Create BasePage with common methods
- Refactor all page objects to extend BasePage
- Eliminate code duplication across pages
- Add common utilities (navigation, assertions, waits)

**Checkpoint**: Are your page objects following OOP principles?

---

### Day 8: API Integration

**Self-Paced Learning (Full Day: 6-8 hours)**

**Morning: API Testing Concepts (2 hours)**

- Learn about Playwright's API testing capabilities
- Study the Custom World extension pattern
- Understand API + UI integration strategies

**Afternoon: Implementation (4-6 hours)**

- [Exercise 3.5 - API Integration Test](TRAINING-EXERCISES.md#exercise-35-api-integration-test)

**Your Project (if applicable):**

- Identify API endpoints used by your application
- Add API test coverage
- Implement hybrid API + UI tests
- Use API calls for test setup/teardown
- Add API response validations

**Alternative (if your site has no accessible API):**

- Focus on advanced UI patterns
- Add visual regression testing
- Implement accessibility testing
- Add performance metrics

**Checkpoint**: Can you integrate multiple testing layers?

---

### Day 9: Custom Formatter + Parallel Execution

**Self-Paced Learning**

**Morning: Custom Formatter (3-4 hours)**

- Read [Architecture - Formatter System](ARCHITECTURE.md#formatter-system)
- Study `test/support/verbose-formatter.ts` in detail
- Understand Cucumber event system

**Exercise**: [Exercise 4.1 - Custom Formatter Enhancement](TRAINING-EXERCISES.md#exercise-41-custom-formatter-enhancement)

**Your Project:**

- Enhance reporting for your specific needs
- Add custom metrics and logging
- Improve test output readability

**Afternoon: Parallel Execution (3 hours)**

- Research Cucumber parallel execution strategies
- Learn about test isolation principles
- Understand potential race conditions

**Exercise**: [Exercise 4.2 - Parallel Execution Setup](TRAINING-EXERCISES.md#exercise-42-parallel-execution-setup)

**Your Project:**

- Configure parallel test execution
- Fix any test isolation issues
- Optimize test execution time
- Measure performance improvements

**Checkpoint**: Are your tests running efficiently in parallel?

---

### Day 10: Debugging & Review

**Self-Paced Learning (Full Day: 6-8 hours)**

**Morning: Debugging Techniques (3 hours)**

- Review [Troubleshooting Guide](TROUBLESHOOTING.md)
- Practice debugging techniques:
  - Using VS Code debugger
  - Playwright Inspector
  - Trace viewer
  - Video analysis
  - Screenshot comparison

**Your Project:**

- Add debugging hooks to your tests
- Implement better logging
- Add screenshots on failure
- Configure trace collection

**Afternoon: Comprehensive Review (3-5 hours)**

**Your Project:**

- Run complete test suite and fix all failures
- Review code quality and refactor as needed
- Ensure all tests follow best practices
- Update documentation
- Add/improve comments
- Verify reports are comprehensive
- Test in different browsers (if applicable)
- Prepare preliminary demo

**Week 2 Milestone**: You have a professional-grade, production-ready test automation suite!

---

### Week 2 Assessment

Before moving to Week 3, ensure you have:

- [ ] Custom wait utilities implemented
- [ ] Centralized test data management
- [ ] Proper error handling throughout
- [ ] Base page class with common utilities
- [ ] API integration (if applicable)
- [ ] Enhanced custom formatter
- [ ] Parallel execution configured
- [ ] Comprehensive debugging setup
- [ ] All tests passing consistently
- [ ] Clean, documented code

---

## 🎬 Week 3: Finalization & Presentation

### Goal

Polish your test suite, receive feedback, and deliver a professional demo.

---

### Day 11: Final Feedback Session

**Online Session (~30 minutes per learner)**

**Format:**

- Present your test automation suite
- Code review with instructor
- Receive feedback and suggestions
- Identify areas for improvement
- Discuss demo presentation structure

**Preparation:**

- Prepare a brief overview of your project
- List specific questions or concerns
- Have your code ready for review
- Document current test coverage

**Deliverable**: Action items list for Day 12

---

### Day 12: Finishing Touches

**Self-Paced Work (Full Day)**

**Tasks:**

- Apply feedback from Day 11 review
- Fix any remaining issues
- Enhance documentation:
  - README with project overview
  - Setup instructions
  - How to run tests
  - Test coverage summary
  - Architecture decisions
- Improve test reporting
- Add final polish to code
- Practice demo presentation
- Prepare demo materials:
  - Slide deck (optional)
  - Test execution video
  - Code highlights
  - Key learnings document

**Checkpoint**: Are you ready to demo with confidence?

---

### Day 13: Demo Day

**Online Session (2 hours total)**

**Format** (15-20 minutes per learner):

1. **Introduction** (2 minutes)
   - Your background
   - Website/application you chose to automate

2. **Project Overview** (3 minutes)
   - Test coverage (number of scenarios, features)
   - Technologies and patterns used
   - Architecture decisions

3. **Live Demo** (5-7 minutes)
   - Execute test suite
   - Show reporting capabilities
   - Highlight interesting test scenarios
   - Demonstrate debugging tools

4. **Code Walkthrough** (3-5 minutes)
   - Show Page Object Model implementation
   - Highlight advanced patterns used
   - Discuss interesting challenges solved

5. **Lessons Learned** (2-3 minutes)
   - What went well
   - Challenges faced
   - Key takeaways

6. **Q&A** (3-5 minutes)

**Requirements:**

- All tests must pass during demo
- Professional presentation
- Clear explanations
- Confident delivery

---

### Day 14: Retrospective

**Online Session (1 hour)**

**Group Discussion:**

**What went well?**

- Successful learning outcomes
- Helpful resources and exercises
- Effective support structure
- Positive experiences

**What could be improved?**

- Curriculum gaps
- Challenging topics that need more coverage
- Support structure enhancements
- Resource improvements

**Action items for future cohorts:**

- Documentation updates
- Exercise improvements
- Support structure changes
- Resource additions

**Personal reflections:**

- Individual growth
- Confidence gained
- Areas for continued learning
- Next steps in test automation journey

**Celebration!** 🎉

- Recognize achievements
- Share contact information
- Discuss continued learning opportunities
- Network with peers

---

## 📊 Progress Tracking

### Daily Checklist

Track your progress each day:

#### Week 1

- [ ] Day 1: Setup, Exploration, Page Objects completed
- [ ] Day 2: Gherkin, Steps, Practice, Automation in progress
- [ ] Day 3: Scenario Outlines, Form Handling completed
- [ ] Day 4: Dynamic Content, File Operations completed
- [ ] Day 5: Code Reusability, Refactoring completed
- [ ] Initial test scenarios automated and passing

#### Week 2

- [ ] Day 6: Wait Utilities, Test Data Management completed
- [ ] Day 7: Error Handling, Base Page Class completed
- [ ] Day 8: API Integration (or advanced patterns) completed
- [ ] Day 9: Custom Formatter, Parallel Execution completed
- [ ] Day 10: Debugging tools, Complete review done
- [ ] Comprehensive test scenarios automated and passing

#### Week 3

- [ ] Day 11: Final feedback session attended
- [ ] Day 12: All feedback applied, demo ready
- [ ] Day 13: Demo delivered successfully
- [ ] Day 14: Retrospective completed

---

## 💡 Success Tips

### Daily Stand-Up Preparation

- Be ready to share your progress concisely
- Prepare specific questions in advance
- Document blockers as they occur
- Celebrate small wins

### Maximize Review Sessions

- Book sessions when truly stuck (don't wait days)
- Prepare specific code sections for review
- Have clear questions ready
- Take notes during the session
- Apply feedback immediately

### Time Management

- Start early each day
- Take regular breaks (Pomodoro technique)
- Don't get stuck on one problem too long
- Ask for help when needed
- Set daily goals

### Project Selection Tips

- Choose a site you're familiar with
- Ensure it has diverse test scenarios
- Verify it's accessible (not blocked by security)
- Consider mobile responsiveness
- Pick something you're passionate about

### Demo Preparation

- Practice your demo multiple times
- Have a backup plan if live demo fails
- Prepare video recording as backup
- Test all equipment beforehand
- Time yourself

---

## 📚 Resources

### Essential Reading

- [Getting Started Guide](GETTING-STARTED.md)
- [Architecture Documentation](ARCHITECTURE.md)
- [Writing Tests Guide](WRITING-TESTS.md)
- [Training Exercises](TRAINING-EXERCISES.md)
- [API Reference](API-REFERENCE.md)
- [Common Mistakes Guide](COMMON-MISTAKES.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)

### External Resources

- [Playwright Documentation](https://playwright.dev/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎯 Learning Outcomes

Upon successful completion, you will be able to:

- ✅ Design and implement test automation using PICKL framework
- ✅ Apply Page Object Model pattern effectively
- ✅ Write maintainable Gherkin scenarios
- ✅ Handle complex test scenarios (forms, dynamic content, APIs)
- ✅ Implement advanced patterns (base classes, custom utilities)
- ✅ Configure parallel execution and CI/CD integration
- ✅ Debug and troubleshoot test failures
- ✅ Present your work professionally
- ✅ Continue learning independently

---

## 🤝 Support Structure

### Daily Stand-Ups

- **When**: Every weekday morning
- **Duration**: 15 minutes
- **Format**: Brief updates from each learner

### Review Sessions

- **When**: Book as needed (recommended: at least 2-3 per week)
- **Duration**: 30 minutes
- **Format**: One-on-one code review and guidance

### Communication

- Create GitHub issues for questions
- Use designated communication channel (Slack/Teams/Discord)
- Share progress and blockers openly
- Help fellow learners when possible

---

**Remember: This is an intensive program. Stay committed, ask questions, and enjoy the journey of mastering test automation with PICKL!** 🥒
