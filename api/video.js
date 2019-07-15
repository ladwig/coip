
const streams = require('memory-streams');

let writer = null;

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.url === '/video') {
    if (req.method === 'POST') {
      req.on('data', (chunk) => {
        if (writer === null) {
	  writer = new streams.ReadableStream(chunk);
        } else {
	  writer.append(chunk);
        }
      });

      return;
    }

    if (req.method === 'GET') {
      if (writer) {
	res.writeHead(200, {
	  'Content-Type': 'video/mp4'
        });

        res.end(writer);
        return;
      }

      res.json({ no: true });
      return;
    }
  }

}
