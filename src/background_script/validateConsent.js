'use strict';

function checkThirdPartyConsent(vendorNames = [], consentData, vendorList){
    const illegal_vendors = [];

    vendorNames.forEach( name => {
        const vendor_data = getThirdPartyVendorsData(vendorList.vendors, name);
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

module.exports = checkThirdPartyConsent;