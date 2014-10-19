var SimpleGame = function(autoFocus) {
  this.c = new Coquette(this, "simple-canvas", 800, 500, "#000", autoFocus);

  // paramour
  this.c.entities.create(Particle, { center: { x:250, y:0 }});
  this.c.entities.create(Particle, { center: { x:300, y:0 }});

  // player
  this.c.entities.create(Player, { center: { x:256, y:110 }});
};

window.addEventListener('load', function() {
  new SimpleGame();
});
