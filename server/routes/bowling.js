const { Router } = require('express')
const PinSetter = require('../models/pinsetter');
const Scoreboard = require('../models/scoreboard');

const bowlingRouter = Router();
let pinsetter = null;
let scoreboard = null;

bowlingRouter.get('/', (req, res) => {
    //Checks if a game is in progress.
    return res.json({inProgress: scoreboard != null});
});

bowlingRouter.get('/scoreboard', (req, res) => {
    if(scoreboard == null) throw new Error("Start the game first to get your scoreboard.");

    return res.json(scoreboard.prettyScoreboard);
});

bowlingRouter.get('/pins', (req, res) => {
    if(scoreboard == null) throw new Error("Start the game first to get your pins.");

    return res.json(pinsetter.pins);
});

bowlingRouter.post('/start', (req, res) => {
    if(req.body.players == undefined || req.body.players.length < 1) throw new Error("Bowling is a game better played either by yourself or with friends.")
    scoreboard = new Scoreboard(req.body.players);
    pinsetter = new PinSetter();
    return res.status(200).send('Let the game begin!');    
});

bowlingRouter.post('/roll', (req, res) => {
    if(scoreboard == null) throw new Error("Throwing balls before you're ready is a great way of breaking something....")
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