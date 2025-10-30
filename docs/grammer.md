# Grammar of Symph

This document outline the grammar rules used in Symph e2e testing framework.

## Headers

 - name: A string representing the name of the test case.

 - url: A string representing the URL to be tested.

  - colorMode: (optional) A string indicating the color mode, either "light" or "dark".

 - flow: A sequence of actions to be performed during the test.

## Actions
- input: to provide input to a form field.
  - selector: A CSS selector string to identify the input field.
  - value: The value to be entered into the input field.
- click: to click on a specific element.
  - selector: A CSS selector string to identify the element to be clicked.
- scroll: to scroll the page to a specific position.
  - position: The position to scroll to (e.g., "top", "bottom", or a specific pixel value).
- wait: to wait for a specific duration.
  - duration: Time in milliseconds to wait.
- clearLocalStorage: to clear the browser's local storage.
- clearCookies: to clear the browser's cookies.
- keyboard: to simulate a key press event.
  - key: The key to be pressed (e.g., "Enter", "Escape", "ArrowUp", "cmd + k").