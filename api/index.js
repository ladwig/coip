const fetch = require('isomorphic-fetch');
const streams = require('memory-streams');

const tokens = {}; //Objekt, das eingeloggte User in Form von tokens speichert

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

  //Wird beim Login ausgeführt. Codiert übergebene credentials und übergibt diese an FHWS-API
  if (req.url === '/issue-token') {
    const credentials = String(req.headers['authorization']).replace('Basic ', '');
    const [username, password] = credentials.split(':');
    const encodedCredentials = new Buffer(credentials).toString('base64');
    const response = await fetch('https://api.fiw.fhws.de/auth/api/users/me', {
      headers: {
        Authorization: 'Basic ' + encodedCredentials
      }
    });

    //Wenn FHWS-API positive Rückmeldung gibt, wird token generiert und Objekt "tokens"
    // gespeichert. Der Token wird auch ans Frontend returned (dort wird dann Cookie generiert)
    if (response.status === 200) {
      const token = String(Math.random().toString(36).split('.')[1]);

      tokens[username] = {
        token,
        date: Date.now()
      };

      res.json({ token });
      return;
    }

    //Wenn FHWS-API negative Rückmeldung gibt, wird dies inkl. Statuscode ans Frondend weitergegeben
    res.json({ allowed: false, status: response.status });
    return;
  }

  //Wird beim aktualsieren von jeglichen Seiten angefragt. Prüft ob Cookie mit token vorhanden ist,
  //welches zu einem der tokens im Objekt "tokens" passt
  if (req.url === '/verify') {
    const token = String(req.headers['authorization']).replace('Bearer ', '');
    const found = Object.values(tokens).find(item => item.token === token);
    const user = Object.keys(tokens).find(key => tokens[key] === found)
    const users = Object.keys(tokens)
   //  const tester = Object.values(tokens)[0].date

    if (found !== undefined) {
      res.json({ allowed: true, user: user });
      return;
    }
    res.json({ allowed: false });
    return;
  }
}
