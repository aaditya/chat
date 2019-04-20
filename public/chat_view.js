$(function () {
    var socket = io();
    socket.emit('initialize', null);
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        var data = {
            id: socket.id,
            msg: $('#m').val()
        }
        socket.emit('message', data);
        $('#m').val('');
        return false;
    });
    socket.on('broadcast', function (data) {
        $('#messages').append($('<li>').html(`<b>${data.id}</b>: ${data.msg}`));
    });
    socket.on('connected', function (id) {
        $('#messages').append($('<li>').html(`User <b>${id}</b> connected.`));
    });
    socket.on('disconnected', function (id) {
        $('#messages').append($('<li>').html(`User <b>${id}</b> disconnected.`));
    });
});