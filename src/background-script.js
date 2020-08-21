'use strict';

const { handleError } = require('./utils');

async function handleMessage(request, sender, sendResponse){
  const { 
    urls, 
    consentData,
    vendorList,
    firstPartyDomain 
  } = request;
  const cookies = [];

  try {

    for(let url of urls){
      const frame_cookies = await browser.cookies.getAll({ url });
      cookies.push(...frame_cookies);
    }
    console.debug('All cookies: ', cookies);
    return Promise.resolve({ cookies });
  }catch(e) { 
    handleError(e); 
  }
}

browser.runtime.onMessage.addListener(handleMessage);
console.log('Background script loaded');