
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


jest.mock('../server/models/scoreboard', () => {
    return jest.fn().mockImplementation(() => {
        return {
            addScore: mockAddScore,
            isNextTurn: mockIsNextTurn
        };
    });
});
jest.mock('../server/models/pinsetter', () => {
    return jest.fn().mockImplementation(() => {
        return {
            calculatePoints: mockCalculatePoints
        };
    });
});

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Scoreboard.mockClear();
    PinSetter.mockClear();
});

const express = require('express');
const app = express();

const { apiRouter } = require('../server/routes');

// Middle ware for allowåing body json requests.
app.use(express.json({ extended: false }));

app.use('/api', apiRouter);

describe("Bowling Router", () => {
    it("returns mocked scoreboard", async () => {
        // Gets "scoreboard" before its initiated 
        let response1 = await request(app).get("/api/bowling/scoreboard"); //uses the request function that calls on express app instance
        expect(response1.body).toEqual(null)
        // Initiates Scoreboard.
        await request(app).post("/api/bowling/start").send({players: ['Scott']});
        // Returns back new object.
        let response2 = await request(app).get("/api/bowling/scoreboard"); 
        expect(response2.body).toEqual({})
    });

    it("hits all the start services.", async () => {
        const { body } = await request(app).post("/api/bowling/start").send({players: ['Scott']}); 

        expect(PinSetter).toHaveBeenCalledTimes(1);
    });

    it("hits all the roll services.", async () => {
        const { body } = await request(app).post("/api/bowling/roll").send({pins: JSON.parse(JSON.stringify(SPAREONE))}); 

        expect(mockCalculatePoints).toHaveBeenCalledTimes(1);
        expect(mockAddScore).toHaveBeenCalledTimes(1);
        expect(mockIsNextTurn).toHaveBeenCalledTimes(1);
    });
});