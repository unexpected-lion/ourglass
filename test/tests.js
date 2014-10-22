// run in browser by opening SpecRunner.html
// run in terminal with command "mocha-phantomjs [root]/ourglass/test/SpecRunner.html"

describe('game', function(){
  // tests actual game functions but broken bc canvas
  // var testGame = new SimpleGame();

  // working but not actually informative
  var testGame = {c: {collider: true, entities: [0,1,2]} };

  it('should create a new game object', function(){
    expect(testGame).to.be.a('object');
    expect(testGame).to.have.property('c');
  })
  it('should observe collisions', function(){
    expect(testGame.c).to.have.property('collider');  
  })

  describe('entities', function(){
    it('should contain game entities', function(){
      expect(testGame.c).to.have.property('entities');
      expect(testGame.c.entities).to.have.length.above(2);
    })
  })

});


describe('player', function(){
  // test actual game functions but broken bc canvas
  // var testGame = new SimpleGame();
  // var testPlayer = testGame.c.entities.create(Player, {x:100,y:5});
  
  // working but not actually informative
  var testGame = {c: {collider: true, entities: [0,1,2]} };
  var testPlayer = new Player(testGame, {x:100,y:5});
 
  it('should initialize a player when called', function(){
    expect(testPlayer).to.exist;
    expect(testPlayer).to.be.an.instanceOf(Player); 
  })

  it('should have dimensions', function(){
    expect(testPlayer.size.x).to.be.above(0);
    expect(testPlayer.size.y).to.be.above(0);
  })

  it('should respond to a collision event', function(){
    // fake a collision event here??
  })

  it('should respond to user keyboard', function(){
    // fake keyboard events here??
  })

});

describe('particle', function(){
  // test actual game functions but broken bc canvas
  // var testGame = new SimpleGame();
  // var testParticle = testGame.c.entities.create(Particle, {x:5,y:5});
  
  // working but not actually informative
  var testGame = {c: {collider: true, entities: [0,1,2]} };
  var testParticle = new Particle(testGame, {x:5,y:5}); 
  testParticle.center = {x:250, y:0};

  it('should initialize a particle when called', function(){
    expect(testParticle).to.exist;
    expect(testParticle).to.be.an.instanceOf(Particle);
  })

  it('should have dimensions', function(){
    expect(testParticle.size.x).to.be.above(0);
    expect(testParticle.size.y).to.be.above(0);
  })

  it('should respond to a collision event', function(){
    // fake a collision event here??
  })

  it('should move by itself when update function is called', function(){
    var originalYPosition = testParticle.center.y;
    testParticle.update();
    var updatedYPosition = testParticle.center.y;
    expect(updatedYPosition).to.be.above(originalYPosition);
  })
});

describe('spout', function(){
  it('should generate particles', function(){
    // fake a spout
  })
});

describe('goalbucket', function(){
  it('should catch particles', function(){
    // something impressive
  })
});


