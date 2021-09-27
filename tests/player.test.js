const Player = require('../server/models/player');

describe("Player Class", () => {
    it("gets frame", () => {
        let player = new Player("Test");

        player.addScore(1, 5);
        expect(player.getFrame(1)).toEqual([5])
    });

    it("errors when out of frame", () => {
        let player = new Player("Test");
        
        expect(() => player.getFrame(-1)).toThrow("There is no frame -1");
    });
});