import { After, AfterAll, Before, BeforeAll, Status, setDefaultTimeout } from '@cucumber/cucumber'
import { Browser, Page, chromium, firefox, webkit } from '@playwright/test'
import { existsSync } from 'fs'
import { mkdir, readFile } from 'fs/promises'
import { ICustomWorld } from './world.js'

// Set timeout for all hooks and steps
setDefaultTimeout(60000)

interface PickleInfo {
  name: string
  id: string
}

let browser: Browser

BeforeAll(async function () {
  // Create directories for test artifacts if they don't exist
  const dirs = ['test-results/videos', 'test-results/traces', 'test-results/screenshots']

  for (const dir of dirs) {
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true })
    }
  }
})

Before(async function (this: ICustomWorld, { pickle }): Promise<void> {
  // Launch browser based on environment variable or world parameters
  const browserType = (process.env.BROWSER ??
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (this.parameters?.browser as string | undefined) ??
    'chromium') as 'chromium' | 'firefox' | 'webkit'

  // Read headless mode from environment variable
  const headless = process.env.HEADLESS !== 'false'

  switch (browserType) {
    case 'firefox':
      browser = await firefox.launch({ headless })
      break
    case 'webkit':
      browser = await webkit.launch({ headless })
      break
    default:
      browser = await chromium.launch({ headless })
  }

  // Create browser context with video recording
  const context = await browser.newContext({
    baseURL: process.env.BASE_URL,
    recordVideo: {
      dir: 'test-results/videos',
    },
    viewport: { width: 1920, height: 1080 },
  })

  // Start tracing for debugging
  const scenarioName = `${pickle.name}-${pickle.id}`
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  })

  // Create page and attach to world
  const page = await context.newPage()
  this.page = page
  this.context = context
})

async function saveScreenshot(page: Page, pickle: PickleInfo, world: ICustomWorld): Promise<void> {
  const screenshotPath = `test-results/screenshots/${pickle.name.replace(/[^a-z0-9]/gi, '_')}-${pickle.id}.png`
  const screenshot = await page.screenshot({
    path: screenshotPath,
    type: 'png',
    fullPage: true,
  })
  world.attach(screenshot, 'image/png')
}

async function saveVideo(page: Page, world: ICustomWorld): Promise<{ pageClosedEarly: boolean }> {
  const video = page.video()
  if (!video || process.env.HEADLESS === 'false') {
    return { pageClosedEarly: false }
  }

  try {
    await page.close()
    const videoPath = await video.path()
    const videoBuffer = await readFile(videoPath)
    world.attach(videoBuffer, 'video/webm')
    return { pageClosedEarly: true }
  } catch (error) {
    console.warn('Failed to attach video:', error)
    return { pageClosedEarly: false }
  }
}

async function handleFailure(
  page: Page | undefined,
  pickle: PickleInfo,
  tracePath: string,
  world: ICustomWorld,
): Promise<boolean> {
  let pageClosedEarly = false

  if (page) {
    await saveScreenshot(page, pickle, world)
    const videoResult = await saveVideo(page, world)
    pageClosedEarly = videoResult.pageClosedEarly
  }

  const traceLink = `<a href="https://trace.playwright.dev/">Open trace file: ${tracePath}</a>`
  world.attach(traceLink, 'text/html')

  return pageClosedEarly
}

After(async function (this: ICustomWorld, { pickle, result }) {
  const { context, page } = this

  const tracePath = `test-results/traces/${pickle.id}.zip`
  await context?.tracing.stop({ path: tracePath })

  let pageClosedEarly = false
  if (result?.status === Status.FAILED) {
    pageClosedEarly = await handleFailure(page, pickle, tracePath, this)
  }

  if (!pageClosedEarly) {
    await page?.close()
  }
  await context?.close()
  await browser?.close()
})

AfterAll(async function () {
  // Global cleanup if needed
})
