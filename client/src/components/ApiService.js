// Express dev(local) or prod server.
const ENVIRONMENT = process.env.NODE_ENV;

const BASE_URL = (ENVIRONMENT === 'production')
  ? process.env.REACT_APP_SERVER_URL_PROD
  : process.env.REACT_APP_SERVER_URL|| 'http://localhost:3001';
console.info(`INFO: ApiService using base URL =${BASE_URL}`);

const fetchRequest = (url, options = {}) => {
  console.info(`INFO: ApiService -fetchRequest to url =${BASE_URL}/${url}`);

  return fetch(`${BASE_URL}/${url}`, options)
    .then(res => res.status < 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch(error => {
      console.log(`${error} while fetching /${url}`);
    })
}

// Generate a headers object. Assumes using JSON for response and request.
const genHeaders = (restMethod, payload) => {
  const headers = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: `${restMethod}`,
    body: JSON.stringify(payload)
  };
  return headers
}

export default {
  // GET ladders
  getLadders() {
    return fetchRequest('ladders')
  },

  // GET players
  getPlayers() {
    return fetchRequest('players')
  },

  // GET challenges
  getChallenges() {
    return fetchRequest('challenges')
  },

  // POST challenge : to be used to update any change to challenge:-
  postChallenge(newChallenge) {
    return fetchRequest('challenge', genHeaders('POST', newChallenge))
  },

  postPlayer(newPlayer) {
    return fetchRequest('player', genHeaders('POST', newPlayer))
  },

  putPlayer(updatedPlayer) {
    return fetchRequest(`player/${updatedPlayer._id}`, genHeaders('PUT', updatedPlayer))
  },

  putChallenge(updatedChallenge) {
    return fetchRequest('challenge', genHeaders('PUT', updatedChallenge))
  },

  JWTLogin (email, password) {
    return fetchRequest('login', genHeaders('POST', {email, password}))
  }
}