'use strict';

const { ConsentString } = require('consent-string');
const { handleError } = require('./utils');

async function handleMessage(request, sender, sendResponse){
  console.log("Message received from content script: " + request.url);
  var cookies;
  try {
    // 1: Get cookies from url
    const { url } = request;
    cookies = await browser.cookies.getAll({ url });
    // 2: decode consent cookies
    var quantcast_cookies = await getQuantcastConsent(cookies); 
    // 3: Send back consent
    return Promise.resolve({ quantcast_cookies });
  }catch(e) { handleError(e); }
}

async function getQuantcastConsent(cookies){
  var quant_cookies = getQuantcastCookies(cookies);
  const { purposes, features, vendors }  = await getVendorList();

  quant_cookies.forEach(cookie => {
    const { 
      allowedPurposeIds,
      allowedVendorIds
    } = new ConsentString(cookie.value);

    quant_cookies.allowedPurposes = purposes.filter(purpose => 
      allowedPurposeIds.includes(purpose.id)
    );

    quant_cookies.allowedVendors = vendors.filter(vendor => 
      allowedVendorIds.includes(vendor.id)
    );

    // const allowedPurposes = allowedPurposeIds.map( purpose => {return purpose.id; });

    quant_cookies.features = features;
  });

  return quant_cookies;
}

function getQuantcastCookies(cookies){
  const quantcast_cookies = [
    'euconsent',
    //'eupubconsent',
  ];
  return cookies.filter(cookie => quantcast_cookies.includes(cookie.name));
}

// TODO: download the correct version of the vendorlist
async function getVendorList() {
  let vendorList;
  try{
   vendorList= await fetch('https://vendorlist.consensu.org/vendorlist.json');
  }catch(e) { handleError(e); }

  return vendorList.json();
}

browser.runtime.onMessage.addListener(handleMessage);
console.log('Background script loaded');