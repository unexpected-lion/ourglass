var GoalBucket = function(game, settings, position) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:75, y:20};
  this.color = "#097";
  this.counter = 0;
};


GoalBucket.prototype = {

  win: function(){
    console.log('You won!');
  },

  collision: function(other) {
    other.center.y = 900;
    this.counter++;
    if (this.counter >= 2){
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