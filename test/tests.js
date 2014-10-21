// var expect = chai.expect;

describe('Game', function(){

  // var testGame = new SimpleGame();
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


describe('Player', function(){

  // var testGame = new SimpleGame();
  var testGame = {c: {collider: true, entities: [0,1,2]} };
  // var testPlayer = new Player(testGame, {x:100,y:5});
  var testPlayer = testGame.c.entities.create(Player, {x:100,y:5});
 
  it('should initialize a player when called', function(){
    expect(testPlayer).to.exist;
    expect(testPlayer).to.be.an.instanceOf(Player); 
  })

  it('should have dimensions', function(){
    expect(testPlayer.size.x).to.be.above(0);
    expect(testPlayer.size.y).to.be.above(0);
  })

});

describe('Particle', function(){
  // var testGame = new SimpleGame();
  var testGame = {c: {collider: true, entities: [0,1,2]} };
  var testParticle = new Particle(testGame, {x:5,y:5}); 

  it('should initialize a particle when called', function(){
    expect(testParticle).to.exist;
    expect(testParticle).to.be.an.instanceOf(Particle);
  })

  it('should have dimensions', function(){
    expect(testParticle.size.x).to.be.above(0);
    expect(testParticle.size.y).to.be.above(0);
  })
});