
const request = require("supertest");
const Scoreboard = require('../server/models/scoreboard');
const PinSetter = require('../server/models/pinsetter');
const {     
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

        let total = 0;
        for(let i = 1; i <= 10; i++) {
            total += response3.body.players[0].score[i].reduce((partial_sum, a) => partial_sum + a, 0);
        }

        expect(total).toBe(300);
    });

    it("calculates at the 10th frame a strike and spare.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        for(let i = 0; i < STRIKESPARE.length; i++) {
            let response2 = await request(app).post("/api/bowling/roll").send({pins: STRIKESPARE[i]}); 
        }

        let response3 = await request(app).get("/api/bowling/scoreboard");

        let total = 0;
        for(let i = 1; i <= 10; i++) {
            total += response3.body.players[0].score[i].reduce((partial_sum, a) => partial_sum + a, 0);
        }

        expect(total).toBe(285);
    });

    it("calculates at the 10th frame a spare and strike.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        for(let i = 0; i < SPARESTRIKE.length; i++) {
            let response2 = await request(app).post("/api/bowling/roll").send({pins: SPARESTRIKE[i]}); 
        }

        let response3 = await request(app).get("/api/bowling/scoreboard");

        let total = 0;
        for(let i = 1; i <= 10; i++) {
            total += response3.body.players[0].score[i].reduce((partial_sum, a) => partial_sum + a, 0);
        }

        expect(total).toBe(275);
    });

    it("calculates nothing but spares.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        for(let i = 0; i < SPAREGAME.length; i++) {
            let response2 = await request(app).post("/api/bowling/roll").send({pins: SPAREGAME[i]}); 
        }

        let response3 = await request(app).get("/api/bowling/scoreboard");

        let total = 0;
        for(let i = 1; i <= 10; i++) {
            total += response3.body.players[0].score[i].reduce((partial_sum, a) => partial_sum + a, 0);
        }

        expect(total).toBe(150);
    });

    it("calculates combination of everything.", async () => {
        let response1 = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        for(let i = 0; i < RANDOMONE.length; i++) {
            let response2 = await request(app).post("/api/bowling/roll").send({pins: RANDOMONE[i]}); 
        }

        let response3 = await request(app).get("/api/bowling/scoreboard");

        let total = 0;
        for(let i = 1; i <= 10; i++) {
            total += response3.body.players[0].score[i].reduce((partial_sum, a) => partial_sum + a, 0);
        }

        expect(total).toBe(75);
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

        let scottTotal = 0;
        let katTotal = 0;
        for(let i = 1; i <= 10; i++) {
            scottTotal += response4.body.players[0].score[i].reduce((partial_sum, a) => partial_sum + a, 0);
        }

        for(let i = 1; i <= 10; i++) {
            katTotal += response4.body.players[1].score[i].reduce((partial_sum, a) => partial_sum + a, 0);
        }

        expect(scottTotal).toBe(75);
        expect(katTotal).toBe(78);
    });
});