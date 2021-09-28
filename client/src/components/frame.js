import React from 'react';

const Frame = ({player, myTurn}) => {
    return (
    <div className={"Player " + (myTurn ? "MyTurn" : "")} >
        <div className="PlayerName">{player.name}</div>
        <div className="Frames">
            {player.frames.map(frame => {
                return (
                    <div className="Frame" key={`${player.name}frame${frame.frame}`}>
                        <div className="FrameNumber">{frame.frame}</div>
                        <div className="FrameScore">
                            <div className="FrameTurns">
                                <div className="FirstTurn">{frame.firstTurn}</div>
                                <div className="SecondTurn">{frame.secondTurn}</div>
                                {frame.frame === "10" ? <div className="ThirdTurn">{frame.thirdTurn}</div> : undefined}
                            </div>
                            <div className="FrameTotalScore">{frame.currentScore}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>)
}

export default Frame;