const { chromium } = require('playwright');
const ChatbotPage = require('../pages/ChatbotPage');

describe('Scenario 1 - Pod Sandboxing Inquiry', () => {
    let browser, page, chatbotPage;

    beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        chatbotPage = new ChatbotPage(page);
    });

    it('asks the bot about pod sandboxing and checks for response growth', async () => {
        console.log('Navigating to the chatbot page ' + process.env.TEST_URL);
        await chatbotPage.navigate(process.env.TEST_URL);
        const initialContentLength = await getContentLength();
        console.log(`Initial content length: ${initialContentLength}`);

        console.log('Asking the first question');
        await chatbotPage.askQuestion('Tell me about pod sandboxing?');
        await waitForContentGrowth(initialContentLength);

        console.log('Asking the follow-up question');
        await chatbotPage.askQuestion('Is pod sandboxing still in preview?');
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

