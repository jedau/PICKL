# PICKL Learning Path 🥒

A structured 4-week learning path to master BDD test automation with Playwright and Cucumber.

## 📋 Overview

This learning path is designed for both beginners and those with some testing experience. Each week builds upon the previous, introducing new concepts and reinforcing learned skills.

### Time Commitment

- **Total Duration**: 4 weeks
- **Weekly Hours**: 10-15 hours
- **Daily Practice**: 2-3 hours recommended

### Prerequisites

- Basic understanding of JavaScript/TypeScript
- Familiarity with web applications
- Development environment set up (see [Getting Started](GETTING-STARTED.md))

---

## 🗓️ Week 1: Foundation

### Goal

Understand the framework basics and write your first automated test.

### Topics

- Project structure and architecture
- Page Object Model fundamentals
- Gherkin syntax and feature files
- Running and viewing test results

### Learning Objectives

By the end of Week 1, you should be able to:

- ✅ Navigate the PICKL project structure
- ✅ Run existing tests with different configurations
- ✅ Understand the Page Object Model pattern
- ✅ Modify existing feature files
- ✅ Interpret test results and reports

### Daily Schedule

#### Day 1: Setup and Exploration

**Morning (2 hours)**

- Complete [Getting Started Guide](GETTING-STARTED.md)
- Install and verify all dependencies
- Run your first test with `npm test`

**Afternoon (2 hours)**

- Read [Architecture Documentation](ARCHITECTURE.md) - Project Structure section
- Explore the `pages/`, `test/features/`, and `test/steps/` directories
- Generate and review an HTML report

