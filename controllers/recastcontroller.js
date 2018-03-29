'use strict';

const recast = require('recastai');
const configs = require('../configs');

module.exports.fnrecast = function(text,id){
    // let recastrequest = new recast.request(configs.recastToken, 'en');
    var build = new recast.build(configs.recastToken, 'en');
    var CONVERSATION_ID = id || '';
    console.log(text);
    return build.dialog({ type: 'text', content: text}, { conversationId: id });

};
