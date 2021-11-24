const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes')
const db = require('./database');
const path = require('path');

db.authenticate().then(() => {
  console.log('Database connected...');
}).catch(err => {
  console.log('Error: ' + err);
})

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(cors("*"));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/home.html'));
});

app.use('/', routes);


const PORT = process.env.PORT || 5000;
db.sync().then(() => {
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));
