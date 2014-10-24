// Room constructor
// Takes a room and player object and returns a Room object.

// Room.players: object of players synced with Firebase.
// Room.balls: object of balls synced with firebase.
var Room = function(roomName, playerName, c) {
  // connect to firebase
  this._fb_room = new Firebase("https://ourglass.firebaseio.com/rooms").child(roomName);
  this._fb_players = this._fb_room.child('players');
  this._fb_particles = this._fb_room.child('particles');
  this._fb_spout = this._fb_room.child('spout');
  this._fb_goal = this._fb_room.child('goal');
  this._fb_score = this._fb_room.child('score');
  
  this.c = c;
  this.playerName = playerName;
  this.player = null;
  this.players = {};
  this.displayNames = {};
  
  this.particles = {};
  this.spout = null;
  this.goal = null;
  this.gamescore = null;

  //check/create player
  this._fb_players.once('value', function(data) {
    // firebase url for this player
    var url = this._fb_players.child(playerName);
    //url.onDisconnect.remove();
    
    // if you join the room first, you're the host
    var host = false;
    if (!data.val()) {
      host = true;
    } 
    
    if (!data.val() || !data.val()[playerName]) {
      this.player = c.entities.create(Player, {center: {x: 100, y: 100}, name: playerName, url: url, host: host});
      this.player.syncAll();
    } else {
      var center = data.val()[playerName].center;
      host = data.val()[playerName].host;
      this.player = c.entities.create(Player, {center: center, name: playerName, url: url});
    }
    
     //check/create spout 
     // if you're host, create a Spout
     // otherwise, create a DummySpout
    this._fb_spout.once('value', function(data) {
      // firebase url for this spout
      var url = this._fb_spout.child(1);
      // no spout in room and you're the host - create one
      if (!data.val()) { 
        var center = { x:Math.random() * 500, y:10 };
        this.spout = this.c.entities.create(Spout, { center: center, url: url, particleUrl: this._fb_particles});
        url.update({center: center});
      } else {
        // spout in room - if you're host, create a Spout
        // otherwise create a DummySpout
        var center = data.val()[1].center;
        if (host) {
          this.spout = this.c.entities.create(Spout, { center: center, url: url, particleUrl: this._fb_particles});
        } else {
          this.spout = this.c.entities.create(DummySpout, { center: center });
        }
      }
    }, this)
    
    
    if (!host) {
      this._fb_particles.on('child_added', function(data) {
        var center = data.val().center;
        var url = this._fb_particles.child(data.name());
        this.particles[data.name()] = c.entities.create(DummyParticle, {center: center, url: url, id: data.name()})
      }, this);
    }
  }, this)
  
 
  
  //check/create goal
  this._fb_goal.once('value', function(data) {
    // firebase url for this goal
    var url = this._fb_goal.child(1);
    if (!data.val()) {
      var center = { x:Math.random() * 500, y:490 };
      this.goal = this.c.entities.create(GoalBucket, { center: center, url: url });
      url.update({center: center});
    } else {
      var center = data.val()[1].center;
      this.goal = this.c.entities.create(GoalBucket, { center: center, url: url });
    }
  }, this)
  

  this.addPlayers();
  
  this.addScore();
  
}

Room.prototype.addPlayers = function() {
  // check/add other players
  this._fb_players.on('child_added', function(data) {
    var center = data.val().center;
    var displayName = data.name();
    // check if player already added
    if (this.players[data.name()] === undefined) {
      // create players in coquette
      if (data.name() !== this.playerName) {
        this.players[data.name()] = this.c.entities.create(OtherPlayer, { center: center });
        this.displayNames[data.name()] = this.c.entities.create(DisplayName, {
          center: center,
          displayName: data.name()
        });
      }
    }
  }, this);

  // check/update other player positions
  this._fb_players.on('child_changed', function(data) {
    if (data.name() !== this.playerName) {
      var name = data.name();
      var center = data.val().center;
      var angle = data.val().angle;
      this.players[name].center = center;
      this.players[name].angle = angle;
      this.displayNames[name].center = center;
    }
  }, this);
  
  // remove players who leave
  this._fb_players.on('child_removed', function(data) {
    this.c.entities.destroy(this.players[data.name()]);
    this.c.entities.destroy(this.displayNames[data.name()]);
  }, this);
  
}

Room.prototype.addScore = function() {
  // check if score value exists on firebase
  this._fb_score.once('value', function(data) { 
    // create score object
    this.gamescore = this.c.entities.create(GameScore, { center: {x:700, y:70}, url: this._fb_score});
    // no score value: create on firebase
    if (!data.val()) {
      this._fb_score.update({score: this.gamescore.score});
    }
  }, this);
    // score value exists: sync score
  this._fb_score.on('value', function(data) {
    if (this.gamescore) {
      this.gamescore.score = data.val().score;
      this.gamescore.checkScore();
    }
  }, this);
}

Room.prototype.deleteRoom = function() {
  var spout = this.c.entities.all(Spout)[0];
  if (spout) {
    clearTimeout(spout.endCode);
  }
  
  var all = this.c.entities.all();
  for (var i = 0; i < all.length; i++) {
    this.c.entities.destroy(all[i]);
  } 
  this._fb_room.remove();
}