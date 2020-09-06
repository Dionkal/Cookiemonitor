'use strict';

function handleError(error) {
  console.error('Error', error);
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
  extractDomainFromUrl,
  isFirstParyDomain,
};
