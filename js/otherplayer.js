var OtherPlayer = function(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:100,y:5};
  this.color = "#107";
  this.angle = 0;
};


OtherPlayer.prototype = Object.create( Player.prototype);
OtherPlayer.prototype.constructor = Player;
// movement controlled by firebase, so overwrite it here
OtherPlayer.prototype.update = function() {};