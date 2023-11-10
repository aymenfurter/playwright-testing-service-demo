const { chromium } = require('playwright');
const ChatbotPage = require('../pages/ChatbotPage');

describe('Scenario 2 - Azure Disk Mounting Inquiry', () => {
    let browser, page, chatbotPage;

    beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        chatbotPage = new ChatbotPage(page);
    });

    it('asks the bot about mounting an Azure disk on a Pod in AKS and checks for response growth', async () => {
        await chatbotPage.navigate(process.env.TEST_URL);
        const initialContentLength = await getContentLength();

        await chatbotPage.askQuestion('Tell me how I can mount an Azure disk on a Pod in AKS?');
        await waitForContentGrowth(initialContentLength);

        await chatbotPage.askQuestion('Do I need any specific AKS extension to be able to mount a disk?');
        await waitForContentGrowth(initialContentLength);

        await chatbotPage.askQuestion('Are there any alternatives to Disks that can be mounted on multiple disks?');
        await waitForContentGrowth(initialContentLength);

        await chatbotPage.askQuestion('Where can I find pricing information?');
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

