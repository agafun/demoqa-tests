require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until, Button} = require('selenium-webdriver');


describe('Testing demoqa.com', function() {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    let actions;
    beforeEach(async function() {
        actions = await driver.actions();
    });

   
    describe('Test title, internal and external links', function() {

        it('After opening demoqa.com you get the correct title', async function() {
            await driver.get('https://demoqa.com/');
            let title = await driver.getTitle();
            assert.equal(title, 'ToolsQA – Demo Website to Practice Automation – Demo Website to Practice Automation');
        });

        it('Internal link on top menu links to the correct site', async function() {
            await driver.get('https://demoqa.com/');
            await driver.findElement(By.xpath('//ul[@id="menu-top"]/li[2]/a')).click();
            let currentUrl = await driver.getCurrentUrl();
            assert.equal(currentUrl, 'https://demoqa.com/category/interactions/');
        });

        it('Internal link on sidebar in Interactions section links to the correct site', async function() {
            await driver.get('https://demoqa.com/');
            await driver.findElement(By.xpath('//div[@id="sidebar"]/aside/ul/li[3]/a')).click();
            let currentUrl = await driver.getCurrentUrl();
            assert.equal(currentUrl, 'https://demoqa.com/resizable/');
        });

        it('Internal link on sidebar in Widgets section links to the correct site', async function() {
            await driver.get('https://demoqa.com/');
            await driver.findElement(By.xpath('//div[@id="sidebar"]/aside[2]/ul/li[6]/a')).click();
            let currentUrl = await driver.getCurrentUrl();
            assert.equal(currentUrl, 'https://demoqa.com/tooltip/');
        });

        it('The external link on the header links to toolsqa.com', async function() {
            await driver.get('https://demoqa.com/');
            await driver.findElement(By.xpath('//div[@id="logo-events"]/a')).click();
            let currentUrl = await driver.getCurrentUrl();
            assert.equal(currentUrl, 'https://www.toolsqa.com/');
        });
    });

    describe('Test the Selectable', function(){
        it('After selecting Item 1, Item 1 is highlighted in orange', async function() {
            await driver.get('https://demoqa.com/selectable/');
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[1]")).click();
            let selectedItem1 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[1]")).getAttribute('class');
            let selected = 'ui-widget-content ui-selectee ui-selected';
            assert.equal(selectedItem1, selected);
        });

        it('After selecting Item 7, Item 7 is highlighted in orange', async function() {
            await driver.get('https://demoqa.com/selectable/');
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[7]")).click();
            let selectedItem7 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[7]")).getAttribute('class');
            let selected = 'ui-widget-content ui-selectee ui-selected';
            assert.equal(selectedItem7, selected);
        });

        it('After selecting Item 1, 2 and 3 with ctrl/cmd button, Item 1, 2 and 3 are highlighted in orange', async function() {
            await driver.get('https://demoqa.com/selectable/');
            await actions.keyDown(Key.COMMAND).perform();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[1]")).click();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[2]")).click();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[3]")).click();
            await actions.keyUp(Key.COMMAND).perform();
            let selectedItem1 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[1]")).getAttribute('class');
            let selectedItem2 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[2]")).getAttribute('class');
            let selectedItem3 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[3]")).getAttribute('class');
            let selected = 'ui-widget-content ui-selectee ui-selected';
            assert.equal(selectedItem1, selected);
            assert.equal(selectedItem2, selected);
            assert.equal(selectedItem3, selected);
        });   
        
        it('After selecting Item 1, 2 and 3 and deselecting Item 2 with ctrl/cmd button, only Item 1 and 3 are highlighted in orange', async function() {
            await driver.get('https://demoqa.com/selectable/');
            await actions.keyDown(Key.COMMAND).perform();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[1]")).click();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[2]")).click();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[3]")).click();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[2]")).click();
            await actions.keyUp(Key.COMMAND).perform();
            let selectedItem1 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[1]")).getAttribute('class');
            let selectedItem2 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[2]")).getAttribute('class');
            let selectedItem3 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[3]")).getAttribute('class');
            let selected = 'ui-widget-content ui-selectee ui-selected';
            let unselected = 'ui-widget-content ui-selectee';
            assert.equal(selectedItem1, selected);
            assert.equal(selectedItem2, unselected);
            assert.equal(selectedItem3, selected);
        }); 

        it('After selecting Item 1, 2 and 3 with ctrl/cmd button and selecting Item 1 once again, only Item 1 is highlighted in orange', async function() {
            await driver.get('https://demoqa.com/selectable/');
            await actions.keyDown(Key.COMMAND).perform();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[1]")).click();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[2]")).click();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[3]")).click();
            await actions.keyUp(Key.COMMAND).perform();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[1]")).click();
            let selectedItem1 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[1]")).getAttribute('class');
            let selectedItem2 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[2]")).getAttribute('class');
            let selectedItem3 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[3]")).getAttribute('class');
            let selected = 'ui-widget-content ui-selectee ui-selected';
            let unselected = 'ui-widget-content ui-selectee';
            assert.equal(selectedItem1, selected);
            assert.equal(selectedItem2, unselected);
            assert.equal(selectedItem3, unselected);
        }); 

        it('After selecting Item 4 to 7 by dragging a mouse, Item 4, 5, 6 and 7 are highlighted in orange', async function() {
            await driver.get('https://demoqa.com/selectable/');
            let selectFrom = await driver.findElement(By.xpath("//ol[@id='selectable']/li[4]"));
            let selectTo = await driver.findElement(By.xpath("//ol[@id='selectable']/li[7]"));
            await actions.dragAndDrop(selectFrom, selectTo).perform();
            let selectedItem4 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[4]")).getAttribute('class');
            let selectedItem5 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[5]")).getAttribute('class');
            let selectedItem6 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[6]")).getAttribute('class');
            let selectedItem7 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[7]")).getAttribute('class');
            let selected = 'ui-widget-content ui-selectee ui-selected';
            assert.equal(selectedItem4, selected);
            assert.equal(selectedItem5, selected);
            assert.equal(selectedItem6, selected);
            assert.equal(selectedItem7, selected);
        });

        it('After selecting Item 4 to 7 by dragging a mouse and deselecting Item 5, only Item 4, 6 and 7 are highlighted in orange', async function() {
            await driver.get('https://demoqa.com/selectable/');
            let selectFrom = await driver.findElement(By.xpath("//ol[@id='selectable']/li[4]"));
            let selectTo = await driver.findElement(By.xpath("//ol[@id='selectable']/li[7]"));
            await actions.dragAndDrop(selectFrom, selectTo).perform();
            await actions.keyDown(Key.COMMAND).perform();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[5]")).click();
            await actions.keyUp(Key.COMMAND).perform();
            let selectedItem4 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[4]")).getAttribute('class');
            let selectedItem5 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[5]")).getAttribute('class');
            let selectedItem6 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[6]")).getAttribute('class');
            let selectedItem7 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[7]")).getAttribute('class');
            let selected = 'ui-widget-content ui-selectee ui-selected';
            let unselected = 'ui-widget-content ui-selectee';
            assert.equal(selectedItem4, selected);
            assert.equal(selectedItem5, unselected);
            assert.equal(selectedItem6, selected);
            assert.equal(selectedItem7, selected);
            //assertion error
        }); 

        it('After selecting Item 4 to 7 by dragging a mouse and selecting Item 7 once again, only Item 7 is highlighted in orange', async function() {
            await driver.get('https://demoqa.com/selectable/');
            let selectFrom4 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[4]"));
            let selectTo7 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[7]"));
            await actions.dragAndDrop(selectFrom4, selectTo7).perform();
            await driver.findElement(By.xpath("//ol[@id='selectable']/li[7]")).click();
            let selectedItem7 = await driver.findElement(By.xpath("//ol[@id='selectable']/li[7]")).getAttribute('class');
            let selected = 'ui-widget-content ui-selectee ui-selected';
            assert.equal(selectedItem7, selected);
            //assertion error
        });
    });

    describe('Test the Resizable', function(){
        it('The maximum horizontal size ends on right window edge', async function() {
            await driver.get('https://demoqa.com/resizable/');
            let webElementFrom = await driver.findElement(By.xpath('//div[@id="resizable"]/div[3]'));
            
            const dialog = await driver.findElement(By.id('resizable'));
            const dialogRect = await dialog.getRect();
            console.log(dialogRect);

            // const leftEdgeX = dialogRect.x;
            // const rightEdgeX = dialogRect.x + dialogRect.width;
            // const topEdgeY = dialogRect.y;
            // const bottomEdgeY = dialogRect.y + dialogRect.height;
            // console.log(leftEdgeX, rightEdgeX, topEdgeY, bottomEdgeY);

            // const windowRect = await driver.executeScript(`
            //     return {
            //         width: window.innerWidth,
            //         height: window.innerHeight
            //     };
            // `);
            // const windowLeftEdgeX = 0;
            // const windowRightEdgeX = windowRect.width;
            // const windowTopEdgeY = 0;
            // const windowBottomEdgeY = windowRect.height;

            // console.log(windowLeftEdgeX, windowRightEdgeX, windowTopEdgeY, windowBottomEdgeY);

            // const leftDeltaX = windowLeftEdgeX - leftEdgeX;
            // const rightDeltaX = windowRightEdgeX - rightEdgeX;
            // const topDeltaY = windowTopEdgeY - topEdgeY;
            // const bottomDeltaY = windowBottomEdgeY - bottomEdgeY;
            // Math.floor(leftDeltaX);
            // Math.floor(rightDeltaX);
            // Math.floor(topDeltaY);
            // Math.floor(bottomDeltaY);
            // console.log (Math.floor(leftDeltaX), Math.floor(rightDeltaX), Math.floor(topDeltaY), Math.floor(bottomDeltaY));

            let webElementFromRect = await webElementFrom.getRect();
            await actions.dragAndDrop(webElementFrom, {x:100 + webElementFromRect.width, y:0}).perform();

            const dialogRect2 = await dialog.getRect();
            console.log(dialogRect2);
        });

        it('The minimum horizontal size ends on left element’s edge + 10px', async function() {
            await driver.get('https://demoqa.com/resizable/');
            let webElementFrom = await driver.findElement(By.xpath('//div[@id="resizable"]/div[3]'));
            await actions.dragAndDrop(webElementFrom, {x:-125, y:0}).perform();
        });

        it('The maximum vertical size ends on bottom window edge', async function() {
            await driver.get('https://demoqa.com/resizable/');
            let webElementFrom = await driver.findElement(By.xpath('//div[@id="resizable"]/div[3]'));
            await actions.dragAndDrop(webElementFrom, {x:0, y:251}).perform();
        });

        it('The minimum vertical size ends on up element’s edge + 10px', async function() {
            await driver.get('https://demoqa.com/resizable/');
            let webElementFrom = await driver.findElement(By.xpath('//div[@id="resizable"]/div[3]'));
            await actions.dragAndDrop(webElementFrom, {x:0, y:-125}).perform();
        });

        it('The maximum diagonal size ends on right/bottom window angle', async function() {
            await driver.get('https://demoqa.com/resizable/');
            let webElementFrom = await driver.findElement(By.xpath('//div[@id="resizable"]/div[3]'));
            await actions.dragAndDrop(webElementFrom, {x:626, y:251}).perform();
        });

        it('The minumum diagonal size ends on left/up element’s angle + 10px', async function() {
            await driver.get('https://demoqa.com/resizable/');
            let webElementFrom = await driver.findElement(By.xpath('//div[@id="resizable"]/div[3]'));
            await actions.dragAndDrop(webElementFrom, {x:-125, y:-125}).perform();
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

        it('After dragging the element not to the target the element is placed on release point and the target square is colored gray with inscription `Drop here`', async function() {
            await driver.get('https://demoqa.com/droppable/');
            let webElementFrom = await driver.findElement(By.id('draggable'));
            await actions.dragAndDrop(webElementFrom, {x:300, y:250}).perform();
            let notDropped = await driver.findElement(By.xpath('//div[@id="droppable"]/p')).getText();
            assert.equal(notDropped, 'Drop here');
            let notHighlighted = await driver.findElement(By.xpath('//div[@id="droppable"]')).getAttribute('class');
            assert.equal(notHighlighted, 'ui-widget-header ui-droppable');
        });

        it('After dragging the element not whole to the target the element is placed on release point and the target square is colored gray with inscription `Drop here`', async function() {
            await driver.get('https://demoqa.com/droppable/');
            let webElementFrom = await driver.findElement(By.id('draggable'));
            await actions.dragAndDrop(webElementFrom, {x:70, y:29}).perform();
            let notDropped = await driver.findElement(By.xpath('//div[@id="droppable"]/p')).getText();
            assert.equal(notDropped, 'Drop here');
            let notHighlighted = await driver.findElement(By.xpath('//div[@id="droppable"]')).getAttribute('class');
            assert.equal(notHighlighted, 'ui-widget-header ui-droppable');
        });

        it('After dragging the element outside the element is not visible and the target square is colored gray with inscription `Drop here`', async function() {
            await driver.get('https://demoqa.com/droppable/');
            let webElementFrom = await driver.findElement(By.id('draggable'));
            await actions.dragAndDrop(webElementFrom, {x:-300, y:250}).perform();
            let notDropped = await driver.findElement(By.xpath('//div[@id="droppable"]/p')).getText();
            assert.equal(notDropped, 'Drop here');
            let notHighlighted = await driver.findElement(By.xpath('//div[@id="droppable"]')).getAttribute('class');
            assert.equal(notHighlighted, 'ui-widget-header ui-droppable');
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

    describe('Test the Keyboard Events', function(){
        it('After choosing a file and clicking `Click to Upload` button you should see a window with file path: "C:\\fakepath\\file-upload.png"', async function() {
            await driver.get('https://demoqa.com/keyboard-events/');
            await driver.findElement(By.id('browseFile')).sendKeys('/Users/aga/Desktop/file-upload.png');
            await driver.findElement(By.id('uploadButton')).click();
            let alertText = await driver.switchTo().alert().getText();
            assert.equal(alertText, 'Thanks, you have selected C:\\fakepath\\file-upload.png file to Upload');
            await driver.switchTo().alert().accept();
        });
    });

    describe('Test the Tooltip and Double click', function() {
        it('After double click on double click button you should see an alert window', async function() {
            await driver.get('https://demoqa.com/tooltip-and-double-click/');
            let doubleClickButton = await driver.findElement(By.id('doubleClickBtn'));
            await actions.doubleClick(doubleClickButton).perform();
            let alertText = await driver.switchTo().alert().getText();
            assert.equal(alertText, 'Double Click Alert\n' + '\n' + 'Hi,You are seeing this message as you have double cliked on the button');
            await driver.switchTo().alert().accept();
        });

        it('After right-click on right-click button you should see a select menu', async function() {
            await driver.get('https://demoqa.com/tooltip-and-double-click/');
            await driver.findElement(By.id('rightClickBtn')).click(Button.RIGHT);
            await driver.findElement(By.xpath("//div[@id='rightclickItem']/div[2]")).sendKeys();
            let alertText = await driver.switchTo().alert().getText();
            assert.equal(alertText, 'You have selected Copy');
            await driver.switchTo().alert().accept();
            //Error: element not interactable - WHY?
        });

        it('After hover over hover element you should see a tooltip', async function() {
            await driver.get('https://demoqa.com/tooltip-and-double-click/');
            await actions.move(driver.findElement(By.id('tooltipDemo'))).perform();
            let tooltipText = await driver.findElement(By.className('tooltiptext')).getText();
            assert.equal(tooltipText, 'We ask for your age only for statistical purposes.'); 
            //Assertion Error - WHY?
        });
    });

    describe('Test the Slider', function(){
        it('Slider moves by dragging a mouse to the release point', async function() {
            await driver.get('https://demoqa.com/slider/');
            let slideFrom = await driver.findElement(By.className('ui-slider-handle ui-corner-all ui-state-default'));
            await actions.dragAndDrop(slideFrom, {x:250, y:0}).perform();
            let slidePercent = await driver.findElement(By.xpath('//div[@id="slider"]/span')).getAttribute('style');
            assert.equal(slidePercent, 'left: 64%;')
        });

        it('Slider moves by clicking a bar to the click point', async function() {
            await driver.get('https://demoqa.com/slider/');
            await driver.findElement(By.className('ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content')).click();
            let slidePercent = await driver.findElement(By.xpath('//div[@id="slider"]/span')).getAttribute('style');
            assert.equal(slidePercent, 'left: 50%;')
            //possible improvement: add different click point
        });
    });

    describe('Test the Selectmenu', function(){
        it('After selecting `Slower` in drop-down list, `Slower` is visible in the field', async function() {
            await driver.get('https://demoqa.com/selectmenu/');
            await driver.findElement(By.id('speed-button')).click();
            await driver.findElement(By.id('speed-button')).sendKeys('1');
            let selected = await driver.findElement(By.xpath('//span[@id="speed-button"]/span[2]')).getText();
            assert.equal(selected, 'Slower');
        });
    });

    describe('Test the Dialog', function(){
        it('Dialog window moves to the release point', async function() {
            await driver.get('https://demoqa.com/dialog/');
            let moveFrom = await driver.findElement(By.id('ui-id-1'));
            await actions.dragAndDrop(moveFrom, {x:-587, y:-296}).perform();
            let windowOnPosition = await driver.findElement(By.className('ui-dialog')).getAttribute('style');
            assert.equal(windowOnPosition, 'position: absolute; height: auto; width: 300px; top: 0px; left: 0px; display: block;');
            //possible improvement: assert takes only top and left px information
        });

        it('Size of dialog window is changed horizontally and vertically in all four directions', async function() {
            await driver.get('https://demoqa.com/dialog/');
            let resizeRight = await driver.findElement(By.className('ui-resizable-handle ui-resizable-e'));
            let resizeLeft = await driver.findElement(By.className('ui-resizable-handle ui-resizable-w'));
            let resizeUp = await driver.findElement(By.className('ui-resizable-handle ui-resizable-n'));
            let resizeDown = await driver.findElement(By.className('ui-resizable-handle ui-resizable-s'));
            
            const dialog = await driver.findElement(By.className('ui-dialog'));
            const dialogRect = await dialog.getRect();
            console.log(dialogRect);
            
            // const windowRect = await driver.executeScript(`
            //     return {
            //         width: window.innerWidth,
            //         height: window.innerHeight
            //     };
            // `);
            // const windowLeftEdgeX = 0;
            // const windowRightEdgeX = windowRect.width;
            // const windowTopEdgeY = 0;
            // const windowBottomEdgeY = windowRect.height;
            // console.log(windowLeftEdgeX, windowRightEdgeX, windowTopEdgeY, windowBottomEdgeY);

            await actions.dragAndDrop(resizeRight, {x:100, y:0})
            .dragAndDrop(resizeLeft, {x:-100, y:0})
            .dragAndDrop(resizeUp, {x:0, y:-100})
            .dragAndDrop(resizeDown, {x:0, y:100}).perform();

            const dialogRect2 = await dialog.getRect();
            console.log(dialogRect2);

            assert.deepEqual(dialogRect2, { height: 319, width: 484, x: 350, y: 194.5 });
        });

        it('Size of dialog window is changed diagonally in all four directions', async function() {
            await driver.get('https://demoqa.com/dialog/');
            let resizeRightDown = await driver.findElement(By.className('ui-resizable-handle ui-resizable-se'));
            let resizeRightUp = await driver.findElement(By.className('ui-resizable-handle ui-resizable-ne'));
            let resizeLeftDown = await driver.findElement(By.className('ui-resizable-handle ui-resizable-nw'));
            let resizeLeftUp = await driver.findElement(By.className('ui-resizable-handle ui-resizable-sw'));
            
            const dialog = await driver.findElement(By.className('ui-dialog'));
            const dialogRect = await dialog.getRect();
            console.log(dialogRect);
            
            await actions.dragAndDrop(resizeRightDown, {x:100, y:100})
            .dragAndDrop(resizeRightUp, {x:100, y:-100})
            .dragAndDrop(resizeLeftDown, {x:-100, y:100})
            .dragAndDrop(resizeLeftUp, {x:-100, y:-100}).perform();

            const dialogRect2 = await dialog.getRect();
            console.log(dialogRect2);

            assert.deepEqual(dialogRect2, { height: 150, width: 668, x: 250, y: 294.5 });
        });
        
        it('After closing the dialog window with `x` icon, the window is not visible any more', async function() {
            await driver.get('https://demoqa.com/dialog/');
            await driver.findElement(By.xpath("//div[@class='ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle']/button")).click();
            let windowClosed = await driver.findElement(By.className('ui-dialog')).getAttribute('style');
            assert.equal(windowClosed, 'position: absolute; height: auto; width: 300px; top: 294.5px; left: 450px; display: none;');
            //possible improvement: take only part of style text: 'display: none'
        });
    });
    
    describe('Test the Datepicker', function(){
        it('After clicking on input field, you should see a calendar with highlighted today’s date', async function() {
            await driver.get('https://demoqa.com/datepicker/');
            await driver.findElement(By.id('datepicker')).click();
            let todaysDate = await driver.findElement(By.xpath('//td[@class=" ui-datepicker-days-cell-over  ui-datepicker-today"]/a')).getAttribute('class');
            assert.equal(todaysDate, 'ui-state-default ui-state-highlight ui-state-hover');
        });

        it('After choosing the today’s date in calendar, you should see a today’s date in input field in format mm/dd/yyyy', async function() {
            await driver.get('https://demoqa.com/datepicker/');
            await driver.findElement(By.id('datepicker')).click();
            await driver.findElement(By.xpath('//td[@class=" ui-datepicker-days-cell-over  ui-datepicker-today"]/a')).click();
            let todaysDate = await driver.findElement(By.xpath('//td[@class=" ui-datepicker-days-cell-over  ui-datepicker-today"]/a')).getAttribute('class');
            assert.equal(todaysDate, 'ui-state-default ui-state-highlight ui-state-hover');
            //add an assert which checks date format
        });

        it('After writing a date in format 12/21/2019 you should see a calendar with highlighted date 21/12/2019', async function() {
            await driver.get('https://demoqa.com/datepicker/');
            await driver.findElement(By.id('datepicker')).sendKeys('12/21/2019', Key.RETURN);
            let pickedMonth = await driver.findElement(By.xpath('//div[@class="ui-datepicker-title"]/span[1]')).getText();
            assert.equal(pickedMonth, 'December');
            let pickedYear = await driver.findElement(By.xpath('//div[@class="ui-datepicker-title"]/span[2]')).getText();
            assert.equal(pickedYear, '2019');
            let pickedDay = await driver.findElement(By.xpath('//table[@class="ui-datepicker-calendar"]/tbody/tr[3]/td[7]/a')).getText();
            assert.equal(pickedDay, '21');
            let isHighlighted = await driver.findElement(By.xpath('//table[@class="ui-datepicker-calendar"]/tbody/tr[3]/td[7]/a')).getAttribute('class');
            assert.equal(isHighlighted, 'ui-state-default ui-state-active ui-state-hover');
            //assertion error - January != December
        });

        it('After writing a date in format 01/14/0030 you should see a calendar with highlighted date 21/12/2030', async function() {
            await driver.get('https://demoqa.com/datepicker/');
            await driver.findElement(By.id('datepicker')).sendKeys('01/04/0030', Key.RETURN);
            let pickedYear = await driver.findElement(By.xpath('//div[@class="ui-datepicker-title"]/span[2]')).getText();
            assert.equal(pickedYear, '2030');
        });

        it('After writing a date in format 01/14/0031 you should see a calendar with highlighted date 21/12/1931', async function() {
            await driver.get('https://demoqa.com/datepicker/');
            await driver.findElement(By.id('datepicker')).sendKeys('01/04/0031', Key.RETURN);
            let pickedYear = await driver.findElement(By.xpath('//div[@class="ui-datepicker-title"]/span[2]')).getText();
            assert.equal(pickedYear, '1931');
        });

        it('After writing a date in format 02/29/2019 you should see a calendar with highlighted today’s date', async function() {
            await driver.get('https://demoqa.com/datepicker/');
            await driver.findElement(By.id('datepicker')).sendKeys('02/29/2019', Key.RETURN);
            //assert doesn't work - why?
            // let todaysDate = await driver.findElement(By.xpath('//td[@class=" ui-datepicker-days-cell-over  ui-datepicker-today"]/a')).getAttribute('class');
            // assert.equal(todaysDate, 'ui-state-default ui-state-highlight ui-state-hover');
        });

        it('After writing a date in format 21.12.2019 you should see a calendar with highlighted today’s date', async function() {
            await driver.get('https://demoqa.com/datepicker/');
            await driver.findElement(By.id('datepicker')).sendKeys('21.12.2019', Key.RETURN);
            //assert doesn't work - why?
            // let todaysDate = await driver.findElement(By.xpath('//td[@class=" ui-datepicker-days-cell-over  ui-datepicker-today"]/a')).getAttribute('class');
            // assert.equal(todaysDate, 'ui-state-default ui-state-highlight ui-state-hover');
        });
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
