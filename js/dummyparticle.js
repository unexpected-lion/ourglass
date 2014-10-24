var DummyParticle = function(game, settings, position) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:3, y:3};
  this.color = "#FAEBD7";
  
  this.url.on('value', function(data) {
    if (data.val()) {
      this.center = data.val().center;
    }
  }, this);
  
  this.url.parent().on('child_removed', function(data) {
    if (data.name() === this.id) {
      this.c.entities.destroy(this);
    }
  }, this);
};


DummyParticle.prototype = {

  draw: function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  },

  getMaxY: function() {
    return this.center.y - 1;
  }

};