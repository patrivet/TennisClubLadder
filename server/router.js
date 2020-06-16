const router = require('express').Router();
const controller = require('./controller/clubLadders.controller');

// Ladder endpoints
// This is needed for an email to accept an invited...not in MVP: router.get('/ladders/:acceptInvite', controller.getLadders);
router.get('/ladders/', controller.getLadders);
router.post('/ladder', controller.postLadder);

// Players and Challenges
router.get('/players', controller.getPlayers);
router.post('/player', controller.postPlayer);
router.put('/player', controller.putPlayer);

router.get('/challenges', controller.getChallenges);
router.post('/challenge', controller.postChallenge);
router.put('/challenge', controller.putChallenge);

// testing author
router.get('/checkAuth', controller.checkAuth);
// router.get('/login', controller.checkAuth);   LOGIN would be a GET or POST?

module.exports = router;