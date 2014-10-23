// when called, will render a new gamespace
// autofocus means the player's keyboard will be active right away, without clicking
var SimpleGame = function(autoFocus, playerName, roomName) {
  this.c = new Coquette(this, "simple-canvas", 800, 500, "#000", autoFocus);

  // render new particles at the top of the gamespace ({x:0,y:0} is top left)

  this.c.entities.create(GoalBucket, { center: { x:300, y:490 } })

  /this.c.entities.create(Spout, { center: { x:100, y:10 } })

  // all entities on the board can be accessed by calling:
    // this.c.entities.all()
  // or grab just one type:
    // this.c.entities.all(Particle)

  // room object handles creating/updating players
  var room = new Room(roomName, playerName, this.c);
};

// on page load, render a new game
window.addEventListener('load', function() {
  $(function(){
    $('#loginform').submit(function(e){
      var playerName = $('#loginform').children('input[name=username]').val()
      var roomName = $('#loginform').children('input[name=password]').val()
      new SimpleGame(true, playerName, roomName);
      return false;
    });

    $('#modaltrigger').leanModal({ top: 200, overlay: 0.45, closeButton: ".hidemodal" });
  });
});
