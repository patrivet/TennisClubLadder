
const config = require('./config');
const express = require('express');
const server = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const router = require('./router.js');
const morgan = require('morgan')

// Where the environment is set to production -serve client files from pre-built client dir
// console.info(`INFO: Express: Environment =${config.NODE_ENV.toLowerCase()}`);
if (config.NODE_ENV.toLowerCase() == 'production') {
  server.use(express.static('./../client/build'))
};

server.use(morgan('combined'));
server.use(cors());
server.use(express.json());
server.use(router);

server.listen(PORT, () => {
  console.log(`INFO: Express: listening on PORT:${PORT}`)
});