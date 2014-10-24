var GameScore = function(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.color = "blue";
  this.score = 0;
  
  this.won = false;
};

GameScore.prototype.draw = function(ctx) {
  ctx.font = "50px monospace";
  if (this.score > 40) {
    ctx.fillStyle = "yellow";
  } else if (this.score > 30) {
    ctx.fillStyle = "orange";
  } else {
    ctx.fillStyle = this.color;
  }
  ctx.fillText(this.score, this.center.x, this.center.y);
};

GameScore.prototype.sync = function() {
  this.url.update({score: this.score});
};

GameScore.prototype.win = function(){
  // check for spout
  this.c.room.deleteRoom();
  onGameOver();
};

GameScore.prototype.checkScore = function(){
  if (this.score > 49 && !this.won){
    this.won = true;
    this.win();
  }
};

GameScore.prototype.incrementAndSync = function() {
  this.score++;
  this.sync();
  this.checkScore();
};



