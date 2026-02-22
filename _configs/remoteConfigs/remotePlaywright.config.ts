import devConfig from '../playwright.config';

const runConfig = devConfig;

runConfig.use.video = { mode: 'retain-on-failure', size: { width: 1280, height: 720 } };
runConfig.use.actionTimeout = 40000;
runConfig.expect.timeout = 40000;
runConfig.timeout = 200000;
runConfig.use.launchOptions.slowMo = 500;

export default runConfig;
