ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.sandbox'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 500,
	
	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'attack' );
		// Load Level
		this.loadLevel( LevelSandbox )
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 480, 360, 2 );

});
