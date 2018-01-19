const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRouter = require('./api/common/apiRoutes.js');

const server = express();
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET, PATCH, POST, DELETE', // HEAD, PUT,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// server.use((req, res, next) => {
//   console.log(req.body);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//   );
//   next();
// });

server.use(cors(corsOptions));

server.use('/api', apiRouter);

module.exports = server;
