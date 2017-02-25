// move to app js pass as paramater
const mqtt = require('mqtt'),
  client = mqtt.connect('mqtt://broker.hivemq.com'),
  moment = require('moment');

module.exports = function(io) {

  let sendMessageViaBrooker = (message) => client.publish('getmessage', message);

  //sockets
  io.on('connection', function(socket) {
    console.log('listening to connection');
    socket.on('add-message', (message) => sendMessageViaBrooker(message));
  });

  // mtqq broker
  client.on('connect', (message) => client.subscribe('getmessage', message));
  client.on('message', (topic, message) => {
    io.emit('notification', {
      'postDate': moment(),
      'topic': String(topic),
      'text': String(message)
    });
  });
};

