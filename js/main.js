// when called, will render a new gamespace
// autofocus means the player's keyboard will be active right away, without clicking
var SimpleGame = function(autoFocus, playerName, roomName) {
  this.c = new Coquette(this, "simple-canvas", 800, 500, "#000", autoFocus);

  // render new particles at the top of the gamespace ({x:0,y:0} is top left)

  // all entities on the board can be accessed by calling:
    // this.c.entities.all()
  // or grab just one type:
    // this.c.entities.all(Particle)

  // room object handles creating/updating players
  this.c.room = new Room(roomName, playerName, this.c);
};

var onGameOver = function(){
  // reset the login and room name capabilities
  $('#loginform').children('input[name=password]').val('');
  $('#modaltrigger').text('Login');

  // hide the canvas and show the victory
  $('#simple-canvas').hide();
  var victory = $('<div>').addClass('victory');
  victory.attr('id','simple-canvas');
  victory.append('<div class="left-victory"><img class="victory-img" src="assets/giphy.gif"/><div>');
  victory.append('<div class="right-victory"><div class="right-victory-text">Celebrate!</div></div>');
  $('.holder').append(victory);
};

// on page load, render a new game
window.addEventListener('load', function() {
  // on submit of the login modal 'window'
  $('#loginform').submit(function(e){
    var playerName = $('#loginform').children('input[name=username]').val();
    var roomName = $('#loginform').children('input[name=password]').val();
    // replace login button with roomName
    $('#modaltrigger').text(roomName);
    new SimpleGame(true, playerName, roomName);
    // remove any victory divs and show the canvas
    $('.victory').remove();
    $('#simple-canvas').show();
    return false;
  });

  $('#modaltrigger').leanModal({ top: 200, overlay: 0.45, closeButton: ".hidemodal" });
});
