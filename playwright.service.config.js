import { defineConfig } from '@playwright/test';
import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright';
import { DefaultAzureCredential } from '@azure/identity';
import baseConfig from './playwright.config.js';

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
export default defineConfig({
  ...baseConfig,
  ...createAzurePlaywrightConfig(baseConfig, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000,
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  
    reporter: [
  ['html', { open: 'never' }],
  ['@azure/playwright/reporter'],
],
  
});
