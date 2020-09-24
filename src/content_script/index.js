'use strict';

const { 
  extractDomainFromUrl 
} = require('./utils');

function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}
injectScript( browser.runtime.getURL('/dist/page_script_bundle.js'), 'body');

//  Listen for data from page script
window.addEventListener("message", function(event) {
  if (event.source == window &&
      event.data &&
      event.data.direction == "cookie_monitor_page_script") {

    const { 
      tcData: consentData,
      gvl: vendorList
    } = event.data.message;
    // printConsent(event.data.message);
    

    const urls = getURLSources();
    notifyBackgroundScript({
      urls,
      consentData,
      vendorList,
      firstPartyDomain: getFirstPartyDomain()
    });
  }
});

function printConsent({tcData, gvl}){
  // Print Global Vendor List Data
  printGVLObject(gvl.features, 'Features');
  printGVLObject(gvl.specialFeatures, 'Special Features');
  printGVLObject(gvl.purposes, 'Purposes');
  printGVLObject(gvl.specialPurposes,  'Special Purposes');
  //printObject(gvl.stacks, 'Stacks');
  
  // Print User Preferences
  console.log(tcData.publisher); // Publisher
  console.log(tcData.purpose); // Purposes
  console.log(tcData.vendor); // Vendors
}

function printGVLObject(obj, name){
  console.log(`=================${name}=================`);
 
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      const value = obj[key];
      console.log(`${value.id}: ${value.name}`);
      console.log(value.description);
    }
  }
}

function getURLSources(){
  const iframe_tags = document.getElementsByTagName("iframe");
  const urls = [];
  
  for (var i = 0; i < iframe_tags.length; i++) { 
    const src = iframe_tags[i].src;

    if(src) {
      urls.push(src);
    }
  }

  // add first party domain
  urls.push(window.location.href);
  return urls; 
}

function getFirstPartyDomain() {
  const url = extractDomainFromUrl(window.location.href);
  return url.substring(3);
}

async function notifyBackgroundScript(payload){
  
  try {
    const {
      third_party_violators,
      first_party_violators
    } = await browser.runtime.sendMessage(payload);
    console.log('First party cookie violators: ', first_party_violators);
    console.log('Third party cookie violators: ', third_party_violators);
    // if(third_party_violators && Array.isArray(third_party_violators)){
    //   third_party_violators.forEach(violator => console.log('Violator: ',violator))
    // }

    // if(first_party_violators && Array.isArray(first_party_violators)){
    //   first_party_violators.forEach(violator => console.log('First party cookie violator: ',violator))
    // }

  } catch(e){ 
    console.error('Error: ', e); 
  };
}

console.log('Content script loaded');