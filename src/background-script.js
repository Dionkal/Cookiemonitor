function handleMessage(request, sender, sendResponse){
  console.log("received", request);
  console.log("Message received from content script" + request.url);
  sendResponse({response: 'response'});
}


console.log('Background script loaded');
browser.runtime.onMessage.addListener(handleMessage);
