'use strict';

const { ConsentString } = require('consent-string');


function getAndParseConsert(tabs) { 
  const consentData = new ConsentString('BOvcPVsOvcPVsAKAACENC_wAAAAuhr_7f_52_8_u3fZ_NuinOp_j_ef_XWUcLZYvcAvzhY9Zfi_EwhU4m_0PRM9ycgx85cpDCsoxQ7CSkCCBGgNeTtn9mzgWxoRP6wEcJrz33bEw-ro2v-ZzACGN_YhEyA');
  console.log(consentData);

  console.log("Device Access Conset: ", consentData.getPurposesAllowed(1));
  console.log("Personalize Advertizing Conset: ", consentData.getPurposesAllowed(1));
  
};

function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}

getActiveTab().then(getAndParseConsert);
