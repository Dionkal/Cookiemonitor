'use strict';

function handleError(error) {
  console.error('Error', error);
}

function printConsentData(quantcast_cookies){
  if(quantcast_cookies){
    console.log('==================Allowed purposes==================');
    if(quantcast_cookies.allowedPurposes && Array.isArray(quantcast_cookies.allowedPurposes)){
      quantcast_cookies.allowedPurposes.forEach(element => {
        console.log(`${element.id} ${element.name}: ${element.description}`);
      });
    }

    console.log('==================Allowed features==================');
    console.log('Please note that the user cannot consent to individual features as they may involve multiple purposes');
    if(quantcast_cookies.features && Array.isArray(quantcast_cookies.features)){
      quantcast_cookies.features.forEach(feature => {
        console.log(`${feature.id}: ${feature.name}:`);
        console.log(feature.description);
      });
    }

    console.log('==================Allowed Vendors==================');
    if(quantcast_cookies.allowedVendors && Array.isArray(quantcast_cookies.allowedVendors) ){
      quantcast_cookies.allowedVendors.forEach(element => {
        console.log(`${element.id}: ${element.name}: ${element.policyUrl}`);
        console.log(`\tPurposes: ${element.purposeIds}`);
        console.log(`\tFeatures: ${element.featureIds}`);
      });
    }

    // TODO: Get Publishers consent  
    }
}

const DOMAIN_REGEX = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/g;

function extractDomainFromUrl(url) {
  const domains = url.match(DOMAIN_REGEX);
  return (domains)? domains[0] : null;
}

function isFirstParyDomain(cookieDomain, firstPartyDomain){
  console.log(`Cookie domain: ${cookieDomain} firstPartyDomain: ${firstPartyDomain}`);
  return cookieDomain.includes(firstPartyDomain);
}

module.exports = {
  handleError,
  printConsentData,
  extractDomainFromUrl,
  isFirstParyDomain,
};
