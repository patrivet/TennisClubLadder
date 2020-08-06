const bcrypt = require('bcrypt');

/* Hash a given value & return */
async function hashValue (val) {
  const hash = await bcrypt.hash(val, 10);
  return hash;
}


module.exports = {
  hashValue,
}