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
        // If a strike we always reset pins.
        if(wasStrike) resetPins = true;

        // If not frame 10
        if(this.frame < 10){
            // Check if it was the first turn and not a strike, if so just up the turn.
            if(this.turn < 1 && !wasStrike) this.turn++;
            else {
                resetPins = true
                this.turn = 0
                // if incrementing the current player is going out of index range we know that its a new frame. 
                if(this.players.length - 1 > this.currentPlayer) {
                    this.currentPlayer++;
                }
                else {
                    this.frame++;
                    this.currentPlayer = 0;
                }
            };
        }
        // if frame 10
        else {
            // Check if it was the first turn and not a strike, if so just up the turn.
            if(this.turn < 1) this.turn++;
            // Frame 10 can have a bonus turn, so if the current score is greater or equal to 10 then keep going.
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

        // If not the first frame, look for bonuses.
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

    get prettyScoreboard() {
        let prettyPlayers = [];

        // Loop through the players and make the scoreboard pretty.
        this.players.forEach(player => {
            let prettyFrames = [];
            let currentScore = 0;
            // Loop through each frame and set the values to the frame object.
            for(let frame in player.score){
                let prettyFrame = {
                    frame: String(frame),
                    firstTurn: "",
                    secondTurn: "",
                    thirdTurn: "",
                    currentScore: ""
                }

                // For every frame first turn set the value to its pretty format, only strikes have special values in first frame.
                // We set these values here because display wise, you always can show the true value of the first turn.
                if (player.score[frame].length > 0) {
                    if (player.score[frame][0] == 10) prettyFrame.firstTurn = "X";
                    else prettyFrame.firstTurn = String(player.score[frame][0]);
                }
                // After turn 1 now we start getting some logic.
                if (player.score[frame].length > 1) {
                    // If its a spare, set the second turn display value to '/'.
                    if (player.score[frame][0] + player.score[frame][1] == 10) {
                        prettyFrame.secondTurn = "/";
                        // If 3 values in the frame we know bonuses have been applied and we can tally up the current score.
                        if (player.score[frame].length == 3) {
                            // If its the 10th frame we should check to see if the last turn was a strike, if so display it.
                            if(prettyFrames.length + 1 == 10) {
                                if(player.score[frame][2] !== 10) prettyFrame.thirdTurn = String(player.score[frame][2])
                                else prettyFrame.thirdTurn = "X"
                            }
                            prettyFrame.currentScore = currentScore + player.score[frame].reduce((partial_sum, a) => partial_sum + a, 0);
                            currentScore += player.score[frame].reduce((partial_sum, a) => partial_sum + a, 0);
                        }
                    }
                    // If its less than 10, we know the first two rolls were nothing special and no more bonuses should be shown.
                    else if (player.score[frame][0] + player.score[frame][1] < 10) {
                        prettyFrame.secondTurn = String(player.score[frame][1]);
                        prettyFrame.currentScore = currentScore + (player.score[frame][0] + player.score[frame][1]);
                        currentScore += player.score[frame][0] + player.score[frame][1];
                    }
                    // Only other option is above 10 with a strike in the mix. Calculate that as well as all the special elements that could show up in the 10th frame.
                    else {
                        if(prettyFrames.length + 1 == 10) {
                            if(player.score[frame][1] + player.score[frame][2] == 10) prettyFrame.thirdTurn = "/";
                            if(player.score[frame][1] == 10) prettyFrame.secondTurn = "X";
                            if(player.score[frame][2] == 10) prettyFrame.thirdTurn = "X"
                            else if(player.score[frame][1] + player.score[frame][2] == 10) {
                                prettyFrame.secondTurn = String(player.score[frame][1])
                                prettyFrame.thirdTurn = "/";
                            }
                            else prettyFrame.thirdTurn = String(player.score[frame][2])
                        }
                        prettyFrame.currentScore = currentScore + player.score[frame].reduce((partial_sum, a) => partial_sum + a, 0);
                        currentScore += player.score[frame].reduce((partial_sum, a) => partial_sum + a, 0);
                    }
                }
                prettyFrames.push(prettyFrame);
            }

            let playerFrame = {
                name: player.name,
                frames: prettyFrames
            }
            prettyPlayers.push(playerFrame);
        });

        let prettyScoreboard = {
            frame: this.frame,
            turn: this.turn,
            currentPlayer: this.currentPlayer,
            players: prettyPlayers
        }

        return prettyScoreboard;
    }

    _getCurrentPlayer() {
        return this.players[this.currentPlayer]
    }
}

module.exports = Scoreboard;