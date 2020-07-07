function handleMessage(request, sender, sendResponse){
  console.log("Message received from content script" + request.url);
  // TODO: 
  // 1: Get cookies from url
  // 2: decode consent cookies
  // 3 Send back consent
  sendResponse({response: 'response'});
}


console.log('Background script loaded');
browser.runtime.onMessage.addListener(handleMessage);
