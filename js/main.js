// when called, will render a new gamespace
// autofocus means the player's keyboard will be active right away, without clicking
var SimpleGame = function(autoFocus) {
  this.c = new Coquette(this, "simple-canvas", 800, 500, "#000", autoFocus);

  // render new particles at the top of the gamespace ({x:0,y:0} is top left)
  this.c.entities.create(Particle, { center: { x:250, y:0 }});
  this.c.entities.create(Particle, { center: { x:300, y:0 }});

  // render a new player that will respond to user's keyboard
  this.c.entities.create(Player, { center: { x:256, y:110 }});

  // all entities on the board can be accessed by calling:
    // this.c.entities.all()
  // or grab just one type:
    // this.c.entities.all(Particle)

};

// on page load, render a new game
window.addEventListener('load', function() {
  new SimpleGame();
});
