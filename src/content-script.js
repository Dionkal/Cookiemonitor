function handleResponse(message) {
  console.log('Message received succesfully: ', message.response);
}

function handleError(error) {
  console.log('Error', error);
}
async function notifyBackgroundScript(e){
  let url = window.location.href; 
  console.log("sending url: "+ url);
  var sending = browser.runtime.sendMessage({ url });
  sending.then(handleResponse, handleError);
}

window.addEventListener("click", notifyBackgroundScript);
console.log('Event handler added');
