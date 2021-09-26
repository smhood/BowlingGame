//ENUM value for setting pins back to original state.
const DEFAULT_PINS = {
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

//EMUM value for setting scoreboard back to origional state.
const DEFAULT_SCOREBOARD = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: []
}

class Bowling {
    _pins = {};

    _frame = 1;
    _turn = 0;
    _player = null;
    _num_players = null;

    _scoreboard = {}

    start(players) {
        //Reset Scoreboard if game was in progress.
        this._scoreboard = {};
        //Assign default scoreboard for each player.
        players.forEach(player => this.scoreboard[player] = JSON.parse(JSON.stringify(DEFAULT_SCOREBOARD)))
        //Reset Pins.
        this._pins = Object.assign({}, DEFAULT_PINS);

        //Reset private variables.
        this._frame = 1;
        this._turn = 0;
        this._player = 0;
        this._num_players = Object.keys(this.scoreboard).length;
    }

    roll(pins) {
        // Check to see if someone is trying to keep playing after all frames are finished. 
        if(this._frame > 10) throw new Error("This isn't baseball..... No extra frames!")

        // Handle the scoring logic.
        let results = this._handleScoring(pins);

        // Handle transition of turns.
        if(this._frame < 10) this._defaultFrame(results.isStrike);
        else if(this._frame == 10) this._frameTen(results.isStrike);
    }

    get scoreboard() {
        return this._scoreboard;
    }

    _handleScoring(pins) {
        let currentFrame = this._getCurrentFrame();
        
        // Set return values which will help ui determine what happened.
        let isStrike = false;
        let isSpare = false;
        let isSplit = false;
        let isGutter = false;

        // Calculate the score based upon what pins were knocked.
        let score = this._calculateScore(pins)

        // Add current score to current frame.
        currentFrame.push(score);

        // Checks to see if it was a gutter, spare, or strike.
        if(score == 0) isGutter = true;
        else if(score == 10 && this._turn == 0) isStrike = true;
        else if(score + currentFrame.reduce((partial_sum, a) => partial_sum + a, 0) == 10) isSpare = true;

        // We get the two potential frames which could have bonus scores added to it.
        let lastFrame = this._getPastFrame(1);
        let twoFramesAgo = this._getPastFrame(2);

        // Any frames that don't have bonuses added will equal 10. If its a spare there will be two entries in the score, if a strike only one.
        if(lastFrame != undefined) {
            if(this._turn == 0) {
                // Check if last frame was a spare.
                if(lastFrame.reduce((partial_sum, a) => partial_sum + a, 0) == 10 && lastFrame.length == 2) lastFrame.push(score);

                // Check if two frames ago was a strike.
                if(twoFramesAgo != undefined && twoFramesAgo.reduce((partial_sum, a) => partial_sum + a, 0) == 10 && twoFramesAgo.length == 1) {
                    // Because the bonus has not been applied here, and its the furst turn of a frame, we can assume the last frame ended in a strike.
                    twoFramesAgo.push(lastFrame.reduce((partial_sum, a) => partial_sum + a, 0));
                    twoFramesAgo.push(score);
                }
            }
            else {
                // If second turn can assume that 
                if(lastFrame.reduce((partial_sum, a) => partial_sum + a, 0) == 10) {
                    // Check if last frame was a spare.
                    if(lastFrame.length == 2) lastFrame.push(score);
                    // Check if last frame was a strike.
                    else if(lastFrame.length == 1) {
                        currentFrame.forEach(x => {
                            lastFrame.push(x);
                        });
                    }
                }
            }
        }

        return {
            isStrike,
            isSpare,
            isSplit,
            isGutter
        }
    }

    _calculateScore(pins) {
        let score = 0;
        for(let i = 1; i <= 10; i++) {
            if(pins[i] != this._pins[i]){
                if(this._pins[i]) score++;
            }
        }

        this._pins = JSON.parse(JSON.stringify(pins))
        return score;
    }

    _frameTen(wasStrike){
        if(wasStrike) this._pins = JSON.parse(JSON.stringify(DEFAULT_PINS));
        if(this._turn < 1 ) {
            this._turn++;
        }
        else if(this._turn == 1) {
            this._turn++;
            this._pins = JSON.parse(JSON.stringify(DEFAULT_PINS));
        }
        else this._endTurn();
    }

    _defaultFrame(wasStrike){
        if(this._turn < 1 && !wasStrike) {
            this._turn++;
        }
        else this._endTurn();
    }

    _endTurn(){
        this._turn = 0;
        this._pins = JSON.parse(JSON.stringify(DEFAULT_PINS))
        if(this._num_players > this._player + 1) {
            this._player++;
        }
        else {
            this._player = 0;
            this._frame++;
        }
    }

    _getCurrentFrame() {
        return this._scoreboard[Object.keys(this._scoreboard)[this._player]][this._frame]
    }

    _getPastFrame(index) {
        if(this._frame - index >= 0)
            return this._scoreboard[Object.keys(this._scoreboard)[this._player]][this._frame - index];
        else return;
    }
}

module.exports = {
    Bowling,
    DEFAULT_SCOREBOARD,
    DEFAULT_PINS
};