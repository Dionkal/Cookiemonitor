'use strict';

const { ConsentString } = require('consent-string');
const { handleError } = require('./utils');

async function handleMessage(request, sender, sendResponse){
  console.log("Message received from content script" + request.url);
  // TODO: 
  var cookies;
  try {
    // 1: Get cookies from url
    const { url } = request;
    cookies = await browser.cookies.getAll({ url });
    console.log('cookies: ', cookies);
    // 2: decode consent cookies
    // 3 Send back consent
  }catch(e) { handleError(e); }

  sendResponse({response: 'response'});
}


console.log('Background script loaded');
browser.runtime.onMessage.addListener(handleMessage);
