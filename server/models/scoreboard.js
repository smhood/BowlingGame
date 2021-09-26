const Player = require("./player");

class Scoreboard {
    currentPlayer = null;

    frame = 1;
    turn = 0;

    constructor(players) {
        this.players = players.map(player => new Player(player));
        this.currentPlayer = this.players[0];
    }

    next(wasStrike) {
        if(this._turn < 1 && !wasStrike) {
            this._turn++;
        }
        else this._endTurn();
    }
}