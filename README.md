# OurGlass [![Build Status](https://travis-ci.org/unexpected-lion/ourglass.svg?branch=master)](https://travis-ci.org/unexpected-lion/ourglass)

Ourglass is a fun team-building game where users work together to prevent sand from spilling all over the place! Users collaboratively race against the clock while working together to direct the flow of sand towards a target.

## Team

  - __Product Owner__: Spencer Handley [github](https://github.com/spencer48)
  - __Scrum Master__: John Heroy [github](https://github.com/johnheroy)
  - __Development Team Members__: Nick Stefan [github](https://github.com/nickstefan), Katherine Gilhooley [github](https://github.com/bisutun), Aric Huang [github](https://github.com/concreted)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage
1. Clone the repo `git clone https://github.com/unexpected-lion/ourglass.git`
1. `npm install -g bower`
1. `bower install`
1. `npm install`
1. `npm install -g gulp`
1. `gulp`
1. Shake ya' bad self. 

## Requirements

- Node 0.10.x
- Coquette
- Firebase
- Mocha (testing)


## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```


## Class API Reference

### SimpleGame

SimpleGame is instantiated when the user has logged into OurGlass, and takes 3 arguments:   
`autoFocus` - generally speaking this should be `true` and means that when the game canvas is rendered, the keyboard will automatically activate without the user needing to click   
`playerName` - string name of player   
`roomName` - string name of room   
Upon instantiation, SimpleGame will assign a single property `c` to a new instance of the Coquette class (see [Coquette.js](https://github.com/maryrosecook/coquette) for more details), and then create a new room (see `Room` class below) and attach that to the `c` property also.

### Room

An instance of Room is created inside SimpleGame's constructor function. It takes 3 arguments:   
`roomName` - string name of room   
`playerName` - string name of player   
`c` - the instance of Coquette created in SimpleGame   
Room's constructor uses the first two arguments to connect to the appropriate data document in Firebase, the root of which is stored as a 'private' property called _fb_room

On connection to Firebase, first Room checks to see if you are the first player to enter this room. Then it will create a new player `c.entities.create(Player, ...)` and pass the relevant firebase reference as the `url` property. 

If you are the first player (`host === true`), then Room creates a Spout, otherwise a DummySpout. Only non-hosts will listen for particles in Firebase and subsequently create DummyParticle instances. Room will also listen once to check / create a goal, and then listen for new players and their updated positions. Room also has two instance methods:

#### Room#addScore()   
Invoked at end of the constructor function, `addScore` creates a new GameScore instance and also checks for a score in Firebase, if none exists then it will add one.

#### Room#deleteRoom()   
Calls `clearTimeout` on the spout, destroys all entities attached to Coquette instance, and removes room from Firebase document.

### Player
Defined as taking arguments:
`game` - game instance,
`settings` - on object of settings properties to be extended onto the class instance

However, with coquette, player is best instantiated from within the game class itself or another class:
`this.c.entities.create(Player,{optionsObj})`

In ourglass, this class is instantiated inside the `Room` class.

settings:
  size = {x: _width_, y: _height_}
  color = _string_
  angle = _integer_
  etc...
  
settings can also be hardcoded to the player class by defining `this.size` etc.

#### Player#collision(other):
Function invoked upon collision, and passes the object being collided as `other`. Both `other` and `this` (this player) can be affected within this function. For example, on collision one could set `other.center.x += 2` to bounce the other object away from player

#### Player#draw(ctx):
Function invoked every frame (ie every second) with the canvas instance passed as `ctx`. This is where the class is actually rendered by using HTML5 canvas functions. For example: `ctx.fillStyle = this.color` would take the class instance's color and begin drawing this class with that color. `ctx.fillRect()` and other HTML5 canvas functions help draw the object.

#### Player#update():
Function invoked every frame, and handles the player's movement. Coquette exposes the keyboard inputs with a simple API such as `this.c.inputter.isDown(this.c.inputter.UP_ARROW)`. Pass that expression into an if statement and the update function could invoke a movement change such as `this.center.y -= 4`.

#### Player#getMinX(), Player#getMaxX(), Player#getMinY(), Player#getMaxY():
These are helper functions that use trigonomerty and the `this.angle` value to calculate, for example, the maximum Y value of a 100px stick when that stick is turned at an angle. This is useful because its not a simple calculation to figure out where in space the stick is when its at an angle.

#### Player#sync():
Automatically invoked inside the Player#update() and ensures the player's positino is synced up with firebase.

#### Player#syncAll():
Automatically invoked upon player creation (inside of Room class), and ensures firebase has all the info it needs to pass to the other players about this player's whereabouts on the canvas.

### DisplayName
Defined as taking arguments:
`game` - game instance,
`settings` - on object of settings properties to be extended onto the class instance

However, with coquette, DisplayName is best instantiated from within the game class itself or another class:
`this.c.entities.create(DisplayName,{optionsObj})`

In ourglass, this class is instantiated inside the `Room` class.

settings:
  center = {x: _width_, y: _height_}
  displayName = `string`

Firebase instantiates this class right after `OtherPlayer`. It is basically a shadow of text that follows around `OtherPlayer`, in order to identify who else is playing with you.

This class inherits its methods from `Player`.

#### `DisplayName.prototype = Object.create( Player.prototype );`
#### `DisplayName.prototype.constructor = Player;`

#### DisplayName#update():
This is a purposely empty function, in order to overwite the function inherited from `Player`. Firebase controlls the movement rather than this function.

#### DisplayName#collision():
This is a purposely empty function, in order to overwite the function inherited from `Player`. We don't want the text to have collision events.

#### DisplayName#draw(ctx):
This function renders this class instance as canvas text, using `this.displayName`, and 30px monospace. It uses `ctx.fillText()` to actually render.

### OtherPlayer
Defined as taking arguments:
`game` - game instance,
`settings` - on object of settings properties to be extended onto the class instance

However, with coquette, OtherPlayer is best instantiated from within the game class itself or another class:
`this.c.entities.create(OtherPlayer,{optionsObj})`

In ourglass, this class is instantiated inside the `Room` class.

settings:
  center = {x: _width_, y: _height_}

While on your own computer, you play as Player, on other people's computers, you are being rendered as OtherPlayer.

This class inherits its methods from `Player`.

#### `OtherPlayer.prototype = Object.create( Player.prototype );`
#### `OtherPlayer.prototype.constructor = Player;`

#### OtherPlayer#update():
This is a purposely empty function, in order to overwite the function inherited from `Player`. Firebase controlls the movement rather than this function.


### Particle
This is the class which represents each particle of 'sand' moving down the screen, initialized by Spout (in Spout#emit()).

#### Particle#update():
In each step the Particle increments its y coordinate and accelerates as it moves downwards, simulating gravity (`this.center.y += this.center.y * .01`). Once the particle gets to the bottom of the screen, it goes back to the position of the Spout.

#### Particle#draw():
Draws a rectangle on the canvas to represent the particle.

#### Particle#getMaxY():
Helper function to determine when particle reaches bottom of the canvas. 

#### Particle#sync():
Updates particle's position in Firebase.

### DummyParticle
Similar to Particle but is not the "source of truth". No update function but instead listens to updated positions in Firebase. So if a Particle instance moves in the host's browser, then the DummyParticle instance will move in other browsers.

#### DummyParticle#draw():
see Particle class

#### DummyParticle#getMaxY():
see Particle class


### GameScore
Defined as taking arguments:
`game` - game instance,
`settings` - on object of settings properties to be extended onto the class instance

However, with coquette, GameScore is best instantiated from within the game class itself or another class:
`this.c.entities.create(GameScore,{optionsObj})`

In ourglass, this class is instantiated inside the `SimpleGame` class and is passed in a settings object that sets it's location. This class's property of `this.score` is incremented from 0, in the GoalBucket#collision() function.

settings:
  center = {x: _width_, y: _height_}

#### GameScore#draw(ctx):
Function invoked every frame (ie every second) with the canvas instance passed as `ctx`. This is where the class is actually rendered by using HTML5 canvas functions. `ctx.fillText()` is used to render a score to the canvas.


### Spout
The source of sand in the "ourglass", the Spout is responsible in the host's browser to generate particles of sand (every 500ms) which players funnel to the goalbucket. Spout's `counter` property tracks the "id" of each Particle instance in Firebase.

#### Spout#collision():
Moves other colliding body downwards by 20px (`other.center.y += 20`)

#### Spout#draw():
Draws rectangular spout.

#### Spout#emit():
Creates new Particle and syncs it with Firebase.


### DummySpout
Similar concept to the Particle/DummyParticle dichotomy, DummySpout is like a fake Spout but actually does not listen to Firebase. All DummySpout does is render and display on a user's screen.

#### DummySpout#collision():
see Spout class

#### DummySpout#draw():
see Spout class


### GoalBucket

GoalBucket is a rectangle on the bottom of the canvas and is the area users's target to funnel sand from the spout. It's purpose is to listen for Particle collisions and then call the appropriate methods on GameScore.

#### GoalBucket#collision():
If colliding "other" is not a Particle, move up 30px. Otherwise (particle has collided), then remove particle from the Firebase document and invoke `incrementAndSync()` on the GameScore instance.

#### GoalBucket#draw():
Draw rectangle to represent GoalBucket visually.


## Roadmap

[![Stories in Ready](https://badge.waffle.io/unexpected-lion/ourglass.svg?label=ready&title=Ready)](http://waffle.io/unexpected-lion/ourglass)

View the project roadmap [here](https://github.com/unexpected-lion/ourglass/issues)


## Contributing

See [CONTRIBUTING.md](https://github.com/unexpected-lion/ourglass/blob/master/contributing.md) for contribution guidelines.
