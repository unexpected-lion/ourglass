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
Defined as taking arguments: game(instance), settings(an object)

However, with coquette, best instantiated from within the game class itself or another class:
`this.c.entities.create(Player,{optionsObj})`

options:
  size = {x: _width_, y: _height_}
  color = _string_
  angle = _integer_
  
options can also be hardcoded to the player class by defining `this.size` etc.

#### Player#collision(other):
function invoked upon collision, and passes the object being collided as `other`

### DisplayName

### OtherPlayer

### Particle

### GameScore

### Spout

### GoalBucket


## Roadmap

[![Stories in Ready](https://badge.waffle.io/unexpected-lion/ourglass.svg?label=ready&title=Ready)](http://waffle.io/unexpected-lion/ourglass)

View the project roadmap [here](https://github.com/unexpected-lion/ourglass/issues)


## Contributing

See [CONTRIBUTING.md](https://github.com/unexpected-lion/ourglass/blob/master/contributing.md) for contribution guidelines.
