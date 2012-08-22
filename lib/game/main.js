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
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.X, 'jump');
			ig.input.bind(ig.KEY.C, 'attack');
			ig.input.bind(ig.KEY.W, 'weapon');
			this.loadLevel( LevelSandbox )
		},
	
		update: function() {
			this.parent();
		},
	
		draw: function() {
			this.parent();
		}
	});

	ig.main( '#canvas', MyGame, 60, 480, 360, 2 );
});
