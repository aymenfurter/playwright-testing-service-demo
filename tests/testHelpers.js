async function getContentLength(page) {
    return await page.evaluate(() => {
        const content = document.querySelector('.content');
        return content ? content.innerHTML.length : 0;
    });
}

async function waitForContentGrowth(page, previousLength) {
    await page.waitForFunction(
        (previousLength) => {
            const content = document.querySelector('.content');
            return content && content.innerHTML.length > previousLength;
        },
        previousLength
    );
}

module.exports = {
    getContentLength,
    waitForContentGrowth
};
