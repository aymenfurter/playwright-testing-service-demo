const { chromium } = require('playwright');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const fs = require('fs');
const path = require('path');
const ChatbotPage = require('../pages/ChatbotPage');

expect.extend({ toMatchImageSnapshot });

describe('Initial Screenshot Comparison', () => {
    let browser, page, chatbotPage;
    const baselineDir = path.join(__dirname, '..', 'baseline');
    const screenshotPath = path.join(baselineDir, 'initial_state.png');

    beforeAll(async () => {
        if (!fs.existsSync(baselineDir)) {
            fs.mkdirSync(baselineDir, { recursive: true });
        }

        browser = await chromium.launch();
        page = await browser.newPage();
        chatbotPage = new ChatbotPage(page);
    });

    it('takes a screenshot at the initial state and compares with the baseline', async () => {
        await chatbotPage.navigate(process.env.TEST_URL);

        if (fs.existsSync(screenshotPath)) {
            const image = await page.screenshot();
            expect(image).toMatchImageSnapshot({
                customSnapshotIdentifier: 'initial_state',
                customSnapshotsDir: baselineDir
            });
        } else {
            await page.screenshot({ path: screenshotPath });
        }
    });

    afterAll(async () => {
        await browser.close();
    });
});

