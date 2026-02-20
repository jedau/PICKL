# Forking PICKL 🥒

This guide is specifically for developers who want to **fork PICKL** to:

- Test against their own application
- Customize PICKL for their organization
- Experiment with changes before contributing back
- Use PICKL as a starting point for their own framework

---

## 📋 Table of Contents

- [Why Fork PICKL?](#why-fork-pickl)
- [Setting Up Your Fork](#setting-up-your-fork)
- [Configuring CI for Your Fork](#configuring-ci-for-your-fork)
- [Customizing Your Fork](#customizing-your-fork)
- [Keeping Your Fork Updated](#keeping-your-fork-updated)
- [Contributing Back](#contributing-back)

---

## Why Fork PICKL?

### When to Fork

✅ **Fork PICKL if you want to:**

- Test your own web application instead of the-internet.herokuapp.com
- Customize the framework for your organization's needs
- Add proprietary features not suitable for the main repository
- Experiment with major architectural changes
- Use PICKL as a template for a new project

### When NOT to Fork

❌ **Don't fork if you just want to:**

- Contribute features back to PICKL → Use the [contribution workflow](CONTRIBUTING.md)
- Fix bugs or add features → Create a PR directly
- Learn BDD testing → Clone and use the main repository

---

## Setting Up Your Fork

### Step 1: Fork on GitHub

1. Go to https://github.com/jedau/PICKL
2. Click the **Fork** button (top right)
3. Choose your account or organization
4. Optional: Uncheck "Copy the main branch only" if you want all branches

### Step 2: Clone Your Fork

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/PICKL.git
cd PICKL

# Add upstream remote to track original repository
git remote add upstream https://github.com/jedau/PICKL.git

# Verify remotes
git remote -v
# Should show:
# origin    https://github.com/YOUR-USERNAME/PICKL.git (fetch/push)
# upstream  https://github.com/jedau/PICKL.git (fetch/push)
```

### Step 3: Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Playwright browsers
npx playwright install

# Create local environment file
cp .env.example .env
```

### Step 4: Test Your Fork

```bash
# Run tests (will use default BASE_URL)
npm test

# Generate report
npm run report
```

✅ If tests pass, your fork is set up correctly!

---

## Configuring CI for Your Fork

When you fork PICKL, GitHub Actions CI runs on **your repository**, not the original. You need to configure it for your needs.

### Option 1: Use GitHub Secrets (Recommended)

Best for testing against **your own application** or using **sensitive URLs**.

#### 1. Navigate to Your Fork's Settings

1. Go to `https://github.com/YOUR-USERNAME/PICKL`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

#### 2. Add Your BASE_URL Secret

- **Name:** `BASE_URL`
- **Value:** `https://your-app.example.com`
- Click **Add secret**

#### 3. Update CI Workflow to Use Secret

Edit `.github/workflows/ci.yml` in your fork:

```yaml
# Find these lines (appears in multiple places):
env:
  BASE_URL: https://the-internet.herokuapp.com

# Change to:
env:
  BASE_URL: ${{ secrets.BASE_URL }}
```

**Locations to update:**

- Line ~245: `coverage` job → `Run tests with coverage` step
- Line ~505: `test` job → `Run tests` step

#### 4. Commit and Push

```bash
git add .github/workflows/ci.yml
git commit -m "ci: use BASE_URL from GitHub Secrets"
git push origin main
```

✅ Now your CI uses your secret BASE_URL!

---

### Option 2: Hardcode BASE_URL (Public URLs Only)

Best for testing against **public demo sites** or **public staging environments**.

⚠️ **Warning:** Only use this for PUBLIC URLs. Never commit private/internal URLs.

#### Edit CI Workflow

```yaml
# In .github/workflows/ci.yml
# Change from:
env:
  BASE_URL: https://the-internet.herokuapp.com

# To your public URL:
env:
  BASE_URL: https://demo.yourapp.com
```

#### Commit and Push

```bash
git add .github/workflows/ci.yml
git commit -m "ci: update BASE_URL for fork testing"
git push origin main
```

---

### Option 3: Use GitHub Environments

Best for testing **multiple environments** (dev, staging, production).

#### 1. Create Environments

1. Go to **Settings** → **Environments**
2. Click **New environment**
3. Create environments: `development`, `staging`, `production`

#### 2. Add Environment-Specific Secrets

For each environment:

- Click on the environment name
- Add secrets like `BASE_URL`, `API_KEY`, etc.

#### 3. Update CI Workflow

```yaml
jobs:
  test-staging:
    name: Test (Staging)
    runs-on: ubuntu-latest
    environment: staging # Uses staging environment secrets

    steps:
      - uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version-file: '.nvmrc'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Run tests
        env:
          BASE_URL: ${{ secrets.BASE_URL }}
          API_KEY: ${{ secrets.API_KEY }}
        run: npm test

  test-production:
    name: Test (Production)
    runs-on: ubuntu-latest
    environment: production # Uses production environment secrets

    steps:
      # Same as above...
```

---

### Adding Other Environment Variables

You may need additional secrets for your application:

```yaml
env:
  BASE_URL: ${{ secrets.BASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}
  TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
  TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
  AUTH_TOKEN: ${{ secrets.AUTH_TOKEN }}
```

Add these secrets in **Settings** → **Secrets and variables** → **Actions**.

---

## Customizing Your Fork

### Update Repository Name and Branding

1. **Rename your fork:**
   - Settings → General → Repository name
   - Example: `my-company-test-automation`

2. **Update README.md:**

   ```markdown
   # My Company Test Automation 🧪

   Based on [PICKL](https://github.com/jedau/PICKL)

   This is our customized fork for testing [Your Application].
   ```

3. **Update package.json:**
   ```json
   {
     "name": "my-company-tests",
     "description": "Test automation for My Company App",
     "repository": {
       "type": "git",
       "url": "https://github.com/YOUR-USERNAME/PICKL.git"
     }
   }
   ```

### Remove the-internet.herokuapp.com Tests

If you're only testing your own app:

```bash
# Remove the example feature
rm test/features/login.feature

# Remove the example page object
rm test/pages/LoginPage.ts

# Remove the example step definitions
rm test/steps/login.steps.ts
```

Create your own features, pages, and steps for your application.

### Customize Test Tags

Update your test tags in feature files:

```gherkin
@smoke @login @your-app
Feature: Login

  @critical
  Scenario: Successful login
    Given I am on the login page
    When I login with valid credentials
    Then I should see the dashboard
```

Run specific tags:

```bash
npm test -- --tags "@your-app and @smoke"
```

### Add Custom npm Scripts

Add organization-specific scripts to `package.json`:

```json
{
  "scripts": {
    "test:dev": "cross-env BASE_URL=https://dev.yourapp.com npm test",
    "test:staging": "cross-env BASE_URL=https://staging.yourapp.com npm test",
    "test:prod": "cross-env BASE_URL=https://yourapp.com TAGS=@smoke npm test",
    "test:api": "cross-env TAGS=@api npm test",
    "test:ui": "cross-env TAGS=@ui npm test"
  }
}
```

---

## Keeping Your Fork Updated

### Sync with Upstream

Regularly pull updates from the original PICKL repository:

```bash
# Fetch latest changes from upstream
git fetch upstream

# Switch to your main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### Handling Conflicts

If you have conflicts:

```bash
# During merge, Git will show conflicted files
git status

# Edit conflicted files, then:
git add <resolved-files>
git commit -m "chore: merge upstream changes"
git push origin main
```

### Stay on Older Version

If you want to stay on a specific PICKL version:

```bash
# Check available tags
git fetch upstream --tags
git tag -l

# Checkout a specific version
git checkout tags/v0.5.0 -b stable-v0.5.0

# Or merge only up to a specific version
git merge tags/v0.5.0
```

---

## Contributing Back

If you develop a feature in your fork that would benefit the main PICKL project:

### Step 1: Create a Clean Branch

```bash
# Ensure your main is up to date
git checkout main
git pull upstream main

# Create a feature branch from main
git checkout -b feature/your-feature

# Cherry-pick or develop your feature
```

### Step 2: Remove Organization-Specific Code

- Remove any proprietary logic
- Remove internal URLs or references
- Use generic examples instead of your app-specific code

### Step 3: Create Pull Request

1. Push to your fork: `git push origin feature/your-feature`
2. Go to https://github.com/jedau/PICKL
3. Click **"Compare & pull request"**
4. Select: `base: main` ← `compare: YOUR-USERNAME:feature/your-feature`
5. Fill out the PR template
6. Follow the [Contributing Guidelines](CONTRIBUTING.md)

---

## Common Forking Scenarios

### Scenario 1: Testing Your Company's Web App

```bash
# 1. Fork PICKL
# 2. Add BASE_URL as GitHub Secret
# 3. Remove example tests
# 4. Create your feature files
# 5. Create your page objects
# 6. Run tests: npm test
```

### Scenario 2: Creating Organization Template

```bash
# 1. Fork PICKL
# 2. Rename to "company-test-template"
# 3. Add company-specific helpers
# 4. Add company-specific reporting
# 5. Teams fork YOUR template for their projects
```

### Scenario 3: Experimenting with Major Changes

```bash
# 1. Fork PICKL
# 2. Create experimental branch
# 3. Make breaking changes
# 4. Test thoroughly
# 5. If successful, contribute back as RFC
```

### Scenario 4: Using PICKL for Different Tech Stack

```bash
# 1. Fork PICKL
# 2. Replace Playwright with Selenium/WebDriver
# 3. Keep Cucumber and BDD structure
# 4. Maintain as separate project
```

---

## Troubleshooting

### CI Fails with "BASE_URL not found"

**Cause:** GitHub Secret not set or named incorrectly.

**Solution:**

1. Verify secret exists: Settings → Secrets and variables → Actions
2. Check secret name is exactly `BASE_URL` (case-sensitive)
3. Ensure workflow uses `${{ secrets.BASE_URL }}`

### Tests Pass Locally, Fail in Fork CI

**Cause:** Network restrictions or authentication issues.

**Solution:**

1. Check if your BASE_URL is publicly accessible from GitHub Actions runners
2. Add necessary authentication secrets
3. Whitelist GitHub Actions IP ranges if needed

### Fork is Behind Upstream

**Cause:** Haven't synced with upstream in a while.

**Solution:**

```bash
git fetch upstream
git merge upstream/main
# Resolve conflicts if any
git push origin main
```

### Want to Reset Fork to Match Upstream

**Cause:** Made too many changes, want fresh start.

**Solution:**

```bash
# ⚠️ WARNING: This will DELETE all your changes!
git fetch upstream
git reset --hard upstream/main
git push origin main --force
```

---

## Best Practices for Forks

### ✅ DO:

- Document why you forked in your README
- Keep fork name descriptive
- Sync with upstream regularly
- Contribute generic improvements back
- Use GitHub Secrets for sensitive data
- Tag your releases

### ❌ DON'T:

- Commit sensitive credentials
- Remove LICENSE file or attribution
- Break compatibility without documenting
- Ignore security updates from upstream
- Fork just to contribute (use PR instead)

---

## Additional Resources

- [Contributing Guide](CONTRIBUTING.md) - For contributing back to PICKL
- [Secrets Management](SECRETS-MANAGEMENT.md) - Handling sensitive data
- [GitHub Docs: Forking](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- [GitHub Docs: Syncing Forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## Need Help?

- **Fork-specific questions:** Open an issue in your fork
- **PICKL questions:** Open an issue in [jedau/PICKL](https://github.com/jedau/PICKL/issues)
- **Security concerns:** See [SECURITY.md](../SECURITY.md)

---

**Happy Forking! 🍴🥒**

_Last Updated: February 9, 2026_
