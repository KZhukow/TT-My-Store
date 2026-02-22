import { test as baseTest } from '@playwright/test';

type TestFixtures = {
  testId: string;
};

const test = baseTest.extend<TestFixtures>({
  testId: async ({}, use, testInfo) => {
    const separator = '@';
    if (testInfo.title.includes(separator)) {
      await use(testInfo.title.split(separator)[1].trim());
    } else {
      await use(testInfo.title);
    }
  },
});

export default test;
