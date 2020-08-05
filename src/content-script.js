'use strict';

const { handleError, printConsentData } = require('./utils');

// Main execution - attach event handler
window.addEventListener("click", notifyBackgroundScript);
console.log('Event handler added');

async function notifyBackgroundScript(e){
  let url = window.location.href;
  console.log("Sending url to background-script: "+ url);
  
  var message;
  try {
    const urls = getURLSources();
    urls.push(window.location.href);
    message = await browser.runtime.sendMessage({ 
      urls,
      first_party_domain: window.location.href
    });
    
    const {quantcast_cookies} = message;
    
  } catch(e){ handleError(e); };
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