'use strict';

const whois = require('whois');
const rdap = require('eldardap');
 
( async () => {
  console.log(await rdap("agkn.com", 'domain'));
})();

// whois async wrapper
function whoisAsync(domain){
  return new Promise((resolve,reject) => {
    whois.lookup(domain, (error, data) => {
      if(error){
        reject(new Error(error));
      }
      resolve(data)
    });
  });
}

// Split the string and parse only the registrant line to get info
function getVendorName(data) {
  const split_data = data.split('\r\n');
  const registrant_organization = split_data.find(element => element.includes('Registrant Organization:'));

  return registrant_organization.split(': ')[1];
}

async function findRegistrant(domain){
  let searchDomain = domain;
  // Sometimes cookie domains start with a '.'
  // which will make whois lookup to fail
  if(domain.startsWith('.')){
    searchDomain = domain.substring(1);
  }

  const result = await whoisAsync(searchDomain);
  return getVendorName(result);
}

module.exports = findRegistrant;