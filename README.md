# Task

Using your design, implement (in the programming language of your choosing) the
scoring / game state display service that would compute needed data that one typically
expects to see on the lane monitor during a game.

# Diagram

# Notes from Research
**Links:**
* [How bowling Alley Works](https://www.youtube.com/watch?v=amx6fp0s28c)
* [How Pinsetters Work](https://entertainment.howstuffworks.com/pinsetter.htm)

**Nnotes:**
* Pinsetter uses camera / fingers which calculates how many pins were knocked over.
* Machine also can tell which pins were knocked over.
* The machines primary responsibilies is the following: Send which pins were knocked over.
* Display should get scorecard of the current game. 

# API Endpoints
## startGame
**Input**
```
{ players: list(string) }
```
**Responsibilities**
Initial call to start a new bowling match. Also used to reset a current game.

**Response**
Response: 200


## roll
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

## getScoreCard

**Input**: Empty

**Responsibilities:**
Call to get the current score for the bowling game. This makes it so the client doesn't have to do too much work in regards to displaying the information to the user.

**Output:**

```
{
"Scores":{
"Player_1": {
"frames": [
[5, 5],
[10],
[5, 1]
],
"total_score": 10
},
"Player_2": {
"frames": [
[5, 5],
[10],
[5, 1]
],
"total_score": 10
}
}
}
```
