'use strict';

function getCmpData () {
  const message = {};
  window.__tcfapi('getTCData', 2, (tcData, success) => {

    if(success) {
  
      console.log('tcData: ', tcData);
          
       window.__tcfapi('getVendorList', 2, (gvl, success) => {

          if(success) {
            console.log('GVL: ', gvl);

            // send data back to content script
            window.postMessage({
              direction: "cookie_monitor_page_script",
              message: { tcData , gvl }
            }, "*");

          } else {

            console.error('Error while retrieving the gvl');
          }
  
        }, '' );

    } else {

      console.error('Error while retrieving tcData!');

    }

  });

}

getCmpData();
