const Scoreboard = require("../server/models/scoreboard");

describe("Scoreboard Class", () => {
    it("should cycle through turns, players, and frames.", () => {
        let scoreboard = new Scoreboard(["Scott", "Katrina"]);

        scoreboard.isNextTurn(false);
        expect(scoreboard.turn).toBe(1);
        scoreboard.isNextTurn(false);
        expect(scoreboard.turn).toBe(0);
        expect(scoreboard.currentPlayer).toBe(1);
        expect(scoreboard.frame).toBe(1);
        scoreboard.isNextTurn(true);
        expect(scoreboard.frame).toBe(2);
    })

    it("should add a strike", () => {
        let scoreboard = new Scoreboard(["Scott"]);
        scoreboard.addScore(10);
        
        expect(scoreboard.players[0].getFrame(1)[0]).toBe(10);
    });

    it("should make pretty scoreboard correctly", () => {
        let scoreboard = new Scoreboard(["Scott"]);
        scoreboard.frame = 11;
        scoreboard.players[0].score = {
            1: [10, 10, 10],
            2: [10, 10, 5],
            3: [10, 5, 5],
            4: [5, 5, 3],
            5: [3, 4],
            6: [0,0],
            7: [0,0],
            8: [0,0],
            9: [10, 10, 10],
            10: [10, 10, 10]
        }

        let prettyScoreboard = scoreboard.prettyScoreboard;
        expect(prettyScoreboard.players[0].frames[9].currentScore).toEqual(155);
    });
})