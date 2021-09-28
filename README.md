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
* For writting tests can manually utilize calculate score tool to double check logic. 

# NPM Commands
## npm run test
Runs the tests for the project. Currently there are only tests dedicated to the backend due to time constraints and wanting to primarily focus on the logic of the bowling service rather than the UI flow.

## npm run start
Starts the express service without nodemon. This will cause you to be able to run the service without having save changes restarting the instance.

## npm run server
Starts the server only with nodemon, allowing for development changes to be added as you save them.

## npm run client
Starts the front end only allowing you to code and test the frontend without needing the backend.

## npm run dev
Runs both the frontend and the backend in order to fully test the two toghether. 

# API Endpoints
## api/bowling/

**Responsibilities**
Initial call to start a new bowling match. Also used to reset a current game.

**Reasoning**
Wanted some form of call other than the scoreboard api and checking on the client if the scoreboard was initiated, seperated this out and made a quick easy call to see if anyone was bowling.

**Response**
```
{ inProgress: bool }
```

## api/bowling/start
**Input**
```
{ players: list(string) }
```
**Responsibilities**
Initial call to start a new bowling match. Also used to reset a current game.

**Reasoning**
The idea of having to specifically start the game is to make sure that the correct amount of players have been added. Without this call we would assume that there was only one player, and bowling isn't that much fun alone. 

**Response**
```
Status(200) Let the game begin!
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

**Reasoning**
In the real world, a picture is snapped that tells the pinsetter which pins were knocked down, so logically speaking we shouldn't be taking in a simple score, but what would be the "picture" of pins which were knocked. This also keeps us from having to write in logic such that score is greater than the amount of pins, we simply ignore any pins they say they knocked down because our system knows better than to let them cheat.

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

**Reasoning**
While building they UI realized that there was a lot of logic that would have been tied into sending back the flat scoreboard. It was better to pretty it up here and have the logic and knowledge of how bonuses work hidden from the user. 

**Output:**

```
{
    "frame": 11,
    "turn": 0,
    "currentPlayer": 0,
    "players": [
        {
            "name": "Scott",
            "frames": [
                {
                    "frame": "1",
                    "firstTurn": "5",
                    "secondTurn": "2",
                    "thirdTurn": "",
                    "currentScore": 7
                },
                {
                    "frame": "2",
                    "firstTurn": "6",
                    "secondTurn": "3",
                    "thirdTurn": "",
                    "currentScore": 16
                },
                {
                    "frame": "3",
                    "firstTurn": "4",
                    "secondTurn": "2",
                    "thirdTurn": "",
                    "currentScore": 22
                },
                {
                    "frame": "4",
                    "firstTurn": "7",
                    "secondTurn": "1",
                    "thirdTurn": "",
                    "currentScore": 30
                },
                {
                    "frame": "5",
                    "firstTurn": "5",
                    "secondTurn": "2",
                    "thirdTurn": "",
                    "currentScore": 37
                },
                {
                    "frame": "6",
                    "firstTurn": "4",
                    "secondTurn": "1",
                    "thirdTurn": "",
                    "currentScore": 42
                },
                {
                    "frame": "7",
                    "firstTurn": "5",
                    "secondTurn": "4",
                    "thirdTurn": "",
                    "currentScore": 51
                },
                {
                    "frame": "8",
                    "firstTurn": "5",
                    "secondTurn": "1",
                    "thirdTurn": "",
                    "currentScore": 57
                },
                {
                    "frame": "9",
                    "firstTurn": "9",
                    "secondTurn": "0",
                    "thirdTurn": "",
                    "currentScore": 66
                },
                {
                    "frame": "10",
                    "firstTurn": "8",
                    "secondTurn": "/",
                    "thirdTurn": "",
                    "currentScore": 81
                }
            ]
        }
    ]
}
```

# Front End
## Info

Used [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) to generate all the base React requirements and to speed up development process. Because this is an additive piece and because nothing special regarding react is really needed for this, its a perfect tool to utilize to get up and running and building a front end app.

## Flow

1. User inserts player names.
![Start Game](/assets/startScreen.png)
3. Click start game.
![Scoreboard](/assets/scoreboard.png)
4. User Rolls ball, after a roll the pins which were knocked down are displayed. After your turn is over moves to the next player.
![Scoreboard](/assets/changeTurn.png)
5. Repeats until game is over. User is presented with two options Reset or New Game. Reset will start the game over with the same players while New Game will take you back to the initial screen.
![Scoreboard](/assets/endGame.png)

# Potential Addons 
* Determine if roll was a split.
* Get individual players score.
* Write tests for front end.
* Add logic to specify in front end which pins you knocked down.
* Add winner logic.
* Have API on frontend be dynamic. Currently hard coded ports and routes. 
