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
    
    const {quantcast_cookies} = message;
    if(quantcast_cookies){

      console.log('==================Allowed purposes==================');
      quantcast_cookies.allowedPurposes.forEach(element => {
        console.log(`${element.id} ${element.name}: ${element.description}`);
      });
      console.log('==================Allowed Vendors==================');
      quantcast_cookies.allowedVendors.forEach(element => {
        console.log(`${element.id} ${element.name}: ${element.policyUrl}`);
        console.log(`\tPurposes: ${element.purposeIds}`);
        // console.log(`\tFeatures: ${element.featureIds}`);
      });

    }
  } catch(e){ handleError(e); };
}
