const WebSocket = require('ws');
const port = 8080
const wss = new WebSocket.Server({port: port})

wss.on('connection', (ws, req) =>  {
    console.log('\x1b[36m%s\x1b[0m', 'Client connected: ' + req.connection.remoteAddress ); 
    console.log(req.connection.remoteAddress)
    ws.on('message', function incoming(data) {
      console.log(data)
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
    });

    ws.binaryType = "arraybuffer";

    ws.on('close',  close = () => {
        console.log("Client beendet Verbindung");
    });
});

console.log('\x1b[32m%s\x1b[0m', 'Server started on port: ' + port);
