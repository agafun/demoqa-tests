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
            assert.equal(title, 'ToolsQA – Demo Website to Practice Automation – Demo Website to Practice Automation');
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
            let slideFrom = await driver.findElement(By.className('ui-slider-handle ui-corner-all ui-state-default'));
            let slideTo = await driver.findElement(By.className('ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content'));
            await actions.dragAndDrop(slideFrom, slideTo).perform();
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
            let dropFrom = await driver.findElement(By.id('draggable'));
            let dropTo = await driver.findElement(By.id('droppable'));
            await actions.dragAndDrop(dropFrom, dropTo).perform();
            let dropped = await driver.findElement(By.xpath('//div[@id="droppable"]/p')).getText();
            assert.equal(dropped, 'Dropped!');
            let highlighted = await driver.findElement(By.xpath('//div[@id="droppable"]')).getAttribute('class');
            assert.equal(highlighted, 'ui-widget-header ui-droppable ui-state-highlight');
        });

        // it('After dragging the element not to the target the element is placed on release point and the target square is colored gray with inscription `Drop here`', async function() {
        //     await driver.get('https://demoqa.com/droppable/');
        //     let webElementFrom = await driver.findElement(By.id('draggable'));
        //     let webElementTo = await driver.findElement(By.xpath('//div[@id="content"]/h1'));
        //     await actions.dragAndDrop(webElementFrom, webElementTo).perform();
        // });

        // it('After dragging the element not whole to the target the element is placed on release point and the target square is colored gray with inscription `Drop here`', async function() {
        //     await driver.get('https://demoqa.com/droppable/');
        //     let webElementFrom = await driver.findElement(By.id('draggable'));
        // });

        // it('After dragging the element outside the element is nov visible and the target square is colored gray with inscription `Drop here`', async function() {
        //     await driver.get('https://demoqa.com/droppable/');
        //     let webElementFrom = await driver.findElement(By.id('draggable'));
        // });
    });

    describe('Test the Checkboxradio', function(){
        it('After selecting New York, Paris and London in Radio Group only London is selected', async function() {
            await driver.get('https://demoqa.com/checkboxradio/');
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset/label[1]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset/label[2]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset/label[3]")).click();
            let londonClassActive = await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset/label[3]")).getAttribute('class');
            let radioCheckboxClassActive = 'ui-checkboxradio-label ui-corner-all ui-button ui-widget ui-checkboxradio-radio-label ui-state-focus ui-visual-focus ui-checkboxradio-checked ui-state-active';
            assert.equal(londonClassActive, radioCheckboxClassActive);
        });

        it('After checking 2 Star, 3 Star, 4 Star and 5 Star and unchecking 4 Star in Checkbox only 2 Star, 3 Star and 5 Star are checked', async function() {
            await driver.get('https://demoqa.com/checkboxradio/');
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[2]/label[1]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[2]/label[2]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[2]/label[3]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[2]/label[4]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[2]/label[3]")).click();
            let star2ClassActive = await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[2]/label[1]")).getAttribute('class');
            let star3ClassActive = await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[2]/label[2]")).getAttribute('class');
            let star5ClassActive = await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[2]/label[4]")).getAttribute('class');
            let checkboxClassActive = 'ui-checkboxradio-label ui-corner-all ui-button ui-widget ui-checkboxradio-checked ui-state-active';
            assert.equal(star2ClassActive, checkboxClassActive);
            assert.equal(star3ClassActive, checkboxClassActive);
            assert.equal(star5ClassActive, checkboxClassActive);
        });

        it('After checking 2 Double, 2 Queen, 1 Queen, 1 King and unchecking 2 Double in Checkbox only 2 Queen, 1 Queen and 1 King are checked', async function() {
            await driver.get('https://demoqa.com/checkboxradio/');
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[3]/label[1]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[3]/label[2]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[3]/label[3]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[3]/label[4]")).click();
            await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[3]/label[1]")).click();
            let queen2ClassActive = await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[3]/label[2]")).getAttribute('class');
            let queen1ClassActive = await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[3]/label[3]")).getAttribute('class');
            let king1ClassActive = await driver.findElement(By.xpath("//div[@id='content']/div[2]/div/fieldset[3]/label[4]")).getAttribute('class');
            let nestedCheckboxClassActive = 'ui-checkboxradio-label ui-corner-all ui-button ui-widget ui-checkboxradio-checked ui-state-active';
            assert.equal(queen2ClassActive, nestedCheckboxClassActive);
            assert.equal(queen1ClassActive, nestedCheckboxClassActive);
            assert.equal(king1ClassActive, nestedCheckboxClassActive);
        });
    });
    

    // describe('Test the Selectable', function(){
    //     it('', async function() {

    //     });

    //     it('', async function() {

    //     });

    //     it('', async function() {

    //     });
    // });

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
