console.log('background.js load!')

chrome.storage.local.get(['branch'], ({branch}) => {
  console.log("branch", branch)
})