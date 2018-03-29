'use strict'; 

const line = require('@line/bot-sdk');
const config = require('../configs');
const datamodel = require('../model/data');
// create LINE SDK client
const client = new line.Client(config.lineconfig);

// create Express app
// about Express itself: https://expressjs.com/

// private
function webhookTmp(req, res){  
    // ช่วยในการทำงานที่เป็นลำดับขั้นตอน
    Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
}

function handleEvent(event){
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
      }
    
      // create a echoing text message
      let echo = { type: 'text', text: event.message.text };
      
      datamodel.create({
        name: event.message.text,
        size: '1',
        type: event.type 
      })
      .then((result) => {
        console.log("result : " + result);
      })
      .catch((error) => {
        console.log("error : " + error);
      });

      // use reply API
      // return client.replyMessage(event.replyToken, echo);
      return client.pushMessage(event.source.userId, echo);
}

// public
module.exports = {
    webhook: webhookTmp
};



