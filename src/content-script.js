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
    //console.log('Received response from the background-script: ', message);
    // Print Data
    //parseConsentData(message.quantcast_cookies[0].consent_data);
    //parseConsentData(message.quantcast_cookies[1].consent_data);
  } catch(e){ handleError(e); };

  
}


function parseConsentData(consetData) {
  console.log('consent data: ', consetData);
  console.log('Device access consent: ', consetData.getPurposesAllowed(1));
  console.log('Personalize advertizing consent: ', consetData.getPurposesAllowed(2));
}
