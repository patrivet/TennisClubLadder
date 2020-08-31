
const config = require('./config');
const express = require('express');
const server = express();
const cors = require('cors');
const router = require('./router.js');
const morgan = require('morgan')
const path = require('path');
const PORT = process.env.PORT || 3001;

server.use(morgan('tiny'));
server.use(cors());
server.use(express.json());

// Route /api calls via the router.
server.use('/api', router);

// Where the environment is set to production -serve client files from pre-built client dir
if (config.NODE_ENV.toLowerCase() == 'production') {
  server.use(express.static(path.resolve(__dirname, '../client/build')));

  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
};

server.listen(PORT, () => {
  console.log(`INFO: SERVER =${config.NODE_ENV}; listening on PORT:${PORT}`)
});