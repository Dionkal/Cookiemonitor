'use strict';

const { ConsentString } = require('consent-string');

function getAndParseConsert() { 
  const consentData = new ConsentString('OztoUHO2ISpPgA');
  console.log(consentData);

  console.log("Device Access Conset: ", consentData.getPurposesAllowed(1));
  console.log("Personalize Advertizing Conset: ", consentData.getPurposesAllowed(1));
  
};

getAndParseConsert();