**Exercise**: [Exercise 1.1 - Run and Understand Existing Tests](TRAINING-EXERCISES.md#exercise-11-run-and-understand-existing-tests)

---

#### Day 2: Understanding Page Objects

**Morning (2 hours)**

- Study `pages/LoginPage.ts` line by line
- Read [Architecture - Page Object Model](ARCHITECTURE.md#page-object-model)
- Review [API Reference - LoginPage](API-REFERENCE.md#loginpage)

**Afternoon (2 hours)**

- Study `pages/CheckboxesPage.ts`
- Compare the two page objects to identify common patterns
- Document 5 key principles you observe

**Exercise**: Document what you learned about Page Object Model

---

#### Day 3: Gherkin and Feature Files

**Morning (2 hours)**

- Read [Writing Tests Guide](WRITING-TESTS.md) - Gherkin Syntax section
- Study `test/features/login.feature`
- Learn about Background, Scenario, and tags

**Afternoon (2 hours)**

- Study `test/features/checkboxes.feature`
- Understand tag usage (@smoke, @positive, @negative)
- Learn about Scenario Outlines

**Exercise**: [Exercise 1.2 - Modify an Existing Scenario](TRAINING-EXERCISES.md#exercise-12-modify-an-existing-scenario)

---

#### Day 4: Step Definitions

**Morning (2 hours)**

- Read [Architecture - Custom World Pattern](ARCHITECTURE.md#custom-world-pattern)
- Study `test/steps/login.steps.ts`
- Understand the relationship between Gherkin and TypeScript

**Afternoon (2 hours)**

- Study `test/steps/checkboxes.steps.ts`
- Learn how Page Objects are used in step definitions
- Understand the `this: ICustomWorld` pattern

**Exercise**: Trace the flow from a Gherkin step to its implementation

---

#### Day 5: Hands-On Practice

**Morning (2 hours)**

- [Exercise 1.3 - Create Your First Page Object](TRAINING-EXERCISES.md#exercise-13-create-your-first-page-object)
- Create `DropdownPage.ts`

**Afternoon (3 hours)**

- [Exercise 1.4 - Write Your First Feature File](TRAINING-EXERCISES.md#exercise-14-write-your-first-feature-file)
- [Exercise 1.5 - Implement Step Definitions](TRAINING-EXERCISES.md#exercise-15-implement-step-definitions)
- Run your complete test and generate a report

**Milestone**: You've created your first complete test from scratch!

---

### Week 1 Assessment

Before moving to Week 2, ensure you can:

- [ ] Explain the Page Object Model pattern
- [ ] Write Gherkin scenarios following best practices
- [ ] Create a basic page object with locators and methods
- [ ] Implement step definitions that connect Gherkin to code
- [ ] Run tests with different tags and browsers
- [ ] Generate and interpret HTML reports

---

## 🗓️ Week 2: Intermediate Skills

### Goal

Master advanced Gherkin features and write more complex tests.

### Topics

- Scenario Outlines and data tables
- Handling different form elements
- Working with dynamic content
- Code reusability and helpers
- Test data management

### Learning Objectives

By the end of Week 2, you should be able to:

- ✅ Use Scenario Outlines for data-driven tests
- ✅ Handle various input types (text, numbers, files)
- ✅ Work with dynamic page content
- ✅ Create reusable helper functions
- ✅ Manage test data effectively

### Daily Schedule

#### Day 1: Scenario Outlines

**Morning (2 hours)**

- Read about Scenario Outlines in [Writing Tests](WRITING-TESTS.md)
- Study the Scenario Outline example in `login.feature`
- Understand Examples tables

**Afternoon (2 hours)**

- [Exercise 2.5 - Scenario Outline with Data Tables](TRAINING-EXERCISES.md#exercise-25-scenario-outline-with-data-tables)
- Add multiple examples and run tests

**Practice**: Create 3 different Scenario Outlines

---

#### Day 2: Form Handling

**Morning (2 hours)**

- Research different HTML input types
- Study Playwright's form interaction methods
- Read about `fill()`, `check()`, `selectOption()`, `setInputFiles()`

**Afternoon (3 hours)**

- [Exercise 2.1 - Add Form Page with Multiple Input Types](TRAINING-EXERCISES.md#exercise-21-add-form-page-with-multiple-input-types)
- Test with edge cases (negative numbers, special characters)

---

#### Day 3: Dynamic Content

**Morning (2 hours)**

- Learn about Playwright's auto-waiting mechanism
- Understand `waitForSelector`, `waitForLoadState`
- Read about handling dynamic content

**Afternoon (3 hours)**

- [Exercise 2.2 - Working with Dynamic Content](TRAINING-EXERCISES.md#exercise-22-working-with-dynamic-content)
- Implement assertions for dynamic content changes

---

#### Day 4: File Operations

**Morning (2 hours)**

- Research file upload/download in Playwright
- Create test fixtures directory
- Learn about `setInputFiles()` and download handling

**Afternoon (2 hours)**

- [Exercise 2.3 - File Upload Functionality](TRAINING-EXERCISES.md#exercise-23-file-upload-functionality)

---

#### Day 5: Code Reusability

**Full Day (5 hours)**

- [Exercise 2.4 - Create a Reusable Step Helper](TRAINING-EXERCISES.md#exercise-24-create-a-reusable-step-helper)
- Refactor ALL step definitions
- Document before/after comparison
- Run full test suite to verify nothing broke

**Milestone**: You've significantly reduced code duplication!

---

### Week 2 Assessment

Before moving to Week 3, ensure you can:

- [ ] Write data-driven tests using Scenario Outlines
- [ ] Handle various form input types
- [ ] Work with dynamic page content
- [ ] Create and use helper utilities
- [ ] Manage test data in a centralized way
- [ ] Refactor code for better maintainability

---

## 🗓️ Week 3: Advanced Patterns

### Goal

Implement advanced patterns and integrate with APIs.

### Topics

- Custom wait utilities
- Base page classes
- Error handling strategies
- API integration
- Test data fixtures
- Custom World enhancements

### Learning Objectives

By the end of Week 3, you should be able to:

- ✅ Create custom wait utilities for complex scenarios
- ✅ Implement inheritance with base page classes
- ✅ Handle errors gracefully with custom error types
- ✅ Integrate API calls with UI tests
- ✅ Manage complex test data structures
- ✅ Extend the Custom World for advanced scenarios

### Daily Schedule

#### Day 1: Custom Wait Utilities

**Morning (2 hours)**

- Read about Playwright's waiting strategies
- Study async/await patterns in depth
- Review timing issues in [Common Mistakes](COMMON-MISTAKES.md)

**Afternoon (3 hours)**

- [Exercise 3.1 - Custom Wait Utility](TRAINING-EXERCISES.md#exercise-31-custom-wait-utility)
- Implement and test wait helpers

---

#### Day 2: Test Data Management

**Full Day (5 hours)**

- [Exercise 3.2 - Test Data Management System](TRAINING-EXERCISES.md#exercise-32-test-data-management-system)
- Create comprehensive test data fixtures
- Refactor tests to use centralized data
- Document your data management strategy

---

#### Day 3: Error Handling

**Morning (2 hours)**

- Read about TypeScript error handling best practices
- Study custom error classes in TypeScript
- Review error scenarios in existing tests

**Afternoon (3 hours)**

- [Exercise 3.3 - Custom Error Handling](TRAINING-EXERCISES.md#exercise-33-custom-error-handling)
- Implement custom error classes
- Add to step definitions and page objects

---

#### Day 4: Base Page Class

**Morning (2 hours)**

- Study object-oriented inheritance in TypeScript
- Learn about abstract classes
- Read about the DRY principle

**Afternoon (3 hours)**

- [Exercise 3.4 - Base Page Class](TRAINING-EXERCISES.md#exercise-34-base-page-class)
- Create BasePage with common methods
- Refactor existing page objects

---

#### Day 5: API Integration

**Full Day (6 hours)**

- Learn about Playwright's API testing capabilities
- Study the Custom World extension pattern
- [Exercise 3.5 - API Integration Test](TRAINING-EXERCISES.md#exercise-35-api-integration-test)
- Implement end-to-end test with API setup/teardown

**Milestone**: You've mastered advanced testing patterns!

---

### Week 3 Assessment

Before moving to Week 4, ensure you can:

- [ ] Create and use custom wait utilities
- [ ] Implement base page classes for code reuse
- [ ] Handle errors with custom error types
- [ ] Integrate API calls with UI tests
- [ ] Manage complex test data effectively
- [ ] Extend the Custom World for specific needs

---

## 🗓️ Week 4: Master Level

### Goal

Master framework customization, CI/CD, and advanced debugging.

### Topics

- Custom formatter development
- Parallel test execution
- CI/CD integration
- Docker containerization
- Performance testing
- Debugging techniques

### Learning Objectives

By the end of Week 4, you should be able to:

- ✅ Create custom Cucumber formatters
- ✅ Configure and run tests in parallel
- ✅ Set up CI/CD pipelines
- ✅ Dockerize test execution
- ✅ Add performance metrics to tests
- ✅ Debug complex test issues efficiently

### Daily Schedule

#### Day 1: Custom Formatter

**Morning (2 hours)**

- Read [Architecture - Formatter System](ARCHITECTURE.md#formatter-system)
- Study `test/support/verbose-formatter.ts` in detail
- Understand Cucumber event system

**Afternoon (4 hours)**

- [Exercise 4.1 - Custom Formatter Enhancement](TRAINING-EXERCISES.md#exercise-41-custom-formatter-enhancement)
- Add color-coded output and timing features

---

#### Day 2: Parallel Execution

**Morning (3 hours)**

- Research Cucumber parallel execution strategies
- Learn about test isolation principles
- Understand potential race conditions

**Afternoon (3 hours)**

- [Exercise 4.2 - Parallel Execution Setup](TRAINING-EXERCISES.md#exercise-42-parallel-execution-setup)
- Configure parallel workers
- Fix any test isolation issues

---

#### Day 3: CI/CD Pipeline

**Full Day (6 hours)**

- Learn about GitHub Actions workflow syntax
- Study CI/CD best practices for test automation
- [Exercise 4.3 - CI/CD Pipeline Configuration](TRAINING-EXERCISES.md#exercise-43-cicd-pipeline-configuration)
- Create and test your workflow
- Review test results in GitHub Actions

---

#### Day 4: Docker & Performance

**Morning (3 hours)**

- [Exercise 4.4 - Docker Containerization](TRAINING-EXERCISES.md#exercise-44-docker-containerization)
- Create Dockerfile and docker-compose.yml
- Test containerized execution

**Afternoon (3 hours)**

- [Exercise 4.5 - Performance Testing Integration](TRAINING-EXERCISES.md#exercise-45-performance-testing-integration)
- Add performance metrics
- Analyze results

---

#### Day 5: Debugging & Review

**Morning (2 hours)**

- Review [Troubleshooting Guide](TROUBLESHOOTING.md)
- Practice debugging techniques:
  - Using VS Code debugger
  - Playwright Inspector
  - Trace viewer
  - Video analysis

**Afternoon (3 hours)**

- Review ALL documentation
- Fill gaps in your understanding
- Prepare for final project

---

### Week 4 Assessment

Before starting the final project, ensure you can:

- [ ] Create custom formatters for specific needs
- [ ] Configure parallel test execution
- [ ] Set up CI/CD pipelines for automated testing
- [ ] Containerize test execution with Docker
- [ ] Add performance assertions to tests
- [ ] Debug complex test failures efficiently

---

## 🏆 Final Project

### Duration

3-5 days after completing Week 4

### Project Options

Choose ONE of the following projects based on your interests:

#### Option 1: E-commerce Test Suite

**Goal**: Create a comprehensive test suite for an e-commerce application

**Requirements**:

- Product search and filtering
- Shopping cart operations
- Multi-step checkout process
- User account management
- Payment flow (mock)
- At least 20 scenarios
- 100% Page Object Model coverage
- CI/CD integration

#### Option 2: API Testing Framework

**Goal**: Build a complete API testing framework

**Requirements**:

- Authentication tests
- CRUD operations for multiple resources
- Schema validation
- Response time assertions
- Error handling scenarios
- Integration with UI tests
- At least 15 API scenarios
- Comprehensive reporting

#### Option 3: Multi-Site Testing Framework

**Goal**: Extend PICKL to support multiple test sites

**Requirements**:

- Configuration for multiple environments
- Shared page objects across sites
- Environment-specific test data
- Cross-site smoke tests
- Deployment verification tests
- At least 25 scenarios total

### Submission Requirements

1. **Code Quality**
   - Follows PICKL naming conventions
   - Comprehensive JSDoc comments
   - No linting errors
   - Formatted with Prettier

2. **Documentation**
   - README explaining your project
   - Architecture decisions
   - Setup instructions
   - Test coverage report

3. **Testing**
   - All tests passing
   - HTML report generated
   - CI/CD pipeline configured
   - Video evidence of test execution

4. **Presentation**
   - 10-minute demo video
   - Key learnings document
   - Challenges faced and solutions

---

## 📊 Progress Tracking

### Weekly Checklist

Use this checklist to track your progress:

#### Week 1

- [ ] Completed all Day 1-5 exercises
- [ ] Created dropdown feature from scratch
- [ ] All tests passing
- [ ] Completed Week 1 assessment

#### Week 2

- [ ] Mastered Scenario Outlines
- [ ] Created multiple page objects
- [ ] Implemented helper functions
- [ ] Completed Week 2 assessment

#### Week 3

- [ ] Created custom utilities
- [ ] Implemented base page class
- [ ] Integrated API testing
- [ ] Completed Week 3 assessment

#### Week 4

- [ ] Enhanced formatter
- [ ] Configured parallel execution
- [ ] Set up CI/CD
- [ ] Dockerized tests
- [ ] Completed Week 4 assessment

#### Final Project

- [ ] Project completed
- [ ] Documentation written
- [ ] Demo video recorded
- [ ] Code reviewed

---

## 🎓 Certification

Upon successful completion of the learning path and final project:

1. Submit your final project for review
2. Schedule a 30-minute code review session
3. Present your learnings and demonstrate your project
4. Receive your **PICKL Certified Test Automation Engineer** certificate! 🥒

### Certification Criteria

To receive certification, you must demonstrate:

- ✅ Mastery of Page Object Model pattern
- ✅ Ability to write maintainable Gherkin scenarios
- ✅ Strong TypeScript and async programming skills
- ✅ Understanding of test automation best practices
- ✅ Ability to debug and troubleshoot effectively
- ✅ Clean code and documentation skills

---

## 💡 Study Tips

### For Visual Learners

- Draw diagrams of the test execution flow
- Create visual mind maps of the architecture
- Watch the tests execute in headed mode
- Study the HTML reports carefully

### For Hands-On Learners

- Type out all code examples (don't copy-paste)
- Experiment with breaking tests to see error messages
- Try variations of the exercises
- Build small practice projects

### For Reading/Writing Learners

- Take detailed notes as you read documentation
- Write summaries of each concept
- Document your learnings in a blog
- Explain concepts to others (rubber duck debugging)

### General Tips

- 🕐 Practice daily, even if just 30 minutes
- 🤝 Join the community and ask questions
- 🔄 Review previous week's material regularly
- 🎯 Focus on understanding, not memorizing
- ✍️ Write tests for real-world scenarios
- 🐛 Learn from your mistakes
- 📝 Keep a learning journal

---

## 📚 Additional Resources

### Week 1 Resources

- [Getting Started Guide](GETTING-STARTED.md)
- [Architecture Documentation](ARCHITECTURE.md)
- [Writing Tests Guide](WRITING-TESTS.md)

### Week 2 Resources

- [Training Exercises](TRAINING-EXERCISES.md)
- [API Reference](API-REFERENCE.md)
- [Playwright Documentation](https://playwright.dev/)

### Week 3 Resources

- [Common Mistakes Guide](COMMON-MISTAKES.md)
- [Contributing Guide](CONTRIBUTING.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Week 4 Resources

- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 🤝 Community Support

- **Questions?** Create an issue in the repository
- **Stuck?** Review the [Troubleshooting Guide](TROUBLESHOOTING.md)
- **Want to contribute?** See [Contributing Guide](CONTRIBUTING.md)

---

**Remember: Learning is a journey, not a race. Take your time and enjoy the process!** 🥒
