const { Router } = require('express')
const PinSetter = require('../models/pinsetter');
const Scoreboard = require('../models/scoreboard');

const bowlingRouter = Router();
let pinsetter = null;
let scoreboard = null;

bowlingRouter.get('/scoreboard', (req, res) => res.json(scoreboard));

// bowlingRouter.get('/scores', (req, res) => res.json(bowling.scoreboard));

// bowlingRouter.get('/scores/:player', (req, res) => res.json(bowling.scoreboard));

bowlingRouter.post('/start', (req, res) => {
    scoreboard = new Scoreboard(req.body.players);
    pinsetter = new PinSetter();
    res.json(scoreboard);
});

bowlingRouter.post('/roll', (req, res) => {
    // Check to see if someone is trying to keep playing after all frames are finished. 
    if(scoreboard.frame > 10) throw new Error("This isn't baseball..... No extra frames!")

    // Handle the scoring logic.
    let score = pinsetter.calculatePoints(req.body.pins);
    let results = scoreboard.addScore(score);

    // Handle transition of turns.
    let reset = scoreboard.isNextTurn(results.isStrike);
    if(reset) pinsetter = new PinSetter();
    
    res.json(results)
});


module.exports = {
    bowlingRouter
}