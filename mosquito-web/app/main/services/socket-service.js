angular.module('app.main')
    .factory('socket', function () {

        const socket = io.connect();

        return {
            on: (eventName, callback) => {
                socket.on(eventName, callback);
            },
            emit: (eventName, data) => {
                socket.emit(eventName, data);
            }
        };
});