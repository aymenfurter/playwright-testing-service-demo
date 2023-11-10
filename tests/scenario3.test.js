const { chromium } = require('playwright');
const ChatbotPage = require('../pages/ChatbotPage');

describe('Scenario 3 - Grounding in Chatbot Development Inquiry', () => {
    let browser, page, chatbotPage;

    beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        chatbotPage = new ChatbotPage(page);
    });

    it('asks the bot about the concept of grounding in chatbot development and checks for response growth', async () => {
        await chatbotPage.navigate(process.env.TEST_URL);
        const initialContentLength = await getContentLength();

        await chatbotPage.askQuestion('What is the concept of grounding when building a chatbot?');
        await waitForContentGrowth(initialContentLength);

        await chatbotPage.askQuestion('Do you have any best practices for implementing grounding?');
        await waitForContentGrowth(initialContentLength);

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

