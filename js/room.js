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
  
 
  this.c = c;
  this.playerName = playerName;
  this.player = null;
  this.players = {};
  this.displayNames = {};
  
  this.particles = {};
  this.spout = null;
  this.goal = null;
  

  //check/create player
  this._fb_players.once('value', function(data) {
    // firebase url for this player
    var url = this._fb_players.child(playerName);
    if (!data.val() || !data.val()[playerName]) {
      this.player = c.entities.create(Player, {center: {x: 100, y: 100}, name: playerName, url: url});
      this.player.syncAll();
    } else {
      var center = data.val()[playerName].center;
      this.player = c.entities.create(Player, {center: center, name: playerName, url: url});
    }
  }, this)
  
  //check/create spout
  this._fb_spout.once('value', function(data) {
    // firebase url for this spout
    var url = this._fb_spout.child(1);
    if (!data.val()) {
      var center = { x:Math.random() * 500, y:10 };
      this.spout = this.c.entities.create(Spout, { center: center });
      url.update({center: center});
    } else {
      var center = data.val()[1].center;
      this.spout = this.c.entities.create(Spout, { center: center });
    }
  }, this)
  
  //check/create goal
  this._fb_goal.once('value', function(data) {
    // firebase url for this goal
    var url = this._fb_goal.child(1);
    if (!data.val()) {
      var center = { x:Math.random() * 500, y:490 };
      this.goal = this.c.entities.create(GoalBucket, { center: center });
      url.update({center: center});
    } else {
      var center = data.val()[1].center;
      this.goal = this.c.entities.create(GoalBucket, { center: center });
    }
  }, this)
  

  // check/add other players
  this._fb_players.on('child_added', function(data) {
    console.log(data.name(), data.val());
    var center = data.val().center;
    var displayName = data.name();
    // check if player already added
    if (this.players[data.name()] === undefined) {
      // create players in coquette
      if (data.name() !== playerName) {
        this.players[data.name()] = c.entities.create(OtherPlayer, { center: center });
        this.displayNames[data.name()] = c.entities.create(DisplayName, {
          center: center,
          displayName: data.name()
        });
      }
    }
  }, this);

  // check/update other player positions
  this._fb_players.on('child_changed', function(data) {
    if (data.name() !== playerName) {
      console.log(data.name(), data.val());
      var name = data.name();
      var center = data.val().center;
      var angle = data.val().angle;
      this.players[name].center = center;
      this.players[name].angle = angle;
      this.displayNames[name].center = center;
    }
  }, this);

  this._fb_particles.on('child_added', function(data) {
    var center = data.val().center;
    // check if particle already present
    if (this.players[data.name()] === undefined) {
      // create particles
       this.players[data.name()] = c.entities.create(Particle, {center: center})
    }
  }, this);

}
