ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.sandbox2'
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
			this.loadLevel(LevelSandbox2);
		},
	
		update: function() {
		    var hero = this.getEntitiesByType(EntityHero)[0];
			if (hero) {
				this.screen.x = hero.pos.x - ig.system.width / 2;
				this.screen.y = hero.pos.y - ig.system.height / 2;
				if (this.screen.x < 0) this.screen.x = 0;
				if (this.screen.y < 0) this.screen.y = 0;
				if (this.screen.x > ig.system.width) this.screen.x = ig.system.width;
				if (this.screen.y > ig.system.height) this.screen.y = ig.system.height;
			}
		    this.parent();
		},
	
		draw: function() {
			this.parent();
		}
	});

	ig.main( '#canvas', MyGame, 60, 480, 240, 2 );
});
