const { Router, response } = require('express')
const { Bowling } = require('../models/bowling');

const bowlingRouter = Router();
const bowling = new Bowling();

bowlingRouter.get('/scoreboard', (req, res) => res.json(bowling.scoreboard));

bowlingRouter.get('/scores', (req, res) => res.json(bowling.scoreboard));

bowlingRouter.get('/scores/:player', (req, res) => res.json(bowling.scoreboard));

bowlingRouter.post('/start', (req, res) => {
    bowling.start(req.body.players);
    res.json(bowling.scoreboard);
});

bowlingRouter.post('/roll', (req, res) => {
    let response = bowling.roll(req.body.pins);
    res.json(response)
});


module.exports = {
    bowlingRouter,
}