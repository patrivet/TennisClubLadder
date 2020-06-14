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
  },

  // POST challenge : to be used to update any change to challenge:-
  // Status change for an Accept or Decline, or a result submission.
  postChallenge(newChallenge) {
    const headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newChallenge)
    }
    return fetch(`${baseUrl}/challenge`, headers)
      .then(res => res.status < 400 ? res : Promise.reject(res))
      .then(res => res.json())
      .catch((error) => {
        console.log(`ERROR: apiService(): postChallenge() performing POST to URL:${baseUrl}`);
        console.error(error)
      });
  },

  postPlayer(newPlayer) {
    const headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newPlayer)
    }
    return fetch(`${baseUrl}/player`, headers)
      .then(res => res.status < 400 ? res : Promise.reject(res))
      .then(res => res.json())
      .catch((error) => {
        console.log(`ERROR: apiService(): postPlayer() performing POST to URL:${baseUrl}`);
        console.error(error)
      });
  },

  putPlayer(updatedPlayer) {
    const headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(updatedPlayer)
    }
    return fetch(`${baseUrl}/player`, headers)
      .then(res => res.status < 400 ? res : Promise.reject(res))
      .then(res => res.json())
      .catch((error) => {
        console.log(`ERROR: apiService(): putPlayer() performing POST to URL:${baseUrl}`);
        console.error(error)
      });
  },

  putChallenge(updatedChallenge) {
    const headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(updatedChallenge)
    }
    return fetch(`${baseUrl}/challenge`, headers)
      .then(res => res.status < 400 ? res : Promise.reject(res))
      .then(res => res.json())
      .catch((error) => {
        console.log(`ERROR: apiService(): putChallenge() performing POST to URL:${baseUrl}`);
        console.error(error)
      });
  }

}
