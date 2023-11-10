const { test, expect } = require('@playwright/test');
const ChatbotPage = require('../pages/ChatbotPage');
const { getContentLength, waitForContentGrowth } = require('./testHelpers');

test.describe('Scenario 4 - Casual Chatbot Interaction', () => {
    let page, chatbotPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        chatbotPage = new ChatbotPage(page);
    });

    test('engages in a casual conversation with the bot and checks for response growth', async () => {
        await chatbotPage.navigate(process.env.TEST_URL);
        const initialContentLength = await getContentLength(page);

        // Example chit-chat questions
        const questions = [
            'How are you today?',
            'Can you tell me a joke?',
            'What’s your favorite color?',
            'Do you like music?'
        ];

        for (const question of questions) {
            await chatbotPage.askQuestion(question);
            await waitForContentGrowth(page, initialContentLength);
        }

        console.log('Conversation Content:', await chatbotPage.getContentText());
    });

    test.afterAll(async () => {
        await page.close();
    });
});

