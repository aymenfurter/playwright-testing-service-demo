const { test, expect } = require('@playwright/test');
const ChatbotPage = require('../pages/ChatbotPage');
const { getContentLength, waitForContentGrowth } = require('./testHelpers');

test.describe('Scenario 3 - Grounding in Chatbot Development Inquiry', () => {
    let page, chatbotPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        chatbotPage = new ChatbotPage(page);
    });

    test('asks the bot about the concept of grounding in chatbot development and checks for response growth', async () => {
        await chatbotPage.navigate(process.env.TEST_URL);
        const initialContentLength = await getContentLength(page);

        await chatbotPage.askQuestion('What is the concept of grounding when building a chatbot?');
        await waitForContentGrowth(page, initialContentLength);

        await chatbotPage.askQuestion('Do you have any best practices for implementing grounding?');
        await waitForContentGrowth(page, initialContentLength);

        console.log('Conversation Content:', await chatbotPage.getContentText());
    });

    test.afterAll(async () => {
        await page.close();
    });
});

