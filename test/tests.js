// run in browser by opening SpecRunner.html
// run in terminal with command "mocha-phantomjs [root]/ourglass/test/SpecRunner.html"
var Entities = Coquette.Entities;
var Collider = Coquette.Collider;
var Renderer = Coquette.Renderer;
var Runner = Coquette.Runner;

var MockContext = function() {
  this.translate = function() {};
  this.fillRect = function() {};
  this.save = function() {},
  this.restore = function() {}
};

var MockCanvas = function() {
  this.style = {};
  this.ctx = new MockContext();
  this.getContext = function() { return this.ctx; };
};

var MockCoquette = function() {
  this.entities = new Entities(this);
  this.runner = new Runner(this);
  this.collider = new Collider(this);
  this.renderer = new Renderer(this, {}, new MockCanvas(), 100, 200);
};

var makeTestGame = function(){
  this.c = new MockCoquette();
  return this.c;
}; 

var testGame = makeTestGame();

var testPlayer = new Player({ size: {x:40,y:10} });
testPlayer.center = {x: 200, y: 400};
var testParticle1 = new Particle({ size: {x:3,y:3} });
var testParticle2 = new Particle({ size: {x:3,y:3} });
testParticle1.center = {x: 20, y: 20};
testParticle1.url = {update: function() {} };
testParticle2.center = {x: 40, y: 10};
testParticle2.url = {update: function() {} };

// var testSpout = new Spout();

testGame.entities._entities.push(testPlayer, testParticle1, testParticle2);
console.log(Object.keys(testParticle2));

describe('game', function(){

  it('should create a new game object', function(){
    expect(testGame).to.be.a('object');
    expect(testGame).to.have.property('entities');
  });

  it('should observe collisions', function(){
    expect(testGame).to.have.property('collider');  
  });

  describe('entities', function(){
    it('should contain game entities', function(){
      expect(testGame).to.have.property('entities');
      expect(testGame.entities._entities).to.have.length.above(2);
    });
  });

});


describe('player', function(){
 
  it('should initialize a player when called', function(){
    expect(testPlayer).to.exist;
    expect(testPlayer).to.be.an.instanceOf(Player); 
  });

  it('should have dimensions', function(){
    expect(testPlayer.size.x).to.be.above(0);
    expect(testPlayer.size.y).to.be.above(0);
  });

  xit('should respond to a collision event', function(){
    var startX = testPlayer.center.x;
    testParticle1.collision(testPlayer);
    expect(testPlayer.center.x).to.not.equal(startX);
  });

  it('should respond to user keyboard', function(){
    // mock keyboard events here
  });

});

describe('particle', function(){

  it('should initialize a particle when called', function(){
    expect(testParticle1).to.exist;
    expect(testParticle1).to.be.an.instanceOf(Particle);
  });

  it('should have dimensions', function(){
    expect(testParticle1.size.x).to.be.above(0);
    expect(testParticle1.size.y).to.be.above(0);
  });

  xit('should move by itself when update function is called', function(){
    var originalYPosition = testParticle1.center.y;
    testParticle1.update();
    var updatedYPosition = testParticle1.center.y;
    expect(updatedYPosition).to.be.above(originalYPosition);
  });

  xit('should accelerate, i.e. is subject to the forces of gravity', function(){
    var originalYPosition = testParticle1.center.y;
    testParticle1.update();
    var updatedYPosition = testParticle1.center.y;
    var initialChangeY = updatedYPosition - originalYPosition;

    for (var i = 0; i < 100; i++){
      testParticle1.update();
    }

    originalYPosition = testParticle1.center.y;
    testParticle1.update();
    updatedYPosition = testParticle1.center.y;
    var postChangeY = updatedYPosition - originalYPosition;

    expect(postChangeY).to.be.above(initialChangeY);
  });

});

describe('spout', function(){
  xit('should generate particles', function(){
    expect(testSpout.emit).to.be.a('function');
    expect(testSpout.emit()).to.be.a('number');
  });
});

describe('goalbucket', function(){
  it('should catch particles', function(){
    // mock bucket
  });
});


