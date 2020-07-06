async function getActiveTabURL() {
  const tabs =  await browser.tabs.query({currentWindow: true, active: true});
  const tab = browser.tabs.get(tabs.pop().id);

  return tab.url;
}

function handleResponse(message) {
  console.log('Message received succesfully: ', message.response);
}

function handleError(error) {
  console.log('Error', error);
}
function notifyBackgroundScript(e){
  //let url = await getActiveTabURL();
  //console.log("sending url: "+ url);
  var sending = browser.runtime.sendMessage({ url: 'ok' });
  sending.then(handleResponse, handleError);
}

window.addEventListener("click", notifyBackgroundScript);
console.log('Event handler added');
