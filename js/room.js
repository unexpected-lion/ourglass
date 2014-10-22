// Room constructor
// Takes a room and player object and returns a Room object.

// Room.players: object of players synced with Firebase.
// Room.balls: object of balls synced with firebase.
var Room = function(roomName, playerName, c) {
  // connect to firebase
  this._fb_room = new Firebase("https://ourglass.firebaseio.com/rooms").child(roomName);
  this._fb_players = this._fb_room.child('players');
  this._fb_balls = this._fb_room.child('balls');

  this.c = c;
  this.playerName = playerName;
  this.player = null;
  this.players = {};
  this.balls = null;


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

    console.log(this.player);
    // testing hack - should sync positions from Player class
    // setInterval(function() {
    // }.bind(this), 10);
  }, this)

  // check/add other players
  this._fb_players.on('child_added', function(data) {
    console.log(data.name(), data.val());
    var center = data.val().center;
    // check if player already added
    if (this.players[data.name()] === undefined) {
      // create players in coquette
      if (data.name() !== playerName) {
        this.players[data.name()] = c.entities.create(OtherPlayer, {center: center})
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
    }
  }, this);

  this._fb_balls.on('value', function(data) {
    this.balls = data.val();
  }, this);

}
