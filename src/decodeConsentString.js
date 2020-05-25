'use strict';

const { ConsentString } = require('consent-string');


function getAndParseConsert(tabs) { 
  const consentData = new ConsentString('BOvcPVsOvcPVsAKAACENC_wAAAAuhr_7f_52_8_u3fZ_NuinOp_j_ef_XWUcLZYvcAvzhY9Zfi_EwhU4m_0PRM9ycgx85cpDCsoxQ7CSkCCBGgNeTtn9mzgWxoRP6wEcJrz33bEw-ro2v-ZzACGN_YhEyA');
  console.log(consentData);

  console.log("Device Access Conset: ", consentData.getPurposesAllowed(1));
  console.log("Personalize Advertizing Conset: ", consentData.getPurposesAllowed(1));
  
  let tab = tabs.pop();

  //get all cookies in the domain
  var gettingAllCookies = browser.cookies.getAll({url: tab.url});

  gettingAllCookies.then((cookies) => {
    if (cookies.length > 0) {
      console.log("Print All cookies");
      for (let cookie of cookies) {
        console.log("cookie: ", cookie);
      }
    }
  });
  // var gettingAllCookies = browser.cookies.get({name: 'eupubconsent'});
  console.log("END");
};

function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}

getActiveTab().then(getAndParseConsert);