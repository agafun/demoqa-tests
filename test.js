require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until, Button} = require('selenium-webdriver');

describe('Testing demoqa.com', function() {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    let actions;
    before(async function() {
        actions = await driver.actions();
    });

    describe('General tests on demoqa.com', function() {

        it('Check title of demoqa.com', async function() {
            await driver.get('https://demoqa.com/');

            // // Enter keywords and click enter
            // await driver.findElement(By.id('lst-ib')).sendKeys('dalenguyen', Key.RETURN);
            // // Wait for the results box by id
            // await driver.wait(until.elementLocated(By.id('rcnt')), 10000);
            
            let title = await driver.getTitle();
            await assert.equal(title, 'ToolsQA – Demo Website to Practice Automation – Demo Website to Practice Automation');
        });
    });


    describe('Test the HTML contact form', function() {
        it('After clicking Submit button you should be redirected to a search website and the url address should contain value of Country and Subject as parameters', async function() {
            await driver.get('https://demoqa.com/html-contact-form/');
            await driver.findElement(By.className('firstname')).sendKeys('Ala');
            await driver.findElement(By.id('lname')).sendKeys('Makota');
            await driver.findElement(By.name('country')).sendKeys('Poland');
            await driver.findElement(By.id('subject')).sendKeys('Hello');
            await driver.findElement(By.xpath(".//div[@id='content']/div[@class='demo-frame']/div[@class='container']/form/input[@type='submit']")).click();
            let currentUrl = await driver.getCurrentUrl();
            assert.equal(currentUrl, 'https://demoqa.com/html-contact-form/onsubmitform?country=Poland&subject=Hello');
            //add improvement: assert which takes not the whole url, but only country & subject
        });

        it('After clicking Submit button you should be redirected to a search website and the url address should contain value of Country and Subject as parameters despite special characters', async function() {
            await driver.get('https://demoqa.com/html-contact-form/');
            await driver.findElement(By.className('firstname')).sendKeys('Ala');
            await driver.findElement(By.id('lname')).sendKeys('Makota');
            await driver.findElement(By.name('country')).sendKeys('P0l4nd');
            await driver.findElement(By.id('subject')).sendKeys('%&*');
            await driver.findElement(By.xpath(".//div[@id='content']/div[@class='demo-frame']/div[@class='container']/form/input[@type='submit']")).click();
            let currentUrl = await driver.getCurrentUrl();
            assert.equal(currentUrl, 'https://demoqa.com/html-contact-form/onsubmitform?country=P0l4nd&subject=%25%26*');
            //add improvement: assert which takes not the whole url, but only country & subject
        });
    });

    describe('Test the Tooltip and Double click', function() {
        it('After double click on double click button you should see an alert window', async function() {
            await driver.get('https://demoqa.com/tooltip-and-double-click/');
            let doubleClickButton = await driver.findElement(By.id('doubleClickBtn'));
            await actions.doubleClick(doubleClickButton).perform();
            //add an assert
            await driver.switchTo().alert().accept();
        });

        it('After right-click on right-click button you should see a select menu', async function() {
            await driver.get('https://demoqa.com/tooltip-and-double-click/');
            await driver.findElement(By.id('rightClickBtn')).click(Button.RIGHT);
            await driver.findElement(By.xpath("//div[@id='rightclickItem']/div[2]")).click();
            //add an assert
            await driver.switchTo().alert().accept();
        });

        it('After hover over hover element you should see a tooltip', async function() {
            await driver.get('https://demoqa.com/tooltip-and-double-click/');
            await actions.move(driver.findElement(By.id('tooltipDemo'))).perform();
            //add an assert
        });
    });

    describe('Test the Slider', function(){
        it('Slider moves by dragging a mouse to the release point', async function() {
            await driver.get('https://demoqa.com/slider/');
            let webElementFrom = await driver.findElement(By.className('ui-slider-handle ui-corner-all ui-state-default'));
            let webElementTo = await driver.findElement(By.className('ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content'));
            await actions.dragAndDrop(webElementFrom, webElementTo).perform();
            //add some different release point/webElementTo
            //add an assert
        });

        it('Slider moves by clicking a bar to the click point', async function() {
            await driver.get('https://demoqa.com/slider/');
            await driver.findElement(By.className('ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content')).click();
            //add some different click point
            //add an assert
        });
    });

    describe('Test the Droppable', function(){
        it('After dragging the element to the target the element is within the target square and the target square is colored yellow with inscription `Dropped!`', async function() {
            await driver.get('https://demoqa.com/droppable/');
            let webElementFrom = await driver.findElement(By.id('draggable'));
            let webElementTo = await driver.findElement(By.id('droppable'));
            await actions.dragAndDrop(webElementFrom, webElementTo).perform();
            // let dropped = await driver.findElement(By.xpath('.//div[@id="droppable"]/p'));
            // assert.equal(dropped, 'Dropped!');
        });

    //     it('After dragging the element not to the target the element is placed on release point and the target square is colored gray with inscription `Drop here`', async function() {
    //         await driver.get('https://demoqa.com/droppable/');
    //         let webElementFrom = await driver.findElement(By.id('draggable'));
    //     });

    //     it('After dragging the element not whole to the target the element is placed on release point and the target square is colored gray with inscription `Drop here`', async function() {
    //         await driver.get('https://demoqa.com/droppable/');
    //         let webElementFrom = await driver.findElement(By.id('draggable'));
    //     });

    //     it('After dragging the element outside the element is nov visible and the target square is colored gray with inscription `Drop here`', async function() {
    //         await driver.get('https://demoqa.com/droppable/');
    //         let webElementFrom = await driver.findElement(By.id('draggable'));
    //     });
    });

    // describe('', function(){
    //     it('', async function() {

    //     });

    //     it('', async function() {

    //     });

    //     it('', async function() {

    //     });
    // });



    // close the browser after running tests
    after(() => driver && driver.quit());

}); 
