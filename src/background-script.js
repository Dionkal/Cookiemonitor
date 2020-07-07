'use strict';

const { ConsentString } = require('consent-string');
const { handleError } = require('./utils');

async function handleMessage(request, sender, sendResponse){
  console.log("Message received from content script: " + request.url);
  // TODO: 
  var cookies;
  try {
    // 1: Get cookies from url
    const { url } = request;
    cookies = await browser.cookies.getAll({ url });
    // 2: decode consent cookies
    var quantcast_cookies = getQuantcastConsent(cookies); 
    // 3 Get consent types
    // TODO; get consent types
    // 4 Send back consent
    return Promise.resolve({ quantcast_cookies });
  }catch(e) { handleError(e); }
}

function getQuantcastConsent(cookies){
  var quant_cookies = getQuantcastCookies(cookies);

  quant_cookies.forEach(cookie => {
    cookie.consent_data = new ConsentString(cookie.value); 
  });
  return quant_cookies;
}


function getQuantcastCookies(cookies){
  const quantcast_cookies = [
    'euconsent',
    'eupubconsent',
  ];
  return cookies.filter(cookie => quantcast_cookies.includes(cookie.name));
}

browser.runtime.onMessage.addListener(handleMessage);
console.log('Background script loaded');
