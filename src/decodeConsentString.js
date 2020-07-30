'use strict';

const { ConsentString } = require('consent-string');

function getAndParseConsert() { 
  const consentData = new ConsentString('BO3UVS4O3UVS4AKAjAENAAAAAAAAAA');
  
  console.log(consentData);
};

getAndParseConsert();
__cmp('getPublisherConsents',[], (data)=> {console.log(data)});