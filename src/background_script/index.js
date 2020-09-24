'use strict';

const { 
  isFirstParyDomain,
  findDomainRegistrant
 } = require('./utils');

const {
  checkThirdPartyConsent,
  checkFirstPartyConsent
} = require('./validateConsent');

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
    console.log(`==========Examining host: ${firstPartyDomain}==========`)
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
    
    // Check third party cookies
    console.log('Checking third party cookies');
    const vendorNames = await findVendorNames(third_party_cookies); 
    console.log('Vendor names: ', vendorNames);
    const third_party_violators = checkThirdPartyConsent(vendorNames, consentData, vendorList);
    
    // Check first party cookies
    console.log('Checking first party cookies');
    const first_party_violators = await checkFirstPartyConsent(first_party_cookies, consentData);

    console.log('Sending response to content script');
    return Promise.resolve({ first_party_cookies, third_party_cookies, third_party_violators, first_party_violators });
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