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
})