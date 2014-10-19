var Player = function(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:100,y:5};
  this.color = "#f07";
};


Player.prototype = {
  draw: function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
     this.center.y - this.size.y / 2,
     this.size.x,
     this.size.y);
  },

  update: function() {
    if (this.c.inputter.isDown(this.c.inputter.UP_ARROW)) {
      this.center.y -= 4;
    }
    if (this.c.inputter.isDown(this.c.inputter.DOWN_ARROW)) {
      this.center.y += 4;
    }
    if (this.c.inputter.isDown(this.c.inputter.RIGHT_ARROW) && this.c.inputter.isDown(this.c.inputter.LEFT_ARROW)) {
      this.angle = 30;
    } else {
      if (this.c.inputter.isDown(this.c.inputter.LEFT_ARROW)) {
        this.center.x -= 4;
      }
      if (this.c.inputter.isDown(this.c.inputter.RIGHT_ARROW)) {
        this.center.x += 4;
      }
    }
  }


}
