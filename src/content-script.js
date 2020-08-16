'use strict';

const { handleError, printConsentData } = require('./utils');

function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}
injectScript( browser.runtime.getURL('/src/getCMPObject.js'), 'body');

//  Listen for data from page script
window.addEventListener("message", function(event) {
  if (event.source == window &&
      event.data &&
      event.data.direction == "cookie_monitor_page_script") {
    //console.log('Content script recieved message: ', event.data.message);
    printConsent(event.data.message);
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
    // console.log('iframe ', i, ': ',iframe_tags[i]);
    const src = iframe_tags[i].src;
    // console.log('iframe src: ', src );
    
    if(src) {
      urls.push(src);
    }
  }
  return urls;
}
