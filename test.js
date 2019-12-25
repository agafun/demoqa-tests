// test.js
// Import requirement packages
require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');

describe('Testing demoqa.com', function() {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    describe('General checks on demoqa.com', function() {

        it('Check title of demoqa.com', async function() {
            // Load the page
            await driver.get('https://demoqa.com/');
            // // Find the search box by id
            // await driver.findElement(By.id('lst-ib')).click();
            // // Enter keywords and click enter
            // await driver.findElement(By.id('lst-ib')).sendKeys('dalenguyen', Key.RETURN);
            // // Wait for the results box by id
            // await driver.wait(until.elementLocated(By.id('rcnt')), 10000);
            
            // Get the title value and test it
            let title = await driver.getTitle();
            assert.equal(title, 'ToolsQA – Demo Website to Practice Automation – Demo Website to Practice Automation');
        });
    });


    describe('Test the HTML contact form', function() {
        it('Check the HTML contact form', async function() {

        });
    });





    

    // close the browser after running tests
    after(() => driver && driver.quit());

}); 
