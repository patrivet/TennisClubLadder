// Express local server.
const baseUrl = 'http://localhost:3001';

export default {
  // GET ladders
  getLadders() {
    return fetch(`${baseUrl}/ladders`)
      .then(res => res.status <= 400 ? res : Promise.reject(res))
      .then(res => res.json())
      .catch((error) => {
        console.error(`ERROR: apiService : getLadder() ${error} performing GET to URL:${baseUrl}`);
      });
  },

  // GET players
  getPlayers() {
    return fetch(`${baseUrl}/players`)
      .then(res => res.status <= 400 ? res : Promise.reject(res))
      .then(res => res.json())
      .catch((error) => {
        console.error(`ERROR: apiService : getPlayers() ${error} performing GET to URL:${baseUrl}`);
      });
  },

  // GET challenges
  getChallenges() {
    return fetch(`${baseUrl}/challenges`)
      .then(res => res.status <= 400 ? res : Promise.reject(res))
      .then(res => res.json())
      .catch((error) => {
        console.error(`ERROR: apiService : getChallenges() ${error} performing GET to URL:${baseUrl}`);
      });
  }
}
