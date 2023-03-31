const socketIO = require("socket.io");

function socketSetup(server) {
    console.log("Socket setup")
    const io = socketIO(server);

    io.on("connection", (socket) => {
        console.log("a user is connected");

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    return io;
}

const initSocket = (httpServer) => {
    const io = socketSetup(httpServer);
    return io;
};

module.exports = initSocket;