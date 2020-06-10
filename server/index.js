const express = require('express');
const server = express();
const cors = require('cors');
const PORT = 3001;
const router = require('./router.js');

// Add morgan here
server.use(cors());
server.use(express.json());
server.use(router);

server.listen(PORT, () => {
  console.log(`INFO: Express: listening on PORT:${PORT}`)
});