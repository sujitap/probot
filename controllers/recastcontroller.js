'use strict';

const recastai = require('recastai');
const configs = require('../configs');

module.exports.fnrecast = function(text, id){
    var build = new recastai.build(configs.recastToken, 'en');

    build.dialog({ type: 'text', content: 'Hello Recast'}, { conversationId: 'CONVERSATION_ID' })
    .then(function(res) {
        console.log(res);
    });
};
