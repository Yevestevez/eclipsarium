import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './test/e2e',
    webServer: {
        command: 'pnpm build && pnpm preview',
        url: 'http://localhost:4321',
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: 'http://localhost:4321',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        ...(!process.env.CI
            ? [{ name: 'mobile', use: { ...devices['Pixel 5'] } }]
            : []),
    ],
});
