const WebSocket = require("ws");
const port = 8080;
const wss = new WebSocket.Server({ port });
const raspividStream = require('raspivid-stream');
const videoStream = raspividStream({
    width:'960',
    height: 540,
    framerate: 12,
    profile: 'baseline',
    timeout: 0,
    preview: true});

wss.on("connection", (ws, req) => {
      console.log(
              "\x1b[36m%s\x1b[0m",
              "New client connected: " + req.connection.remoteAddress
            );
   videoStream.on('data', (data) => {
            ws.send(data, { binary: true }, (error) => { if (error) console.error(error); });
    });

      ws.on('message', function incoming(data) {
              console.log(data);
      });
});
    console.log("\x1b[32m%s\x1b[0m", "Server started on port: " + port);
