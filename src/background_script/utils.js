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

async function isNecessary(cookieName){
  try{
    const response = await axios({
      method: 'get',
      url: `https://cookiepedia.co.uk/cookies/${cookieName}`
    });
    
    if(response.status === 200) {
      const split_data = response.data.split(/[\r\n]/);
      const data_line = split_data.find(element => element.includes('The main purpose of this cookie is:'));
      
      if(!data_line) {
        return false;
      }
      return data_line.includes('Strictly Necessary');
    }
    return false;

  }catch(e){
    console.error('Error while searching cookiepedia for ', cookieName);
  }
}

module.exports = {
  isFirstParyDomain,
  findDomainRegistrant,
  isNecessary
};
