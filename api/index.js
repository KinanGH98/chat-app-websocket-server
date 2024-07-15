const { Server } = require('ws');

// Get the port from environment variable or default to 8080
const PORT = process.env.PORT || 8080;

// Create a WebSocket server
const wss = new Server({ port: PORT }, () => {
    console.log(`Server started on port ${PORT}`);
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    });
});

module.exports = (req, res) => {
    res.status(200).send('WebSocket server is running.');
};
