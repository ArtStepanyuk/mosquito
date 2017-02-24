module.exports = function (io) {
    io.on('connection', function(socket) {
        console.log('listening to connection');

        socket.on('add-message', function(message) {
            console.log(message);
            io.emit('notification', {
                message: message
            });
        });
    });
};
