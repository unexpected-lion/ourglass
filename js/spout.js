var Spout = function(game, settings, position) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:15, y:70};
  this.color = "#696969";
  this.counter = 0;
  // without this, triggers win function more than once
  this.won = false;
  this.zindex = 1;
  this.counter = 0;
  // emit a particle on a timer
  this.endCode = setInterval(function() {this.emit()}.bind(this), 500);
};


Spout.prototype = {
  collision: function(other) {
    if (this.c.entities.all(Particle).indexOf(other) === -1) {
        other.center.y += 20;
    }
  },

  draw: function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  },

  emit: function() {
    var particles = this.c.entities.all(Particle);
    var particleUrl = this.particleUrl.child(this.counter);
    if (particles.length < 2) {
      this.c.entities.create(Particle, { center: {x: this.center.x, y: this.center.y + this.size.y + 1}, url: particleUrl, id: this.counter});
      this.counter++;
    }
  }

};