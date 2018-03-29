'use strict';

const recast = require('recastai');
const configs = require('../configs');

function fnrecast(conver){
    // let recastrequest = new recast.request(configs.recastToken, 'en');
    var build = new recast.build(configs.recastToken, 'en');
    var CONVERSATION_ID = conver || '';

    build.dialog({ type: 'text', content: 'Hello Recast'}, { conversationId: CONVERSATION_ID });
}

module.exports = {
 fnrecast: fnrecast(conver)
};
