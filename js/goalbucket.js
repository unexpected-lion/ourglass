var GoalBucket = function(game, settings, position) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:70, y:15};
  this.color = "#8B4513";
  this.score = 0;
  this.won = false;
};


GoalBucket.prototype = {

  collision: function(other) {
    if (this.c.entities.all(Particle).indexOf(other) === -1) {
        other.center.y -= 30;
    } else {
      // delete from firebase
      other.url.remove();
      // remote from game
      this.c.entities.destroy(other);
      this.c.entities.all(GameScore)[0].incrementAndSync();
    }
  },

  draw: function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }

};
