# [DEMOQA.COM](https://demoqa.com) TESTS

[demoqa.com](https://demoqa.com) is a basic demo site provided by [toolsqa.com](https://www.toolsqa.com) to learn and practice Selenium. It contains training modules like contact forms, menus to select, buttons to click etc.

## [Test Plan](test-plan.md)
More details about the object, approach, features to be tested and are to find in [Test Plan](test-plan.md).

## Methods
In these automated tests I have used a combination of Selenium WebDriver with Java Script. I have learned many methods like:
```
get()
getTitle()
getCurrentUrl()
getAttribute()
getText()
findElement()
click()
sendKeys()
switchTo()
```
or methods from Actions class:
```
keyDown()
keyUp()
dragAndDrop()
doubleClick()
contextClick()
move()
```

## Tests

### [Test Suite](test-suite.md)

There are 38 test cases with expected results, reproduction steps and actual problems are presented in the [Test Suite](test-suite.md).

### Results

Below video record presents the test script execution:

![Test screen record](test-screen-record.gif)

Test results are presented below:

```
Testing demoqa.com
    Test title, internal and external links
      ✓ After opening demoqa.com you get the title `ToolsQA – Demo Website to Practice Automation – Demo Website to Practice Automation` (2917ms)
      ✓ Internal link on top menu `Interactions` links to the site `https://demoqa.com/category/interactions/` (823ms)
      ✓ Internal link on sidebar in Interactions section `Resizable` links to the site `https://demoqa.com/resizable/` (1186ms)
      ✓ Internal link on sidebar in Widgets section `Tooltip` links to thet site `https://demoqa.com/tooltip/` (888ms)
      ✓ The external link on the header links to toolsqa.com (3381ms)
    Test the Selectable
      ✓ After selecting Item 1, Item 1 is highlighted in orange (892ms)
      ✓ After selecting Item 7, Item 7 is highlighted in orange (544ms)
      ✓ After selecting Item 1, 2 and 3 with ctrl/cmd button, Item 1, 2 and 3 are highlighted in orange (584ms)
      ✓ After selecting Item 1, 2 and 3 and deselecting Item 2 with ctrl/cmd button, only Item 1 and 3 are highlighted in orange (637ms)
      ✓ After selecting Item 1, 2 and 3 with ctrl/cmd button and selecting Item 1 once again, only Item 1 is highlighted in orange (617ms)
      ✓ After selecting Item 4 to 7 by dragging a mouse, Item 4, 5, 6 and 7 are highlighted in orange (743ms)
      ✓ After selecting Item 4 to 7 by dragging a mouse and selecting Item 7 once again, only Item 7 is highlighted in orange (759ms)
    Test the Resizable
      1) The element is resized horizontally by 100 px
      2) The element is resized horizontally by 200 px
      3) The element is resized diagonally to the minimum size
    Test the Droppable
      ✓ After dragging the element to the target the element is within the target square and the target square is colored yellow with inscription `Dropped!` (703ms)
      ✓ After dragging the element not to the target the element is placed on release point and the target square is colored gray with inscription `Drop here` (683ms)
      ✓ After dragging the element not whole to the target the element is placed on release point and the target square is colored gray with inscription `Drop here` (834ms)
    Test the HTML contact form
      ✓ After clicking Submit button you should be redirected to a search website and the url address should contain value of Country and Subject as parameters (1513ms)
      ✓ After clicking Submit button you should be redirected to a search website and the url address should contain value of Country and Subject as parameters despite special characters (1399ms)
    Test the Keyboard Events
      ✓ After choosing a file and clicking `Click to Upload` button you should see a window with file path: "C:\fakepath\file-upload.png" (591ms)
    Test the Tooltip and Double click
      ✓ After double click on double click button you should see an alert window (598ms)
      4) After right-click on right-click button you should see a select menu
      ✓ After hover over hover element you should see a tooltip (1458ms)
    Test the Slider
      ✓ Slider moves by dragging a mouse to the release point (689ms)
      ✓ Slider moves by clicking a bar to the click point (1469ms)
    Test the Dialog
      ✓ Dialog window moves to the release point (957ms)
      5) Size of dialog window is changed horizontally and vertically in all four directions
      6) Size of dialog window is changed diagonally in all four directions
      ✓ After closing the dialog window with `x` icon, the window is not visible any more (535ms)
    Test the Datepicker
      ✓ After clicking on input field, you should see a calendar with highlighted today’s date (524ms)
      ✓ After choosing the today’s date in calendar, you should see a today’s date in input field in format mm/dd/yyyy (613ms)
      ✓ After writing a date in format 12/21/2019 you should see a calendar with highlighted date 21/12/2019 (536ms)
      ✓ After writing a date in format 01/14/0030 you should see a calendar with highlighted date 21/12/2030 (461ms)
      ✓ After writing a date in format 01/14/0031 you should see a calendar with highlighted date 21/12/1931 (468ms)
    Test the Checkboxradio
      ✓ After selecting New York, Paris and London in Radio Group only London is selected (789ms)
      ✓ After checking 2 Star, 3 Star, 4 Star and 5 Star and unchecking 4 Star in Checkbox only 2 Star, 3 Star and 5 Star are checked (757ms)
      ✓ After checking 2 Double, 2 Queen, 1 Queen, 1 King and unchecking 2 Double in Checkbox only 2 Queen, 1 Queen and 1 King are checked (777ms)


  32 passing (41s)
  6 failing
```


