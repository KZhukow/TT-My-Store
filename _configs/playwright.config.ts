import path from 'path';

import { PlaywrightTestConfig } from '@playwright/test';

import config from '../appConfig';

const rootPath = process.cwd();

const devConfig: PlaywrightTestConfig = {
  globalSetup: path.join(rootPath, 'global-setup'),
  testDir: path.join(rootPath, 'Tests'),
  snapshotPathTemplate: path.join(rootPath, 'Screenshots/{arg}-{projectName}{ext}'),
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'off',
    ignoreHTTPSErrors: true,
    baseURL: config.baseURL,
    viewport: { width: 1920, height: 1080 },
    timezoneId: 'Europe/Minsk',
    launchOptions: {
      slowMo: 250,
    },
    actionTimeout: 20000,
  },
  expect: {
    toMatchSnapshot: { maxDiffPixels: 500 },
    timeout: 20000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  timeout: 180000,
  workers: 8,
  reporter: 'list',
};

export default devConfig;
