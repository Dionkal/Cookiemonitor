'use strict';

const { handleError } = require('./utils');

// Main execution - attach event handler
window.addEventListener("click", notifyBackgroundScript);
console.log('Event handler added');

async function notifyBackgroundScript(e){
  let url = window.location.href; 
  console.log("Sending url to background-script: "+ url);
  
  var message;
  try {
    message = await browser.runtime.sendMessage({ url });
    console.log('Received response from the background-script: ', message);
  } catch(e){ handleError(e); };

}
