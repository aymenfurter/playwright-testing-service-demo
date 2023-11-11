# Playwright Testing Service Demo
This repository demonstrates the use of Microsoft's Playwright Testing Service. It contains a set of automated tests that simulate user interactions with a chatbot. The tests are designed to run on multiple browser environments simultaneously, showcasing cross-browser testing.

## Components

- **GitHub Actions Workflow**: The workflow file [.github/workflows/playwright-tests.yml](.github/workflows/playwright-tests.yml) sets up the CI/CD pipeline for running the tests on GitHub Actions. It installs dependencies, runs the Playwright tests, and uploads the test report as an artifact.

- **Test Configuration**: The [playwright.config.ts](playwright.config.ts) and [playwright.service.config.ts](playwright.service.config.ts) files configure the Playwright test runner and the connection to the Playwright service respectively.

- **Test Scenarios**: The `tests` directory contains four test scenario files ([scenario1.test.js](tests/scenario1.test.js), [scenario2.test.js](tests/scenario2.test.js), [scenario3.test.js](tests/scenario3.test.js), [scenario4.test.js](tests/scenario4.test.js)). Each file represents a different user interaction scenario with the chatbot.

- **Chatbot Page Object**: The [ChatbotPage](tests/pages/ChatbotPage.js](https://github.com/aymenfurter/playwright-testing-service-demo/blob/main/pages/ChatbotPage.js) class encapsulates the operations performed on the chatbot page, such as navigating to the page and asking the bot a question.

- **Test Helpers**: The [testHelpers.js](tests/testHelpers.js) file provides helper functions used in the test scenarios.

## Running the Tests
To run the tests locally, you need to have Node.js and npm installed. Then, you can install the dependencies and run the tests with the following commands:

```bash
npm install
npx playwright test
```


## Why Choose Microsoft Playwright Testing Service?

[![Playwright Testing Service Architecture](https://learn.microsoft.com/en-gb/azure/playwright-testing/media/overview-what-is-microsoft-playwright-testing/playwright-testing-architecture-overview.png)](https://learn.microsoft.com/en-gb/azure/playwright-testing/media/overview-what-is-microsoft-playwright-testing/playwright-testing-architecture-overview.png)

Microsoft Playwright Testing Service simplifies the way automated tests are conducted by leveraging cloud-hosted browsers across a variety of operating systems. This approach allows for the execution of tests on these browsers while maintaining the test code on your local machine or Continuous Integration (CI) agent.

For more details, visit [Microsoft Playwright Testing Overview](https://learn.microsoft.com/en-gb/azure/playwright-testing/overview-what-is-microsoft-playwright-testing).

## How to Test Locally Deployed Apps Remotely?

The `exposeNetwork` feature is a handy for testing applications that are deployed locally but need to be tested remotely using cloud-hosted browsers. This feature bridges the gap between local and remote environments, enabling tests to interact with services that are not publicly accessible. To utilize this feature:

1. Configure `exposeNetwork` in your `playwright.service.config.ts`.
2. Specify the networks to be exposed (e.g. use `<loopback>` for localhost).

For implementation details, see  [playwright.service.config.ts](https://github.com/aymenfurter/playwright-testing-service-demo/blob/main/playwright.service.config.ts) and the guide on [How to Test Local Applications](https://learn.microsoft.com/en-gb/azure/playwright-testing/how-to-test-local-applications).

## Additional Information

### Creating a Playwright Workspace
For a step-by-step guide on setting up a Playwright workspace, refer to the following Microsoft documentation:
- [How to Manage Playwright Workspace](https://learn.microsoft.com/en-gb/azure/playwright-testing/how-to-manage-playwright-workspace?tabs=portal#create-a-workspace)

### CI/CD Integration
To integrate Playwright into your Continuous Integration and Continuous Deployment (CI/CD) pipeline, you can follow the guide provided by Microsoft and also refer to the example in this repository:
- [Automate End-to-End Testing with Playwright](https://learn.microsoft.com/en-gb/azure/playwright-testing/quickstart-automate-end-to-end-testing?tabs=github)
- [Example CI/CD Workflow File](https://github.com/aymenfurter/playwright-testing-service-demo/blob/main/.github/workflows/playwright-tests.yml)

### Scaling and Speeding Up Tests
For insights on scaling and speeding up your Playwright tests, check out the following resource:
- [Determining Optimal Configuration for Playwright Tests](https://learn.microsoft.com/en-gb/azure/playwright-testing/concept-determine-optimal-configuration#factors-that-influence-completion-time)

### Visual Comparison in Playwright
For background information and guidance on implementing visual comparisons in your Playwright tests, refer to this guide:
- [Configuring Visual Comparisons in Playwright](https://learn.microsoft.com/en-gb/azure/playwright-testing/how-to-configure-visual-comparisons)

### Scaleability Demonstration
The following repository demonstrates how to effectively scale to a thousands of tests, executed in parallel
- [microsoft/playwright-testing-service](https://github.com/microsoft/playwright-testing-service/tree/main)
