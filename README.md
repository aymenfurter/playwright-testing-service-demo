# Playwright Testing Service Demo

This repository demonstrates the use of Microsoft's Playwright Testing Service. It contains a set of automated tests that simulate user interactions with a chatbot. The tests are designed to run on multiple browser environments simultaneously, providing comprehensive cross-browser testing.

# Why Playwright Testing Service?
[![Playwright Testing Service Architecture](https://learn.microsoft.com/en-gb/azure/playwright-testing/media/overview-what-is-microsoft-playwright-testing/playwright-testing-architecture-overview.png)](https://learn.microsoft.com/en-gb/azure/playwright-testing/media/overview-what-is-microsoft-playwright-testing/playwright-testing-architecture-overview.png)

Microsoft Playwright Testing Service operates by instantiating cloud-hosted browsers across various operating systems, allowing tests to run on these browsers while the test code remains on your local machine or CI agent. This enables parallel testing in multiple environments, ensuring consistent application performance across different browsers and systems. 


# How to Test Locally Deployed Apps Remotely?
Microsoft Playwright's exposeNetwork feature enables testing of applications on local networks or loopback interfaces using cloud-hosted browsers. It bridges local and remote environments, allowing tests to interact with services not publicly accessible. To use it, configure exposeNetwork in playwright.service.config.ts, specifying networks or using <loopback> for localhost. This setup is ideal for testing development or staging versions of web applications securely and efficiently, ensuring they function correctly in isolated network environments before wider deployment.


## Components

- **GitHub Actions Workflow**: The workflow file [.github/workflows/playwright-tests.yml](.github/workflows/playwright-tests.yml) sets up the CI/CD pipeline for running the tests on GitHub Actions. It installs dependencies, runs the Playwright tests, and uploads the test report as an artifact.

- **Test Configuration**: The [playwright.config.ts](playwright.config.ts) and [playwright.service.config.ts](playwright.service.config.ts) files configure the Playwright test runner and the connection to the Playwright service respectively.

- **Test Scenarios**: The `tests` directory contains four test scenario files ([scenario1.test.js](tests/scenario1.test.js), [scenario2.test.js](tests/scenario2.test.js), [scenario3.test.js](tests/scenario3.test.js), [scenario4.test.js](tests/scenario4.test.js)). Each file represents a different user interaction scenario with the chatbot.

- **Chatbot Page Object**: The [ChatbotPage](tests/pages/ChatbotPage.js) class encapsulates the operations performed on the chatbot page, such as navigating to the page and asking the bot a question.

- **Test Helpers**: The [testHelpers.js](tests/testHelpers.js) file provides helper functions used in the test scenarios.

## Running the Tests

To run the tests locally, you need to have Node.js and npm installed. Then, you can install the dependencies and run the tests with the following commands:
