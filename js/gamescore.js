var GameScore = function(game, settings) {
  this.c = game.c;
  for (var i in settings) {
    this[i] = settings[i];
  }
  this.color = "blue";
  this.score = 0;
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