var OtherPlayer = function(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:100,y:5};
  this.color = "#107";
  this.angle = 0;
};


OtherPlayer.prototype = {

  draw: function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
     this.center.y - this.size.y / 2,
     this.size.x,
     this.size.y);
  },

  update: function() {
    // controlled by firebase
  },

  getMinX: function() {
    return this.center.x +
      Math.min((this.size.x / 2) * (Math.cos(this.angle * (Math.PI / 180))),
      -1 * (this.size.x / 2) * (Math.cos(this.angle * (Math.PI / 180))));
  },

  getMaxX: function() {
    return this.center.x +
      Math.max((this.size.x / 2) * (Math.cos(this.angle * (Math.PI / 180))),
      -1 * (this.size.x / 2) * (Math.cos(this.angle * (Math.PI / 180))));
  },

  getMinY: function() {
    return this.center.y +
      Math.min((this.size.x / 2) * (Math.sin(this.angle * (Math.PI / 180))),
      -1 * (this.size.x / 2) * (Math.sin(this.angle * (Math.PI / 180))));
  },

  getMaxY: function() {
    return this.center.y +
      Math.max((this.size.x / 2) * (Math.sin(this.angle * (Math.PI / 180))),
      -1 * (this.size.x / 2) * (Math.sin(this.angle * (Math.PI / 180))));
  }

};
