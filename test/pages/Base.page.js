class BasePage {
    url = '';

    // async below added to show the function returns a promise
    async getUrl() { 
        return browser.getUrl(); 
    }
    async navigate() {
        await browser.url(this.url);
    }
}

module.exports = { BasePage };
