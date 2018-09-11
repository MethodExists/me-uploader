/*
 *
 * Minimal server to handle direct xhrRequests from service.js
 *
 */
const express = require('express');

const app = express();

// Add headers
app.use((req, res, next) => {
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.put('/uploadedFiles/:file', (req, res) => {
  const file = req.file;
  res.jsonp({ ok: file });
});

app.put('/customUrl', (req, res) => {
  const file = req.file;
  res.jsonp({ ok: file });
});

app.listen(3001, () => {
  console.info('Backend server listening on port 3001');
});


/*
 *
 * Run app server
 *
 */
console.info('Staring app dev server at localhost:3000');
require('child_process').exec('nwb serve-react-demo', (error, stdout, stderr) => {
  console.info(`stdout: ${stdout}`);
  console.info(`stderr: ${stderr}`);
  if (error !== null) {
    console.info(`exec error: ${error}`);
  }
});
