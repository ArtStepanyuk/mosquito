// module.exports = function (socket) {
//
//     socket.on('send:message', function (data) {
//         console.log(data);
//         socket.broadcast.emit('send:message', {
//             text: data.message
//         });
//     });
//
// };


module.exports = function (io) {
    'use strict';
    io.on('connection', function (socket) {
        socket.on('message', function (from, msg) {

            console.log('recieved message from',
                from, 'msg', JSON.stringify(msg));

            console.log('broadcasting message');
            console.log('payload is', msg);
            io.sockets.emit('broadcast', {
                payload: msg,
                source: from
            });
            console.log('broadcast complete');
        });
    });
};
