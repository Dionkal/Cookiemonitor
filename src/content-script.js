'use strict';

const { handleError } = require('./utils');

// Main execution - attach event handler
window.addEventListener("click", notifyBackgroundScript);
console.log('Event handler added');

async function notifyBackgroundScript(e){
  let url = window.location.href; 
  console.log('window frames: ', window.frames);
  console.log("Sending url to background-script: "+ url);
  
  var message;
  try {
    message = await browser.runtime.sendMessage({ url });
    
    const {quantcast_cookies} = message;
    if(quantcast_cookies){

      console.log('==================Allowed purposes==================');
      if(quantcast_cookies.allowedPurposes && Array.isArray(quantcast_cookies.allowedPurposes)){
        quantcast_cookies.allowedPurposes.forEach(element => {
          console.log(`${element.id} ${element.name}: ${element.description}`);
        });
      }

      console.log('==================Allowed features==================');
      console.log('Please note that the user cannot consent to individual features as they may involve multiple purposes');
      if(quantcast_cookies.features && Array.isArray(quantcast_cookies.features)){
        quantcast_cookies.features.forEach(feature => {
          console.log(`${feature.id}: ${feature.name}:`);
          console.log(feature.description);
        });
      }

      console.log('==================Allowed Vendors==================');
      if(quantcast_cookies.allowedVendors && Array.isArray(quantcast_cookies.allowedVendors) ){
        quantcast_cookies.allowedVendors.forEach(element => {
          console.log(`${element.id}: ${element.name}: ${element.policyUrl}`);
          console.log(`\tPurposes: ${element.purposeIds}`);
          console.log(`\tFeatures: ${element.featureIds}`);
        });
      }

      // TODO: Get Publishers consent
    }
  } catch(e){ handleError(e); };
}
