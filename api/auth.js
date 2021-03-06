const fetch = require('isomorphic-fetch');

const tokens = {}; //Objekt, das eingeloggte User in Form von tokens speichert

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  const { type } = req.query;

  //Wird beim Login ausgeführt. Codiert übergebene credentials und übergibt diese an FHWS-API
  if (type === 'issue-token') {
    const credentials = String(req.headers['authorization']).replace('Basic ', '');
    const optionName = String(req.headers['name']);
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
        date: Date.now(),
        optionName
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
  if (type === 'verify') {
    const token = String(req.headers['authorization']).replace('Bearer ', '');
    const found = Object.values(tokens).find(item => item.token === token);
    const user = Object.keys(tokens).find(key => tokens[key] === found)
    console.log(token + 'ABGEFRAGT!')
    if (found !== undefined) {
      res.json({ allowed: true, user: user });
      return;
    }
    res.json({ allowed: false });
    return;
  }

  //Wird zur Aktualisierung der Liste der online User angefragt
  if (type === 'list-users') {
    const users = Object.values(tokens).map((user, index) => {
      delete user.token;
      user.username = Object.keys(tokens)[index];

      return user;
    });

    res.json(users);
    return;
  }

  //Wird angefragt, wenn User sich ausloggt
  if (type === 'delete-token') {
    const { token } = req.cookies;

    if (!token) {
      res.json({ allowed: false });
      return;
    }

    const username = Object.keys(tokens).find(username => {
      const user = tokens[username];
      return user.token === token;
    });

    if (username) {
      delete tokens[username];
    }

    res.json({ deleted: true });
    return;
  }

  res.send("ok")
}
