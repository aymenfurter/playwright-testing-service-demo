class ChatbotPage {
    constructor(page) {
        this.page = page;
        this.userMessageInput = 'input[name="userMessage"]';
        this.submitButton = '.send-button';
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async askQuestion(question) {
        await this.page.fill(this.userMessageInput, question);
        await this.page.waitForSelector(this.submitButton, { state: 'visible' });
        await this.page.click(this.submitButton);

        // Wait for the button to become disabled
        await this.page.waitForSelector(`${this.submitButton}[disabled]`, { state: 'attached' });

        // Then wait for the button to become enabled again
        await this.page.waitForSelector(`${this.submitButton}:not([disabled])`);
    }

    async getContentText() {
        return this.page.textContent('.content');
    }
}

module.exports = ChatbotPage;
