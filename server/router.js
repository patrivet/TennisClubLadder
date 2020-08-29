const router = require('express').Router();
const controller = require('./controller/clubLadders.controller');
const config = require('./config');

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

// Server details
router.get('/serverInfo', (_, res) => { res.json({env: config.NODE_ENV}) })

module.exports = router;