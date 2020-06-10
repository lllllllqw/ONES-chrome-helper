export function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      const tab = tabs[0]
      if(tab) {
        resolve(tab)
      } else {
        reject(new Error('tab not found'))
      }
    });
  })
}