"use strict";
const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
io.on('connection', (socket) => {
    socket.on('location', (jsonn) => {
        console.log(jsonn);
        io.emit('location_update', jsonn);
    });
});
http.listen(8000, () => {
    console.log("Socket server is running!");
});
//# sourceMappingURL=socket.js.map