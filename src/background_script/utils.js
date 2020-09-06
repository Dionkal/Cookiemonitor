'use strict';

function isFirstParyDomain(cookieDomain, firstPartyDomain){
  console.log(`Cookie domain: ${cookieDomain} firstPartyDomain: ${firstPartyDomain}`);
  return cookieDomain.includes(firstPartyDomain);
}

module.exports = {
  isFirstParyDomain
};
