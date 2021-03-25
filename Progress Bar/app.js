const express = require('express')
const app = express();
var path = require('path');
const port = 3000;



//pp.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/progress.js'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/demo-bars.js'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});