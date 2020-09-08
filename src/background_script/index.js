'use strict';

const { 
  isFirstParyDomain,
  findDomainRegistrant
 } = require('./utils');

const checkThirdPartyConsent = require('./validateConsent');

async function handleMessage(request, sender, sendResponse){
  const { 
    urls, 
    consentData,
    vendorList,
    firstPartyDomain 
  } = request;
  
  const first_party_cookies = [];
  const third_party_cookies = [];

  try {
    for(let url of urls){
      const frame_cookies = await browser.cookies.getAll({ url });
      frame_cookies.forEach(cookie => {
        if(isFirstParyDomain(cookie.domain, firstPartyDomain)){
          addCookie(cookie, first_party_cookies);
  
        }else { // third party
          addCookie(cookie, third_party_cookies);
        }
      });
    }
    
    const vendorNames = await findVendorNames(third_party_cookies); 
    const third_party_violators = checkThirdPartyConsent(vendorNames, consentData, vendorList);
    
    return Promise.resolve({ first_party_cookies, third_party_cookies, third_party_violators });
  }catch(e) { 
    console.error('Cookie Monitor: Error', e); 
  }
}

function addCookie(cookie, cookieList){
  const already_inserted = cookieList.find(element => element.name === cookie.name);
  if(!already_inserted){
    cookieList.push(cookie);
  }
}

async function findVendorNames(third_party_cookies){
  let third_party_vendors = [];

  for (const cookie of third_party_cookies){
    console.log('Cookie: ', cookie);
    const response = await findDomainRegistrant(cookie.domain);
    if(!response || response.status >= 400 ){
      cookie.vendor = null;
    }else {
      cookie.vendor = response.data;
      third_party_vendors.push(response.data);
    }
  }
 
  return third_party_vendors;
}

browser.runtime.onMessage.addListener(handleMessage);
console.log('Cookie Monitor: Background script loaded');