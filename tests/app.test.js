
const request = require("supertest");

const {     
    STRIKE,
    PERFECTGAME,
    SPAREGAME,
    SPARESTRIKE,
    STRIKESPARE,
    RANDOMONE,
    RANDOMTWO } = require('./testData');

const express = require('express');
const app = express();

const { apiRouter } = require('../server/routes');

// Middle ware for allowåing body json requests.
app.use(express.json({ extended: false }));

app.use('/api', apiRouter);

describe("Bowling App", () => {
    it("calculates a perfect gamme.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        for(let i = 0; i < PERFECTGAME.length; i++) {
            let response2 = await request(app).post("/api/bowling/roll").send({pins: PERFECTGAME[i]});
        }

        let response3 = await request(app).get("/api/bowling/scoreboard");

        expect(response3.body.players[0].frames[9].currentScore).toBe(300);
    });

    it("calculates at the 10th frame a strike and spare.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        for(let i = 0; i < STRIKESPARE.length; i++) {
            let response2 = await request(app).post("/api/bowling/roll").send({pins: STRIKESPARE[i]}); 
        }

        let response3 = await request(app).get("/api/bowling/scoreboard");

        expect(response3.body.players[0].frames[9].currentScore).toBe(285);
        expect(response3.body.players[0].frames[9].firstTurn).toBe('X');
        expect(response3.body.players[0].frames[9].secondTurn).toBe('5');
        expect(response3.body.players[0].frames[9].thirdTurn).toBe('/');
    });

    it("calculates at the 10th frame a spare and strike.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        for(let i = 0; i < SPARESTRIKE.length; i++) {
            let response2 = await request(app).post("/api/bowling/roll").send({pins: SPARESTRIKE[i]}); 
        }

        let response3 = await request(app).get("/api/bowling/scoreboard");
        expect(response3.body.players[0].frames[9].currentScore).toBe(275);
        expect(response3.body.players[0].frames[9].thirdTurn).toBe('X');
    });

    it("calculates nothing but spares.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        for(let i = 0; i < SPAREGAME.length; i++) {
            let response2 = await request(app).post("/api/bowling/roll").send({pins: SPAREGAME[i]}); 
        }

        let response3 = await request(app).get("/api/bowling/scoreboard");

        expect(response3.body.players[0].frames[9].currentScore).toBe(150);
        expect(response3.body.players[0].frames[9].thirdTurn).toBe('5');
    });

    it("calculates combination of everything.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        for(let i = 0; i < RANDOMONE.length; i++) {
            let response2 = await request(app).post("/api/bowling/roll").send({pins: RANDOMONE[i]}); 
        }

        let response3 = await request(app).get("/api/bowling/scoreboard");

        expect(response3.body.players[0].frames[9].currentScore).toBe(75);
    });

    it("calculates combination of everything for two players.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott', 'Katrina']}); 

        let alternate = [RANDOMONE, RANDOMTWO];
        for(let i = 0; i < 20; i = i + 2) {
            for(let j = 0; j < alternate.length; j++) {
                let turnOne = alternate[j][i];
                let turnTwo = alternate[j][i+1];
                let response2 = await request(app).post("/api/bowling/roll").send({pins: turnOne});
                let response3 = await request(app).post("/api/bowling/roll").send({pins: turnTwo}); 
            }
        }

        let response4 = await request(app).get("/api/bowling/scoreboard");

        expect(response4.body.players[0].frames[9].currentScore).toBe(75);
        expect(response4.body.players[1].frames[9].currentScore).toBe(78);
    });
});