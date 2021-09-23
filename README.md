# BowlingGame

## Task

Using your design, implement (in the programming language of your choosing) the
scoring / game state display service that would compute needed data that one typically
expects to see on the lane monitor during a game.

## Diagram

## Info Gathering
* [How bowling Alley Works](https://www.youtube.com/watch?v=amx6fp0s28c)
* [How Pinsetters Work](https://entertainment.howstuffworks.com/pinsetter.htm)

## Notes from Research
* Pinsetter uses camera / fingers which calculates how many pins were knocked over.
* Machine also can tell which pins were knocked over.
* The machines primary responsibilies is the following: Send which pins were knocked over.
* Display should get scorecard of the current game. 

## API Endpoints
#### startGame
**Input**
```
{ players: list(string) }
```
**Responsibilities**
Initial call to start a new bowling match. Also used to reset a current game.

**Response**
Response: 200


#### roll
**Input**
```
{pins: {
1: bool,
2: bool,
3: bool,
4: bool,
5: bool,
6: bool,
7: bool,
8: bool,
9: bool,
10: bool
}}
```
**Responsibilities:**

Call to simulate a roll / turn of a player. This will add to the expected players scorecard and move the game forward. This will also determine if there was any strike / split / spare / end of players frame.

**Returns:**

```
{
"isSplit": bool,
"isStrike": bool,
"isGutter": bool,
"endTurn": bool
}
```
