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
		arrowSprite: new ig.Image('media/hud_arrow.png'),
		flaskSprite: new ig.Image('media/flask.png'),
		crystalSprite: new ig.Image('media/crystal.png'),
		beerSprite: new ig.Image('media/beer.png'),
		antidoteSprite: new ig.Image('media/antidote.png'),
		goldSprite: new ig.Image('media/hud_gold.png'),
		showStats: false,
		inventoryBg: new ig.Image('media/inventory_bg.png'),
		pauseTimer: new ig.Timer(),
		
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
			this.arrowSprite.draw(200, 2);
			this.hudFont.draw("32", 210, 2);
			this.flaskSprite.draw(200, 11);
			this.hudFont.draw("32", 210, 12);
			this.crystalSprite.draw(250, 2);
			this.hudFont.draw("32", 260, 2);
			this.beerSprite.draw(250, 11);
			this.hudFont.draw("32", 260, 12);
			this.antidoteSprite.draw(300, 2);
			this.hudFont.draw("32", 310, 2);
			this.goldSprite.draw(300, 11);
			this.hudFont.draw("32", 310, 12);
			if (this.showStats) {
				this.inventoryBg.draw(0, 0);
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
			ig.input.bind(ig.KEY.SPACE, 'inventory');
			
			//this.loadHeroDeferred(30, 33, {});
			this.loadHeroDeferred(280, 50, {});
			this.loadLevel(LevelX2Y1);
		},
	
		update: function() {
			if (this.showStats) {
				if (ig.input.state('inventory') && this.pauseTimer.delta() > 1) {
					this.showStats = false;
					this.pauseTimer.reset();
					this.parent();
				}
			}
			else {
				if (ig.input.state('inventory') && this.pauseTimer.delta() > 1) {
					this.showStats = true;
					this.pauseTimer.reset();
				}		
				var hero = this.getEntitiesByType(EntityHero)[0];
				if (hero) {
					this.screen.x = hero.pos.x - ig.system.width / 2;
					this.screen.y = -20;
					if (this.screen.x < 0) this.screen.x = 0;
					if (this.screen.x > ig.system.width) this.screen.x = ig.system.width;
				}
				this.parent();	
			}
		}
	});
	
	StartScreen = ig.Game.extend({
		instructText: new ig.Font('media/04b03.font.png'),
		background: new ig.Image('media/start_bg.png'),
		
		init: function() {
			ig.input.bind(ig.KEY.SPACE, 'start');
		},
		
		update: function() {
			if (ig.input.pressed('start')) {
				ig.system.setGame(MyGame);
			}
		},
		
		draw: function() {
			this.background.draw(0, 0);
			var x = ig.system.width / 2;
			var y = ig.system.height - 10;
			this.instructText.draw('Press Spacebar to Start', x + 40, y, ig.Font.ALIGN.CENTER);
		}
	});

	ig.main( '#canvas', StartScreen, 60, 512, 276, 2 );
});
