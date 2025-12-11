# Security Policy

## Supported Versions

This project is currently in active development. Security updates are provided for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of PICKL seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do Not** Open a Public Issue

Please do not create a public GitHub issue for security vulnerabilities. This could put other users at risk.

### 2. Report Privately

Report security vulnerabilities by emailing the maintainer directly or using GitHub's private vulnerability reporting feature:

- **Email:** [Create a security advisory on GitHub](https://github.com/jedau/PICKL/security/advisories/new)
- **GitHub Security Advisories:** Navigate to the Security tab → Advisories → New draft security advisory

### 3. Include Details

When reporting a vulnerability, please include:

- **Description:** A clear description of the vulnerability
- **Impact:** What could an attacker accomplish?
- **Reproduction Steps:** Detailed steps to reproduce the issue
- **Affected Versions:** Which versions are affected?
- **Suggested Fix:** If you have a solution, please share it

### 4. Response Timeline

- **Initial Response:** Within 48 hours of report submission
- **Status Update:** Within 7 days with assessment and planned actions
- **Fix Timeline:** Varies based on severity (Critical: 7 days, High: 14 days, Medium: 30 days, Low: 60 days)

## Security Measures

This project implements the following security measures:

### Automated Security Scanning

- **CodeQL Analysis:** Automated code security scanning on every push and pull request
- **npm Audit:** Dependency vulnerability scanning in CI/CD pipeline
- **Dependabot:** Automated security updates for dependencies and GitHub Actions

### Development Practices

- **Branch Protection:** Direct commits to main branch are blocked
- **Pre-commit Hooks:** Automated linting and formatting before commits
- **Commit Message Validation:** Conventional commits enforced
- **Code Review:** All changes require pull request review

### Dependency Management

- **Regular Updates:** Dependencies reviewed and updated weekly via Dependabot
- **Audit Threshold:** CI fails on high or critical vulnerabilities
- **License Compliance:** All dependencies must use compatible licenses

## Security Update Process

When a security vulnerability is confirmed:

1. **Assessment:** Evaluate severity using CVSS scoring
2. **Fix Development:** Develop and test fix in private branch
3. **Advisory:** Create GitHub Security Advisory
4. **Release:** Deploy fix and publish advisory
5. **Notification:** Notify users through GitHub release notes

## Best Practices for Contributors

- **Dependencies:** Minimize external dependencies
- **Input Validation:** Always validate and sanitize user input
- **Secrets Management:** Never commit credentials, API keys, or tokens
- **Error Handling:** Avoid exposing sensitive information in error messages
- **Testing:** Include security test cases for new features

## Scope

This security policy applies to:

- **In Scope:**
  - Core PICKL application code
  - Dependencies declared in package.json
  - GitHub Actions workflows
  - Documentation that could lead to security issues

- **Out of Scope:**
  - Third-party services (e.g., https://the-internet.herokuapp.com)
  - Local development environment configurations
  - Issues that require physical access to a user's machine

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who report valid vulnerabilities (with permission):

- Acknowledgment in release notes
- Credit in SECURITY.md (if desired)
- Recognition in project README

## Questions?

If you have questions about this security policy, please open a discussion in the GitHub Discussions section.

---

**Last Updated:** December 11, 2025  
**Version:** 1.0
