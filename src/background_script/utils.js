'use strict';

const COOKIE_MONITOR_API = 'localhost:3000';
const axios = require('axios').default;

function isFirstParyDomain(cookieDomain, firstPartyDomain){
  // console.log(`Cookie domain: ${cookieDomain} firstPartyDomain: ${firstPartyDomain}`);
  return cookieDomain.includes(firstPartyDomain);
}

async function findDomainRegistrant(domain){
  try{
    const response = await axios({
      method: 'post',
      url: `http://localhost:3000/whois`,
      data: {
        domain: domain
      }
    });
    return response;
  } catch(e) {
    console.error('Error while retrieving whois info: ', e);
  }
}

module.exports = {
  isFirstParyDomain,
  findDomainRegistrant
};
