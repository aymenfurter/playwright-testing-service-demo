const { test, expect } = require('@playwright/test');
const ChatbotPage = require('../pages/ChatbotPage');
const { getContentLength, waitForContentGrowth } = require('./testHelpers');

test.describe('Scenario 1 - Pod Sandboxing Inquiry', () => {
    let page, chatbotPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        chatbotPage = new ChatbotPage(page);
    });

    test('asks the bot about pod sandboxing and checks for response growth', async () => {
        await chatbotPage.navigate(process.env.TEST_URL);
        const initialContentLength = await getContentLength(page);

        await chatbotPage.askQuestion('Tell me about pod sandboxing?');
        await waitForContentGrowth(page, initialContentLength);

        await chatbotPage.askQuestion('Is pod sandboxing still in preview?');
        await waitForContentGrowth(page, initialContentLength);

        console.log('Conversation Content:', await chatbotPage.getContentText());
    });

    test.afterAll(async () => {
        await page.close();
    });
});

