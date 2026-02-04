import { exec } from 'child_process'
import { generate } from 'cucumber-html-reporter'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const options = {
  theme: 'bootstrap' as const,
  jsonFile: './test-results/cucumber-report.json',
  output: './test-results/html-report/index.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '0.5.0',
    'Test Environment': 'Local',
    Browser: process.env.BROWSER ?? 'chromium',
    Platform: process.platform,
    'Node Version': process.version,
    'Test Run': new Date().toLocaleString(),
  },
  brandTitle: 'PICKL Test Results',
  name: 'PICKL Test Results',
}

// Clean previous report to avoid stale data
const reportPath = './test-results/html-report'
if (existsSync(reportPath)) {
  rmSync(reportPath, { recursive: true, force: true })
}

// Clean any stray JSON files
const strayJsonFiles = ['./test-results/direct.json']
strayJsonFiles.forEach(file => {
  if (existsSync(file)) {
    rmSync(file, { force: true })
  }
})

// Generate report
generate(options)

// Customize the generated HTML
const reportFile = './test-results/html-report/index.html'
if (existsSync(reportFile)) {
  let htmlContent = readFileSync(reportFile, 'utf8')

  // Replace external favicon with pickle emoji
  const pickleFavicon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ctext x='0' y='14' font-size='14'%3E🥒%3C/text%3E%3C/svg%3E"
  htmlContent = htmlContent.replace(
    /<link rel="icon" href="[^"]*">/g,
    `<link rel="icon" href="${pickleFavicon}" type="image/svg+xml">`,
  )

  // Add dark mode toggle and styles
  const darkModeScript = `
<style id="darkModeStyles" disabled>
  /* Dark Mode Theme */
  body {
    background-color: #1e1e1e !important;
    color: #d4d4d4 !important;
  }

  .navbar, .navbar-default {
    background-color: #2d2d30 !important;
    border-color: #3e3e42 !important;
  }

  .navbar-brand, .navbar-nav > li > a {
    color: #d4d4d4 !important;
  }

  .panel, .panel-default {
    background-color: #252526 !important;
    border-color: #3e3e42 !important;
  }

  .panel-heading {
    background-color: #2d2d30 !important;
    border-color: #3e3e42 !important;
    color: #d4d4d4 !important;
  }

  .panel-body {
    background-color: #1e1e1e !important;
    color: #d4d4d4 !important;
  }

  .table {
    background-color: #252526 !important;
    color: #d4d4d4 !important;
  }

  .table > thead > tr > th,
  .table > tbody > tr > td {
    border-color: #3e3e42 !important;
    color: #d4d4d4 !important;
  }

  .table-striped > tbody > tr:nth-of-type(odd) {
    background-color: #2d2d30 !important;
  }

  .label {
    background-color: #3e3e42 !important;
    color: #d4d4d4 !important;
  }

  .label-success {
    background-color: #107c10 !important;
  }

  .label-danger {
    background-color: #c50f1f !important;
  }

  .label-warning {
    background-color: #ca5010 !important;
  }

  .label-info {
    background-color: #0078d4 !important;
  }

  a {
    color: #4ec9b0 !important;
  }

  a:hover {
    color: #6fd4bd !important;
  }

  pre {
    background-color: #1e1e1e !important;
    border-color: #3e3e42 !important;
    color: #d4d4d4 !important;
  }

  code {
    background-color: #2d2d30 !important;
    color: #ce9178 !important;
  }

  .well {
    background-color: #252526 !important;
    border-color: #3e3e42 !important;
  }

  .jumbotron {
    background-color: #252526 !important;
    color: #d4d4d4 !important;
  }

  #darkModeToggle {
    color: #d4d4d4 !important;
    background-color: transparent !important;
    border: 1px solid #3e3e42 !important;
  }
</style>

<script>
  function toggleDarkMode() {
    const darkModeStyles = document.getElementById('darkModeStyles');
    const isDark = !darkModeStyles.disabled;
    darkModeStyles.disabled = isDark;
    localStorage.setItem('darkMode', isDark ? 'false' : 'true');
    updateToggleButton(!isDark);
  }

  function updateToggleButton(isDark) {
    const button = document.getElementById('darkModeToggle');
    if (button) {
      button.textContent = isDark ? '☀️ Switch to Light mode' : '🌙 Switch to Dark mode';
    }
  }

  // Load saved preference
  document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const darkModeStyles = document.getElementById('darkModeStyles');
    darkModeStyles.disabled = !darkMode;
    updateToggleButton(darkMode);
  });
</script>
`

  // Insert dark mode script before closing head tag
  htmlContent = htmlContent.replace('</head>', `${darkModeScript}</head>`)

  // Replace brand title with toggle button
  const toggleButton = `<button id="darkModeToggle" onclick="toggleDarkMode()" style="padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; border: 1px solid #ddd; background-color: transparent;">🌙 Switch to Dark mode</button>`
  htmlContent = htmlContent.replace('PICKL Test Results', toggleButton)

  writeFileSync(reportFile, htmlContent, 'utf8')
}

// Auto-open the report in the default browser
const reportIndexPath = resolve('./test-results/html-report/index.html')
const fileUrl = `file:///${reportIndexPath.replace(/\\/g, '/')}`

const openCommand =
  process.platform === 'win32'
    ? `powershell -Command "Start-Process '${fileUrl}'"`
    : process.platform === 'darwin'
      ? `open ${reportIndexPath}`
      : `xdg-open ${reportIndexPath}`

exec(openCommand, error => {
  if (error) {
    console.error(`Report location: ${reportIndexPath}`)
    console.error('(Could not auto-open browser - please open manually)')
  }
})
