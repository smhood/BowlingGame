
const request = require("supertest");
const Scoreboard = require('../server/models/scoreboard');
const PinSetter = require('../server/models/pinsetter');
const { SPAREONE } = require('./testData');

const mockCalculatePoints = jest.fn();
const mockAddScore = jest.fn().mockImplementation(() => {
    return {
        isStrike: false,
        isSpare: false,
        isGutter: false
    };
});
const mockIsNextTurn = jest.fn();
const mockGetPrettyScoreboard = jest.fn();

const express = require('express');
const app = express();

const { apiRouter } = require('../server/routes');

// Middle ware for allowåing body json requests.
app.use(express.json({ extended: false }));

app.use('/api', apiRouter);

describe("Bowling Router", () => {
    it("returns mocked scoreboard", async () => {
        const spyOn = jest.spyOn(Scoreboard.prototype, 'prettyScoreboard', 'get').mockImplementation(() => [{name: "Scott"}]);        ;

        // Initiates Scoreboard.
        await request(app).post("/api/bowling/start").send({players: ['Scott']});
        // Returns back new object.
        let response = await request(app).get("/api/bowling/scoreboard");
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual([{name: "Scott"}]);
    });

    it("returns mocked scoreboard", async () => {
        let mockPins = {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true
        }
        const spyOn = jest.spyOn(PinSetter.prototype, 'pins', 'get').mockImplementation(() => mockPins);

        // Initiates Scoreboard.
        await request(app).post("/api/bowling/start").send({players: ['Scott']});
        // Returns back new object.
        let response = await request(app).get("/api/bowling/pins");
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual(mockPins);
    });

    it("hits all the roll services.", async () => {
        await request(app).post("/api/bowling/start").send({players: ['Scott']});

        const mockCalculatePoints = jest.spyOn(PinSetter.prototype, 'calculatePoints');
        const mockAddScore = jest.spyOn(Scoreboard.prototype, 'addScore');
        const mockIsNextTurn = jest.spyOn(Scoreboard.prototype, 'isNextTurn');

        const { body } = await request(app).post("/api/bowling/roll").send({pins: {...SPAREONE}}); 

        expect(mockCalculatePoints).toHaveBeenCalledTimes(1);
        expect(mockAddScore).toHaveBeenCalledTimes(1);
        expect(mockIsNextTurn).toHaveBeenCalledTimes(1);
    });
});