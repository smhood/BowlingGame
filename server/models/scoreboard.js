const Player = require("./player");

class Scoreboard {
    frame = 1;
    turn = 0;

    constructor(players) {
        this.players = players.map(player => new Player(player));
        this.currentPlayer = 0;
    }

    isNextTurn(wasStrike) {
        let resetPins = false;
        if(wasStrike) resetPins = true;

        if(this.frame < 10){
            if(this.turn < 1 && !wasStrike) this.turn++;
            else {
                resetPins = true
                this.turn = 0
                if(this.players.length - 1 > this.currentPlayer) {
                    this.currentPlayer++;
                }
                else {
                    this.frame++;
                    this.currentPlayer = 0;
                }
            };
        }
        else {
            if(this.turn < 1) this.turn++;
            else if(this.turn == 1 && this._getCurrentPlayer().getFrame(this.frame).reduce((partial_sum, a) => partial_sum + a, 0) >= 10) {
                this.turn++;
                resetPins = true;
            }
            else {
                resetPins = true
                this.turn = 0
                if(this.players.length - 1 > this.currentPlayer) {
                    this.currentPlayer++;
                }
                else {
                    this.frame++;
                    this.currentPlayer = 0;
                }
            };
        }

        return resetPins;
    }

    addScore(score) {
        let currentFrame = this._getCurrentPlayer().getFrame(this.frame);
        
        // Set return values which will help ui determine what happened.
        let isStrike = false;
        let isSpare = false;
        let isGutter = false;

        // Add current score to current frame.
        this._getCurrentPlayer().addScore(this.frame, score);

        // Checks to see if it was a gutter, spare, or strike.
        if(score == 0) isGutter = true;
        else if(score == 10) isStrike = true;
        else if(currentFrame.length == 2 && currentFrame.reduce((partial_sum, a) => partial_sum + a, 0) == 10) isSpare = true;

        // We get the two potential frames which could have bonus scores added to it.

        // Any frames that don't have bonuses added will equal 10. If its a spare there will be two entries in the score, if a strike only one.
        if(this.frame > 1) {
            let lastFrame = this._getCurrentPlayer().getFrame(this.frame - 1);;

            if(this.turn == 0) {
                // Check if last frame was a spare.
                if(lastFrame.reduce((partial_sum, a) => partial_sum + a, 0) == 10 && lastFrame.length == 2) lastFrame.push(score);

                // Check if two frames ago was a strike.
                if(this.frame > 2) {
                    let twoFramesAgo = this._getCurrentPlayer().getFrame(this.frame - 2);

                    if(twoFramesAgo.reduce((partial_sum, a) => partial_sum + a, 0) == 10 && twoFramesAgo.length == 1) {
                        // Because the bonus has not been applied here, and its the furst turn of a frame, we can assume the last frame ended in a strike.
                        this._getCurrentPlayer().addScore(this.frame - 2, lastFrame.reduce((partial_sum, a) => partial_sum + a, 0));
                        this._getCurrentPlayer().addScore(this.frame - 2, score);
                    }
                }
            }
            else {
                // If second turn can assume that 
                if(lastFrame.reduce((partial_sum, a) => partial_sum + a, 0) == 10) {
                    // Check if last frame was a spare.
                    if(lastFrame.length == 2) this._getCurrentPlayer().addScore(this.frame - 1, score);
                    // Check if last frame was a strike.
                    else if(lastFrame.length == 1) {
                        currentFrame.forEach(x => {
                            this._getCurrentPlayer().addScore(this.frame - 1, x)
                        });
                    }
                }
            }
        }

        return {
            isStrike,
            isSpare,
            isGutter
        }
    }

    _getCurrentPlayer() {
        return this.players[this.currentPlayer]
    }
}

module.exports = Scoreboard;