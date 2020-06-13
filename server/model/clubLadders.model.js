const db = require('../db');
const Schema = db.Schema;

// Challenge Model ==========================
var ChallengeSchema = new Schema({
  id: {
    type: String, required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  invitationStatus: {
    type: String,
    required: false,
    default: 'sent'
  },
  resultStatus: {
    type: String,
    required: false,
    default: 'n/a'
  },
  status: {   // this replaces, and merges, invitationStatus and resultStatus into one field.
  // Values move from: invited --> inviteAccepted / inviteDeclined / inviteExpired --> [ scheduled ]  --> complete --> challengeExpired.
    type: String,
    required: false,
    default: 'invited'
  },
  // Creator is a player ID (aka "challenger")
  creator: {
    type: String,
    required: false
  },
  // challenged is a player ID (the challenged player)
  challenged: {
    type: String,
    required: false
  },
  // Winner is a player ID
  winner: {
    type: String,
    required: false
  },
  loser: {
    type: String,
    required: false
  },
  commentary: {
    type: String,
    required: false
  },
  playedDate: {
    type: Date,
    required: false
  },
  playerIds: {
    type: [String], required: true
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  statusSummaryText: {
    type: String,
    required: false
  },
});
const challengeModel = db.model("Challenge", ChallengeSchema);

// Player Model ==========================
const PlayerSchema = new Schema({
  id: {
    type: String, required: true
  },
  firstName: {
    type: String, required: true
  },
  lastName: {
    type: String, required: true
  },
  email: {
    type: String, required: true
  },
  isAdmin: {
    type: Boolean, default: false
  },
  // FIX ME: this object array may not be used from the client. Remove (along with others) if not used.
  challenges: {
    type: [ChallengeSchema], required: false
  },
  challengeIds: {
    type: [String], required: false
  },
  position: { type: Number, required: false },
  numWins: { type: Number, required: false },
  // Note: can use shorthand->  numWins: Number,
  numLosses: { type: Number, required: false },
  imagePath: { type: String, required: false }
});
const playerModel = db.model('Player', PlayerSchema);

// Ladder Model ==========================
const LadderSchema = new Schema({
  name: {
    type: String, required: true
  },
  settings: {
    maxSets: {type: Number, default: 3},
    finalSetTiebreak: {type: Boolean, default: true},
  },
  players: {
    type: [PlayerSchema], required: false
  },
  playerIds: {
    type: [String], required: false
  }
});
const ladderModel = db.model('Ladder', LadderSchema);

module.exports = {
  ladderModel,
  playerModel,
  challengeModel
}