const router = require('express').Router();
const controller = require('./controller/clubLadders.controller');

// Ladder endpoints
router.get('/ladders/', controller.getLadders);
router.post('/ladder', controller.postLadder);

// Players and Challenges
router.get('/players', controller.getPlayers);
router.post('/player', controller.postPlayer);
router.put('/player/:id', controller.putPlayer);

router.get('/challenges', controller.getChallenges);
router.post('/challenge', controller.postChallenge);
router.put('/challenge', controller.putChallenge);

// Auth
router.post('/login', controller.login);
router.get('/checkAuth', controller.checkAuth);

module.exports = router;