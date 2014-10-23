var DisplayName = function(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.color = this.c.room.players[ this.displayName ].color;
  this.angle = 0;
};


DisplayName.prototype = Object.create( Player.prototype);
DisplayName.prototype.constructor = Player;
// movement controlled by firebase, so overwrite it here
DisplayName.prototype.update = function() {};
// we dont want the names to have collisions, so overwrite
DisplayName.prototype.collision = function() {};
DisplayName.prototype.draw = function(ctx) {
  ctx.font = "30px monospace";
  ctx.fillStyle = this.color;
  ctx.fillText(this.displayName, this.center.x + 50, this.center.y + 50, 100);
};