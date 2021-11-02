function testListenerCallback() {
  console.log(`It's ALIVE!! MUAHAHAHAHAHA! 🧟`);
}

chrome.omnibox.onInputChanged.addListener(testListenerCallback);
chrome.omnibox.onInputStarted.addListener(testListenerCallback);
