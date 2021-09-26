
const request = require("supertest");
const {Bowling, DEFAULT_SCOREBOARD, DEFAULT_PINS} = require('../server/models/bowling');
const express = require('express');
const app = express();

const { apiRouter } = require('../server/routes');

// Middle ware for allowåing body json requests.
app.use(express.json({ extended: false }));

app.use('/api', apiRouter);

describe("testing-server-routes", () => {
    // it("GET /api/bowling/ - success", async () => {
    //     // Mocks getter of Bowling prototype. Because scoreboard can have getter or setter it must be specified.
    //     let mockObject = {
    //         "Scott": JSON.parse(JSON.stringify(DEFAULT_SCOREBOARD))
    //     }
    //     const spy = jest.spyOn(Bowling.prototype, 'scoreboard', 'get').mockReturnValueOnce(mockObject);
    //     const { body } = await request(app).get("/api/bowling/getScore"); //uses the request function that calls on express app instance

    //     expect(body).toEqual(mockObject);
    // });

    // it("GET /api/bowling/getScore - success", async () => {
    //     // Mocks getter of Bowling prototype. Because scoreboard can have getter or setter it must be specified.
    //     let mockObject = {
    //         "Scott": JSON.parse(JSON.stringify(DEFAULT_SCOREBOARD))
    //     }
    //     const spy = jest.spyOn(Bowling.prototype, 'scoreboard', 'get').mockReturnValueOnce(mockObject);
    //     const { body } = await request(app).get("/api/bowling/getScore"); //uses the request function that calls on express app instance

    //     expect(body).toEqual(mockObject);
    // });

    it("POST /api/bowling/start - success", async () => {
        // Mocks getter of Bowling prototype. Because scoreboard can have getter or setter it must be specified.
        const spy = jest.spyOn(Bowling.prototype, 'start');
        const { body } = await request(app).post("/api/bowling/start").send({players: ['Scott']}); //uses the request function that calls on express app instance

        expect(spy).toBeCalled();
    });

    it("POST /api/bowling/roll - success", async () => {
        // Mocks getter of Bowling prototype. Because scoreboard can have getter or setter it must be specified.
        const spy = jest.spyOn(Bowling.prototype, 'roll');
        const { body } = await request(app).post("/api/bowling/roll").send({pins: JSON.parse(JSON.stringify(DEFAULT_PINS))}); //uses the request function that calls on express app instance

        expect(spy).toBeCalled();
    });
});