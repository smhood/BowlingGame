const PinSetter = require('./pinsetter');
const Scoreboard = require('./scoreboard');

class Bowling {
    start(players) {
        this._scoreboard = new Scoreboard(players);
        this._pins = new PinSetter();
    }

    roll(pins) {
        // Check to see if someone is trying to keep playing after all frames are finished. 
        if(this.scoreboard.frame > 10) throw new Error("This isn't baseball..... No extra frames!")

        // Handle the scoring logic.
        let score = this._pins.calculatePoints(pins);

        let results = this.scoreboard.addScore(score);

        // Handle transition of turns.
        if(this._scoreboard.resetPins(results.isStrike)) this._pins = new PinSetter();
        this._scoreboard.next();

        return results;
    }

    get scoreboard() {
        return this._scoreboard;
    }
}

module.exports = Bowling;