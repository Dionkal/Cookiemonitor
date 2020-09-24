'use strict';

const { isNecessary, isFirstParyDomain } = require('./utils');

function checkThirdPartyConsent(vendorNames = [], consentData, vendorList){
    const illegal_vendors = [];

    vendorNames.forEach( name => {
        const vendor_data = getThirdPartyVendorsData(vendorList.vendors, name);
        console.log('Vendor: ', name, vendor_data);
        if(vendor_data){
            // 1. Vendor must be explicitily allowed
            if (!consentData.vendor.consents[vendor_data.id]) {
                console.log(`WARNING: Vendor ${vendor_data.name} with id ${vendor_data.id} is breaking consent`);
                illegal_vendors.push({
                    id: vendor_data.id,
                    name: vendor_data.name,
                    reason: 'Vendor is not allowed by user'
                });
            }

            // 2. All vendors purposes must be allowed
            vendor_data.purposes.forEach(vendorPurpose => {
                if(!consentData.purpose.consents[vendorPurpose]){
                    console.log(`WARNING: Vendor ${vendor_data.name} with id ${vendor_data.id} is breaking consent`);
                    illegal_vendors.push({
                        id: vendor_data.id,
                        name: vendor_data.name,
                        reason: 'Purpose is not allowed by user',
                        purpose: vendorPurpose
                    });
                }
            });
        } else {
            console.log('Couldn\'t find data for vendor ', name);
            illegal_vendors.push({
                id: null,
                name,
                reason: 'Vendor is not registered with IAB'
            })
        }
    });
    return illegal_vendors;
}

function getThirdPartyVendorsData(vendors, vendorName){
    for (let [key, value] of Object.entries(vendors)) {
        
        // TODO: might need to trim whitespaces too
        if(value && value.name.toLowerCase() === vendorName.toLowerCase()){
            return value;
        }
    }
    return null;
}

async function checkFirstPartyConsent(firstPartyCookies, consentData){
    const illegal_fp_cookies = []; 

    console.log('First party cookies: ', firstPartyCookies);
    for(let [key, cookie] of Object.entries(firstPartyCookies)){
        console.log('Checking first party cookie: ', cookie);

        const isNec = await isNecessary(cookie.name);
        const purpose1 = consentData.publisher.consents['1'];

        if(!isNec && !purpose1){
            console.log(`WARNING: Cookie ${cookie.name} is breaking consent`);
            illegal_fp_cookies.push({
                name: cookie.name,
                value: cookie.value,
                domain: cookie.domain,
                reason: 'Publisher uses non necessary first party cookie without consent'
            });
        }    
    }
    return illegal_fp_cookies;
}


module.exports = {
    checkThirdPartyConsent,
    checkFirstPartyConsent
};