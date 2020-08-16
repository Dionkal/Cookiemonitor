'use strict';

const { ConsentString } = require('consent-string');

function getAndParseConsert() { 
  const consentData = new ConsentString('BO30SqbO30SqbAcABBENDU-AAAAxJ7_______9_-____9uz_Ov_v_f__33e8__9v_l_7_-___s_-23d4u_1vf99yfmx-7etr3tp_47ues2_Xurf_71__3z3_9pxP78E89r7335EQ_v-_v-b7BCPN_Y2v-8K96lPK');
  
  console.log(consentData);
};

getAndParseConsert();
// __cmp('getPublisherConsents',[], (data)=> {console.log(data)});