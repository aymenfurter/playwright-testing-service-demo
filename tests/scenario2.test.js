const { test, expect } = require('@playwright/test');
const ChatbotPage = require('../pages/ChatbotPage');
const { getContentLength, waitForContentGrowth } = require('./testHelpers');

test.describe('Scenario 2 - Azure Disk Mounting Inquiry', () => {
    let page, chatbotPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        chatbotPage = new ChatbotPage(page);
    });

    test('asks the bot about mounting an Azure disk on a Pod in AKS and checks for response growth', async () => {
        await chatbotPage.navigate(process.env.TEST_URL);
        const initialContentLength = await getContentLength(page);

        await chatbotPage.askQuestion('Tell me how I can mount an Azure disk on a Pod in AKS?');
        await waitForContentGrowth(page, initialContentLength);

        await chatbotPage.askQuestion('Do I need any specific AKS extension to be able to mount a disk?');
        await waitForContentGrowth(page, initialContentLength);

        await chatbotPage.askQuestion('Are there any alternatives to Disks that can be mounted on multiple disks?');
        await waitForContentGrowth(page, initialContentLength);

        await chatbotPage.askQuestion('Where can I find pricing information?');
        await waitForContentGrowth(page, initialContentLength);

        console.log('Conversation Content:', await chatbotPage.getContentText());
    });

    test.afterAll(async () => {
        await page.close();
    });
});

