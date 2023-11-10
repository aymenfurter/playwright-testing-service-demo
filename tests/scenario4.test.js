const { chromium } = require('playwright');
const ChatbotPage = require('../pages/ChatbotPage');

describe('Scenario 4 - Casual Chatbot Interaction', () => {
    let browser, page, chatbotPage;

    beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        chatbotPage = new ChatbotPage(page);
    });

    it('engages in a casual conversation with the bot and checks for response growth', async () => {
        await chatbotPage.navigate(process.env.TEST_URL);
        const initialContentLength = await getContentLength();

        // Example chit-chat questions
        const questions = [
            'How are you today?',
            'Can you tell me a joke?',
            'What’s your favorite color?',
            'Do you like music?'
        ];

        for (const question of questions) {
            await chatbotPage.askQuestion(question);
            await waitForContentGrowth(initialContentLength);
        }

        console.log('Conversation Content:', await chatbotPage.getContentText());
    });

    afterAll(async () => {
        await browser.close();
    });

    async function getContentLength() {
        return await page.evaluate(() => {
            const content = document.querySelector('.content');
            return content ? content.innerHTML.length : 0;
        });
    }

    async function waitForContentGrowth(previousLength) {
        await page.waitForFunction(
            (previousLength) => {
                const content = document.querySelector('.content');
                return content && content.innerHTML.length > previousLength;
            },
            previousLength
        );
    }
});

