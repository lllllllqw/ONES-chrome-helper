console.log('This is background page!');

// 没用啊。。
// chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
//     if(details.requestHeaders) {
//         details.requestHeaders.push({
//             name: 'x-ones-api-branch-project',
//             value: '/project/master/'
//         })
//         console.log("onBeforeSendHeaders details.requestHeaders", details.requestHeaders)
//     }
//     return {requestHeaders: details.requestHeaders};
// }, {
//     urls: ['<all_urls>']
// }, ['requestHeaders', 'extraHeaders'])

// chrome.webRequest.onSendHeaders.addListener((details) => {
//     if(details.requestHeaders) {
//         console.log("onSendHeaders details.requestHeaders", details.requestHeaders)
//     }
// }, {
//     urls: ['<all_urls>']
// }, ['requestHeaders'])

export default null;
