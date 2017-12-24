const mongoose = require('mongoose');
const app = require('./server.js');

const port = 3000;
mongoose.promise = Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
/* eslint no-console: ["error", { allow: ["info"] }] */
app.listen(port, () => console.info(`Server running on port: ${port}.`));
