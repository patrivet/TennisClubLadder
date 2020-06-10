const router = require('express').Router();
const controller = require('./controller/clubLadders.controller');

// Ladder endpoints
router.get('/ladders', controller.getLadders);
router.post('/ladder', controller.postLadder);


router.get('/players', controller.getPlayers);
router.post('/player', controller.postPlayer);
router.put('/player', controller.putPlayer);

router.get('/challenges', controller.getChallenges);
router.post('/challenge', controller.postChallenge);
router.put('/challenge', controller.putChallenge);


module.exports = router;