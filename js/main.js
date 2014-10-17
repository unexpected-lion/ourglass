

var SimpleGame = function(autoFocus) {
  this.c = new Coquette(this, "simple-canvas", 500, 150, "#000", autoFocus);

  // paramour
  this.c.entities.create(Person, { center: { x:250, y:0 }, size:{x:10,y:10}, color:"#099" });
  this.c.entities.create(Person, { center: { x:300, y:0 }, size:{x:10,y:10}, color:"#099" });

  // player
  this.c.entities.create(Block, { center: { x:256, y:110 },size:{x:100,y:5}, color:"#f07",
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


    },

    collision: function(other) {
      other.center.y -= 20;
      if (other.angle === 30){
        other.angle = 0;
      } else {
        other.angle = 30;
      }
    }
  });
};

var Person = function(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }

  this.update = function(timeSinceLastTick){
    this.center.y++;
  }

  this.draw = function(ctx) {
    ctx.fillStyle = settings.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
     this.center.y - this.size.y / 2,
     this.size.x,
     this.size.y);
  };
};

var Block = function(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }

  this.draw = function(ctx) {
    ctx.fillStyle = settings.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
     this.center.y - this.size.y / 2,
     this.size.x,
     this.size.y);
  };
};


window.addEventListener('load', function() {
  new SimpleGame();
});
