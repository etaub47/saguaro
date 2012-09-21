ig.module( 
	'game.main' 
)
.requires(
    'impact.debug.debug',
	'impact.font',
	'impact.game',
	'game.levels.X1Y1',
	'game.levels.X2Y1',
	'game.levels.X2Y2'
)
.defines(function(){

    MyGame = ig.Game.extend({
	    gravity: 500,
		hpCurrent: 50,
		hpMax: 50,
		hudFont: new ig.Font('media/04b03.font.png'),
		lifeSpriteFull: new ig.Image('media/heart_full.png'),
		lifeSpriteHalf: new ig.Image('media/heart_half.png'),
		lifeSpriteEmpty: new ig.Image('media/heart_empty.png'),
		mpCurrent: 35,
		mpMax: 50,
		magicSpriteFull: new ig.Image('media/flask_full.png'),
		magicSpriteHalf: new ig.Image('media/flask_half.png'),
		magicSpriteEmpty: new ig.Image('media/flask_empty.png'),
		
		draw: function() {
		    this.parent();
			this.hudFont.draw("HP", 2, 2);
			var lifeOffsetX = 17;
			for (var i = 0; i < Math.floor(this.hpCurrent / 10); i++) {
				this.lifeSpriteFull.draw(lifeOffsetX, 2);
				lifeOffsetX += this.lifeSpriteFull.width + 1;
			}
			if (this.hpCurrent % 10 == 5) {
				this.lifeSpriteHalf.draw(lifeOffsetX, 2);
				lifeOffsetX += this.lifeSpriteHalf.width + 1;
			}
			for (var i = 0; i < Math.floor((this.hpMax - this.hpCurrent) / 10); i++) {
				this.lifeSpriteEmpty.draw(lifeOffsetX, 2);
				lifeOffsetX += this.lifeSpriteEmpty.width + 1;
			}
			this.hudFont.draw("MP", 2, 12);
			var magicOffsetX = 17;
			for (var i = 0; i < Math.floor(this.mpCurrent / 10); i++) {
				this.magicSpriteFull.draw(magicOffsetX, 11);
				magicOffsetX += this.magicSpriteFull.width + 1;
			}
			if (this.mpCurrent % 10 == 5) {
				this.magicSpriteHalf.draw(magicOffsetX, 11);
				magicOffsetX += this.magicSpriteHalf.width + 1;
			}
			for (var i = 0; i < Math.floor((this.mpMax - this.mpCurrent) / 10); i++) {
				this.magicSpriteEmpty.draw(magicOffsetX, 11);
				magicOffsetX += this.magicSpriteEmpty.width + 1;
			}
		},
	
		init: function() {
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.X, 'jump');
			ig.input.bind(ig.KEY.C, 'attack');
			ig.input.bind(ig.KEY.W, 'weapon');
			
			this.loadHeroDeferred(30, 33, {});
			//this.loadHeroDeferred(280, 50, {});
			this.loadLevel(LevelX2Y1);
		},
	
		update: function() {
		    var hero = this.getEntitiesByType(EntityHero)[0];
			if (hero) {
				this.screen.x = hero.pos.x - ig.system.width / 2;
				this.screen.y = -20;
				if (this.screen.x < 0) this.screen.x = 0;
				if (this.screen.x > ig.system.width) this.screen.x = ig.system.width;
			}
		    this.parent();
		}
	});

	ig.main( '#canvas', MyGame, 60, 512, 276, 2 );
});
