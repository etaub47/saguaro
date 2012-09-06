ig.module( 
	'game.main' 
)
.requires(
    'impact.debug.debug',
	'impact.game',
	'game.levels.X1Y1',
	'game.levels.X2Y1'
)
.defines(function(){

    MyGame = ig.Game.extend({
	    gravity: 500,
	
		init: function() {
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.X, 'jump');
			ig.input.bind(ig.KEY.C, 'attack');
			ig.input.bind(ig.KEY.W, 'weapon');
			
			this.loadHeroDeferred(30, 33, {});
			this.loadLevel(LevelX2Y1);
		},
	
		update: function() {
		    var hero = this.getEntitiesByType(EntityHero)[0];
			if (hero) {
				this.screen.x = hero.pos.x - ig.system.width / 2;
				this.screen.y = 0;
				if (this.screen.x < 0) this.screen.x = 0;
				if (this.screen.x > ig.system.width) this.screen.x = ig.system.width;
			}
		    this.parent();
		},
	
		draw: function() {
			this.parent();
		}
	});

	ig.main( '#canvas', MyGame, 60, 512, 256, 2 );
});
