var GoalBucket = function(game, settings, position) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:75, y:20};
  this.color = "#097";
  this.score = 0;
  this.won = false;
};


GoalBucket.prototype = {

  win: function(){
    clearTimeout(this.c.entities.all(Spout)[0].endCode);
    onGameOver();
  },

  collision: function(other) {
    if (this.c.entities.all(Particle).indexOf(other) === -1) {
        other.center.y -= 30;
    } else {
      this.c.entities.destroy(other);
      this.score++;
      this.checkScore();
    }
  },

  checkScore: function(){
    if (this.score > 100 && !this.won){
      this.won = true;
      this.win();
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
