var GoalBucket = function(game, settings, position) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:75, y:20};
  this.color = "#097";
  this.counter = 0;
  this.won = false;

  this.particles = this.c.entities.all(Particle);
};


GoalBucket.prototype = {

  win: function(){
    console.log('You won!');
  },

  collision: function(other) {
    if (this.particles.indexOf(other) === -1) {
        other.center.y -= 30;
    } else {
      this.c.entities.destroy(other);
      this.counter++;
      if (this.counter >= 2 && this.won === false){
        this.win();
        this.won = true;
      }
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
