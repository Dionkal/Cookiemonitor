'use strict';

const getVendorName = require('./lookup'); 
const { 
  handleError,
  isFirstParyDomain
 } = require('./utils');

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
    
    checkThridPartyConsent(third_party_cookies);

    return Promise.resolve({ first_party_cookies, third_party_cookies });
  }catch(e) { 
    handleError(e); 
  }
}

function addCookie(cookie, cookieList){
  const already_inserted = cookieList.find(element => element.name === cookie.name);
  if(!already_inserted){
    cookieList.push(cookie);
  }
}

function checkThridPartyConsent(third_party_cookies){
  if(!typeof array){
    return;
  }

  third_party_cookies.forEach(async cookie => {
    console.log('Third party cookie domain: ', await getVendorName(cookie.domain));
  });
}

browser.runtime.onMessage.addListener(handleMessage);
console.log('Background script loaded');