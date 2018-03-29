'use strict';

const recast = require('recastai');
const configs = require('../configs');

function fnrecast(){
    let recastrequest = new recast.request(configs.recastToken, 'en');
    // console.log(recastrequest);
}

module.exports = {
fnrecast: fnrecast
};
