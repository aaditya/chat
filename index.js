const http = require('http');

const app = require('./app');

const server = http.createServer(app);

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('initialize', function (i) {
        io.emit('connected', socket.id);
    });
    socket.on('message', function (msg) {
        io.emit('broadcast', msg);
    });
    socket.on('disconnect', function () {
        io.emit('disconnected', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Listening.')
});

module.exports = server;