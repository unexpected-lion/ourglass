var otherColors = ['#B4EF52', '#7A13A8', '#BF64C2', '#6DE911', '#6A8FE7', 
  '#ACF2AA', '#84EDB9', '#B5334F', '#31CBAA', '#BEE62B', '#7DB5E5', '#A335B1',
  '#7B5BB6', '#2CB0EC', '#E7996C', '#C52F74', '#60A5B4'];

var OtherPlayer = function(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.size = {x:100,y:5};
  this.color = otherColors[Math.floor(Math.random() * otherColors.length)];
  this.angle = 0;
};


OtherPlayer.prototype = Object.create( Player.prototype);
OtherPlayer.prototype.constructor = Player;
// movement controlled by firebase, so overwrite it here
OtherPlayer.prototype.update = function() {};