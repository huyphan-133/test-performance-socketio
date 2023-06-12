const server_io = require('socket.io')(3000);


/* Amount of client connect to server */
let connection = 0;

function createApp(port) {
    server_io.on('connection', socket => {
        console.log(++connection);

        socket.on('disconnect', function () {
            console.log(--connection);
        })

        socket.on('message', message => {
            let json = JSON.parse(message);
            switch (json.action) {
                case 'sub': {
                    // console.log('client subscribe: '+json.share)
                    /* Subscribe to the share's value stream */
                    socket.join('shares/' + json.share + '/value');
                    break;
                }
            }
        })
    })

    return server_io;
}

function getConnection() {
    return connection;
}

module.exports = {
    createApp,
    getConnection,
}