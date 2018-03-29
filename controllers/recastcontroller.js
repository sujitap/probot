'use strict';

const recastai = require('recastai');
const configs = require('../configs');

module.exports.fnrecast = function(text, id){
    var build = new recastai.build(configs.recastToken, 'en');
    return build.dialog({ type: 'text', content: text}, { conversationId: id });
    // .then(function(res) {
    //     console.log(res);
    // });
};
