const { ladderModel, playerModel, challengeModel } = require('./../model/clubLadders.model');
const config = require('./../config');
const { hashValue } = require('./../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = config.SECRET_KEY;

async function login (req, res) {
  const { email, password } = req.body;
  let loginError = 'Username or password is incorrect';
  try {
    const user = await playerModel.findOne({email: email.toLowerCase()});
    if (!user) {
      loginError = 'No user found with email= ' + email;
      throw new Error()
    };

    // Compare password to encrypted value in DB
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error();

    // Generate token and return it.
    if (!SECRET_KEY.length) {
      loginError = 'Secret key is missing in .env file.';
      throw new Error()
    };
    console.log('INFO: Login successful for user =' + user.email);
    const token = jwt.sign( {_id: user._id }, SECRET_KEY);
    res.status(200).json({ token });

  } catch (error) {
    res.status(401).send({ error: '401', message: loginError });
  }
}

async function getLadders (req, res) {
  try {
    const ladders = await ladderModel.find({});
    res.status(201);
    res.json(ladders);
  } catch (error) {
    console.log('ERROR: Error running /GET ladders =', error);
    res.sendStatus(500);
  }
};

async function postLadder (req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      throw new Error('one or more parameters for POST /ladder were missing');
    }
    const ladder = await ladderModel.create(req.body);
    res.status(200);
    res.json(ladder);
  } catch (error) {
    console.log('ERROR: running /POST ladder =', error);
    res.status(400);
    res.json({serverError: `ERROR: Express Server:: ${error}`});
  }
}

async function getPlayers (_, res) {
  try {
    const players = await playerModel.find({});
    res.status(201);
    res.json(players);
  } catch (error) {
    console.log('ERROR: Error running /GET players =', error);
    res.sendStatus(500);
  }
};

async function postPlayer (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      throw new Error('one or more parameters for POST /player were missing');
    }
    // If a Player with this email already exists - return here - else continue
    if (await playerModel.findOne({email : email})) {
      return res.status(409).json({error: 'This User already exists.'});
    }

    // Encrypt password.
    const passwordHash = await hashValue(password);

    const player = await playerModel.create({...req.body, password : passwordHash});
    // Don't return the player object here.
    res.sendStatus(200);
  } catch (error) {
    console.log('ERROR: running /POST player =', error);
    res.status(400);
    res.json({serverError: `ERROR: Express Server:: ${error}`});
  }
}

async function putPlayer (req, res) {
  try {
    const _id = req.params.id;
    let updatedPlayer = req.body;

    // Encrypt password if body contains one.
    // FIX bug - where password no longer worked following this call..Changed to remove the password from object if found
    if (req.body.password) {
      delete updatedPlayer.password; // Note: will this remove the value from mongo document also?
    }

    let player = await playerModel.findOneAndUpdate({_id}, updatedPlayer, {
      new: true
    });

    if (!player) {
      //   No player found
      throw new Error(`no player was found with id=${_id}`);
    }

    res.status(200);
    res.json(player);
  } catch (error) {
    console.log('ERROR: Error running PUT /player =', error);
    res.status(400);
    res.json({serverError: `ERROR::: ${error}`});
  }
}

async function getChallenges (_, res) {
  try {
    const challenges = await challengeModel.find({});
    res.status(201);
    res.json(challenges);
  } catch (error) {
    console.log('ERROR: Error running /GET challenges =', error);
    res.sendStatus(500);
  }
};

async function postChallenge (req, res) {
  try {
    // Body will contain the player Ids.
    const challenge = await challengeModel.create(req.body);
    res.status(200);
    res.json(challenge);
  } catch (error) {
    console.log('ERROR: Error running DB /POST challenge  =', error);
    res.status(400);
    res.json({serverError: `ERROR: Express Server:: ${error}`});
  }
}

// Update (PUT) challenge- support any 1..n of the following fields being passed
// status, winnerId etc
async function putChallenge (req, res) {
  try {
    const { _id } = req.body;
    if (!_id) {
      throw new Error('no challenge id was provided in PUT call.');
    }

    let challenge = await challengeModel.findOneAndUpdate({_id}, req.body, {
      new: true
    });

    if (!challenge) {
      //   No challenge found
      throw new Error(`no challenge was found with id=${_id}`);
    }

    res.status(200);
    res.json(challenge);
  } catch (error) {
    console.log('ERROR: Error running PUT /challenge =', error);
    res.status(400);
    res.json({serverError: `ERROR::: ${error}`});
  }
}


module.exports = {
  getLadders,
  postLadder,
  getChallenges,
  postChallenge,
  getPlayers,
  postPlayer,
  putChallenge,
  putPlayer,
  login,
}