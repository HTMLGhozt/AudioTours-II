const mongoose = require('mongoose');
const app = require('./server.js');

const port = 3000;
mongoose.promise = Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
app.listen(port, () => console.info(`Server running on port: ${port}.`));
