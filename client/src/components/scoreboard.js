import React from 'react';
import axios from 'axios';

import Frame from './frame';

class Scoreboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scoreboard: null,
            pins: {},
            players: []
        }
    }
    config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/bowling/', this.config)
            .then(async resp => {
                if(resp.data.inProgress) {
                    let resp1 = await axios.get('http://localhost:8000/api/bowling/scoreboard', this.config);
                    let resp2 = await axios.get('http://localhost:8000/api/bowling/pins', this.config);
                    let newState = {...this.state};
                    newState.scoreboard = resp1.data;
                    newState.pins = resp2.data;
                    newState.players = resp1.data.players.map(player => player.name);
                    this.setState(newState);
                }
            })
    }

    startGame = async _ => {
        let body = {players: this.state.players}
        await axios.post('http://localhost:8000/api/bowling/start', body, this.config)
        this.getScoreboard();
    }

    getScoreboard = async _ => {
        let res1 = await axios.get('http://localhost:8000/api/bowling/scoreboard', this.config);
        let res2 = await axios.get('http://localhost:8000/api/bowling/pins', this.config);
        let newState = {...this.state};
        newState.scoreboard = res1.data;
        newState.pins = res2.data;
        this.setState(newState);
    }

    roll = async _ => {
        let resp = await axios.get('http://localhost:8000/api/bowling/pins', this.config);

        let availablePins = resp.data;
        let knockedPins = {};

        for(let pin in availablePins) {
            if(availablePins[pin]) knockedPins[pin] = Math.random() < 0.5
            else knockedPins[pin] = availablePins[pin]
        }

        await axios.post('http://localhost:8000/api/bowling/roll', {pins: knockedPins}, this.config)
        this.getScoreboard();
    }

    addPlayer = e => {
        e.preventDefault();
        let newState = {...this.state};
        newState.players.push(e.target[0].value)
        this.setState(newState);
        e.target[0].value = "";
    }

    newGame = _ => {
        this.setState({
            scoreboard: null,
            pins: {},
            players: []
        })
    }

    render() {
        return <div className="Console">
        {
            this.state.scoreboard == null ? 
                <div>
                <div className="Players">
                    <div className="CurrentPlayers">Current Players: {this.state.players.map(player => <div key={`add${player}`}>{player}</div>)}</div>
                    <form onSubmit={this.addPlayer} >
                        <div className="PlayerInput">
                            <input type="text" name="player" />
                            <input type="submit" value="Add Player"/>
                        </div>
                    </form>
                </div>

                <button onClick={this.startGame}>Start Game</button>
                </div> 
                : 
                <div>
                    {this.state.scoreboard.players.map(player => <Frame key={player.name} player={player} currentPlayer={this.state.scoreboard.currentPlayer}/>)}
                    <div className="ScoreboardSettings">
                        <div className="CurrentFrame">Frame: {this.state.scoreboard.frame} Turn: {this.state.scoreboard.turn}</div>
                        {this.state.scoreboard.frame <= 10 ? <button onClick={this.roll}>Roll</button> : <button onClick={this.startGame}>Reset</button>}
                        <button onClick={this.newGame}>New Game</button>
                    </div>
                    <div className="Pins"><div className="Pin">Current Pins:</div> 
                        {Object.keys(this.state.pins).map(
                            key => this.state.pins[key] ? <div className="Pin" key={`pin${key}`}>Pin: {key}</div> : null
                        )}
                    </div>
                </div>
        }
    </div>
    }
}

export default Scoreboard;