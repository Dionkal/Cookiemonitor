// Main execution - attach event handler
window.addEventListener("click", notifyBackgroundScript);
console.log('Event handler added');

async function notifyBackgroundScript(e){
  let url = window.location.href; 
  console.log("sending url: "+ url);
  
  var message;
  try {
    message = await browser.runtime.sendMessage({ url });
  } catch(e){ handleError(e); };

  console.log('Response: ', message);
  // TODO: get cookie results
}


// Utils
function handleError(error) {
  console.log('Error', error);
}
