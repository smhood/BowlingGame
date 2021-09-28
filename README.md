# Task

Using your design, implement (in the programming language of your choosing) the
scoring / game state display service that would compute needed data that one typically
expects to see on the lane monitor during a game.

# Diagram

# Notes from Research
**Links:**
* [How bowling Alley Works](https://www.youtube.com/watch?v=amx6fp0s28c)
* [How Pinsetters Work](https://entertainment.howstuffworks.com/pinsetter.htm)
* [Calculate Score](https://www.bowlinggenius.com/)

**Notes:**
* Pinsetter uses camera / fingers which calculates how many pins were knocked over.
* Machine also can tell which pins were knocked over.
* The machines primary responsibilies is the following: Send which pins were knocked over.
* Display should get scorecard of the current game. 

# API Endpoints
## start
**Input**
```
{ players: list(string) }
```
**Responsibilities**
Initial call to start a new bowling match. Also used to reset a current game.

**Response**
```
{
    "frame": 11,
    "turn": 0,
    "players": [
        {
            "score": {
                "1": [],
                "2": [],
                "3": [],
                "4": [],
                "5": [],
                "6": [],
                "7": [],
                "8": [],
                "9": [],
                "10": []
            },
            "name": "Scott"
        }
    ],
    "currentPlayer": 0
}
```


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

Call to simulate a roll / turn of a player. This will add to the expected players scorecard and move the game forward. This will also determine if there was any strike / spare / or gutter ball.

**Returns:**

```
{
"isStrike": bool,
"isGutter": bool,
"isSpare": bool
}
```

## scoreboard

**Input**: Empty

**Responsibilities:**
Call to get the current score for the bowling game. This makes it so the client doesn't have to do too much work in regards to displaying the information to the user.

**Output:**

```
{
    "frame": 11,
    "turn": 0,
    "players": [
        {
            "score": {
                "1": [10,10,10],
                "2": [10,10,10],
                "3": [10,10,10],
                "4": [10,10,10],
                "5": [10,10,10],
                "6": [10,10,10],
                "7": [10,10,10],
                "8": [10,10,10],
                "9": [10,10,10],
                "10": [10,10,10]
            },
            "name": "Scott"
        }
    ],
    "currentPlayer": 0
}
```

# Front End
## Info

Used [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) to generate all the base React requirements and to speed up development process. Because this is an additive piece and because nothing special regarding react is really needed for this, its a perfect tool to utilize to get up and running and building a front end app.

## 

# Potential Addons 
* Determine if roll was a split.
* Get individual players score.
* Calculate total on server.