'use strict'; 

const line = require('@line/bot-sdk');
const config = require('../configs');
const datamodel = require('../model/data');
const recast = require('../controllers/recastcontroller');
// create LINE SDK client
const client = new line.Client(config.lineconfig);

var id = '1';
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
      let echoButton ={
        type: "template",
        altText: "this is a confirm template",
        template: {
            type: "confirm",
            text: event.message.text,
            actions: [
                {
                  type: "message",
                  label: "Yes",
                  text: event.message.text + " ใช่ค่ะ"
                },
                {
                  type: "message",
                  label: "No",
                  text: event.message.text + " ไม่ใช่ค่ะ"
                }
            ]
        }
      };
     
      datamodel.create({
        name: event.message.text,
        size: '1',
        type: event.type 
      })
      .then((result) => {
        return client.pushMessage(event.source.userId, echoButton);
       })
      .catch((error) => {
        console.log("error : " + error);
      });


      let echo = '';
      recast.fnrecast(event.message.text, id)
      .then((a) => {
        id += '1';
        let b = JSON.stringify(a);
        console.log("recast : " +  b);
        echo = { type: 'text', text:  b };
      })  
      .catch((error) => {
        console.log("recast error : " + error);
      });
     
      // use reply API
      return client.pushMessage(event.source.userId, echo);
}

// public
module.exports = {
    webhook: webhookTmp
};



