ig.module( 
	'game.main' 
)
.requires(
    'impact.debug.debug',
	'impact.font',
	'impact.game',
	'game.levels.X1Y1',
	'game.levels.X2Y1',
	'game.levels.X3Y1',
	'game.levels.X2Y2',
	'game.items',
	'game.stats'
)
.defines(function(){

    MyGame = ig.Game.extend({
	    gravity: 500,
		stats: new Stats(),
		hudFont: new ig.Font('media/04b03.font.png'),
		freeSans12: new ig.Font('media/freesans12.png'),
		freeSans16: new ig.Font('media/freesans16.png'),
		lifeSpriteFull: new ig.Image('media/heart_full.png'),
		lifeSpriteHalf: new ig.Image('media/heart_half.png'),
		lifeSpriteEmpty: new ig.Image('media/heart_empty.png'),
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
		showSpeech: false,
		inventoryBg: new ig.Image('media/inventory_bg.png'),
		invSword: new ig.Image('media/inv_sword.png'),
		boxSword: new ig.Image('media/box_sword.png'),
		boxBow: new ig.Image('media/box_bow.png'),
		boxArmor: new ig.Image('media/box_armor.png'),
		boxShield: new ig.Image('media/box_shield.png'),
		box: new ig.Image('media/box.png'),
		boxList: new ig.Image('media/box_list.png'),
		boxEmpty: new ig.Image('media/box_empty.png'),
		pauseTimer: new ig.Timer(),
		talking: false,
		talkingMessage: null,
		talkingShop: 0,
		talkingTimer: new ig.Timer(),
		talkingShopIndex: 0,
		items: new Items(),
        buySFX: new ig.Sound('sounds/cash.*'),
		errorSFX: new ig.Sound('sounds/error.*'),
		
		draw: function() {
		    this.parent();
			this.hudFont.draw("HP", 2, 2);
			var lifeOffsetX = 17;
            // TODO: deal with HP gradations of 5
			for (var i = 0; i < Math.floor(this.stats.hpCurrent / 10); i++) {
				this.lifeSpriteFull.draw(lifeOffsetX, 2);
				lifeOffsetX += this.lifeSpriteFull.width + 1;
			}
			if (this.stats.hpCurrent % 10 == 5) {
				this.lifeSpriteHalf.draw(lifeOffsetX, 2);
				lifeOffsetX += this.lifeSpriteHalf.width + 1;
			}
			for (var i = 0; i < Math.floor((this.stats.hpMax - this.stats.hpCurrent) / 10); i++) {
				this.lifeSpriteEmpty.draw(lifeOffsetX, 2);
				lifeOffsetX += this.lifeSpriteEmpty.width + 1;
			}
			this.hudFont.draw("MP", 2, 12);
			var magicOffsetX = 17;
			for (var i = 0; i < Math.floor(this.stats.mpCurrent / 10); i++) {
				this.magicSpriteFull.draw(magicOffsetX, 11);
				magicOffsetX += this.magicSpriteFull.width + 1;
			}
			if (this.stats.mpCurrent % 10 == 5) {
				this.magicSpriteHalf.draw(magicOffsetX, 11);
				magicOffsetX += this.magicSpriteHalf.width + 1;
			}
			for (var i = 0; i < Math.floor((this.stats.mpMax - this.stats.mpCurrent) / 10); i++) {
				this.magicSpriteEmpty.draw(magicOffsetX, 11);
				magicOffsetX += this.magicSpriteEmpty.width + 1;
			}
			this.arrowSprite.draw(200, 2);
			this.hudFont.draw(this.stats.arrows, 210, 2);
			this.flaskSprite.draw(200, 11);
			this.hudFont.draw(this.stats.salve, 210, 12);
			this.crystalSprite.draw(250, 2);
			this.hudFont.draw(this.stats.crystals, 260, 2);
			this.beerSprite.draw(250, 11);
			this.hudFont.draw(this.stats.beer, 260, 12);
			this.antidoteSprite.draw(300, 2);
			this.hudFont.draw(this.stats.antidote, 310, 2);
			this.goldSprite.draw(300, 11);
			this.hudFont.draw(this.stats.gold, 310, 12);
			if (this.showSpeech) {
				this.inventoryBg.draw(0, 0);
				this.freeSans16.draw(this.talkingMessage, 20, 20);
				if (this.talkingShop > 0) {
					shopItems = this.items.getItems(this.talkingShop);
					shopPosY = 50;
					for (var shopIndex = 0; shopIndex < shopItems.length; shopIndex++) {
						shopItems[shopIndex].image.draw(18, shopPosY + 2);
						this.freeSans16.draw(shopItems[shopIndex].name, 90, shopPosY + 15);
						this.freeSans16.draw("Cost: " + shopItems[shopIndex].cost, 90, shopPosY + 35);
						shopPosY += 65
					}
					this.boxEmpty.draw(15, 55 + (this.talkingShopIndex * 65));
				}
			}
			else if (this.talking) {
				this.hudFont.draw("Press T to Talk", 360, 2);
				if (this.talkingTimer.delta() > 0.1)
					this.talking = false;
			}
			else if (this.showStats) {
				this.inventoryBg.draw(0, 0);
				this.boxSword.draw(6, 6);
				swordIdx = this.stats.sword;
				if (swordIdx > 0)
					this.items.getItem(swordIdx).image.draw(6, 6);
				this.boxBow.draw(70, 6);
				bowIdx = this.stats.bow;
				if (bowIdx > 0)
					this.items.getItem(bowIdx).image.draw(70, 6);
				this.boxArmor.draw(6, 70);
				armorIdx = this.stats.armor;
				if (armorIdx > 0)
					this.items.getItem(armorIdx).image.draw(6, 70);
				this.boxShield.draw(70, 70);
				shieldIdx = this.stats.shield;
				if (shieldIdx > 0)
					this.items.getItem(shieldIdx).image.draw(70, 70);
				this.arrowSprite.draw(10, 138);
				this.freeSans12.draw("Arrows", 20, 136);
				this.freeSans12.draw(this.stats.arrows, 100, 136);
				this.flaskSprite.draw(10, 152);
				this.freeSans12.draw("Salve", 20, 150);
				this.freeSans12.draw(this.stats.salve, 100, 150);
				this.crystalSprite.draw(10, 166);
				this.freeSans12.draw("Crystals", 20, 164);
				this.freeSans12.draw(this.stats.crystals, 100, 164);
				this.beerSprite.draw(10, 180);
				this.freeSans12.draw("Malt Beer", 20, 178);
				this.freeSans12.draw(this.stats.beer, 100, 178);
				this.antidoteSprite.draw(10, 194);
				this.freeSans12.draw("Antidote", 20, 192);
				this.freeSans12.draw(this.stats.antidote, 100, 192);
				this.goldSprite.draw(10, 208);
				this.freeSans12.draw("Gold", 20, 206);
				this.freeSans12.draw(this.stats.gold, 100, 206);
				this.box.draw(12, 220);
				this.box.draw(100, 220);
				this.box.draw(188, 220);
				this.box.draw(276, 220);
				this.box.draw(364, 220);
				this.box.draw(452, 220);
				this.boxList.draw(144, 50);
				this.boxList.draw(329, 50);
				this.freeSans16.draw("Level: " + this.stats.level, 144, 6);
				this.freeSans16.draw("XP: " + this.stats.xpCurrent + " / " + this.stats.xpMax, 265, 6);
				this.freeSans16.draw("HP: " + this.stats.hpCurrent + " / " + this.stats.hpMax, 144, 28);
				this.freeSans16.draw("MP: " + this.stats.mpCurrent + " / " + this.stats.mpMax, 265, 28);
				this.freeSans16.draw("SP: " + this.stats.spCurrent + " / " + this.stats.spMax, 390, 28);
				this.freeSans16.draw("Skills", 150, 54);
				var y = 82;
				for (var skill in this.stats.skills) {
					this.freeSans12.draw(skill, 150, y);
					this.freeSans12.draw(this.stats.skills[skill], 254, y);
					y += 12;
				}
				this.freeSans16.draw("Spells", 335, 54);
				var y = 82;
				for (var spell in this.stats.spells) {
					this.freeSans12.draw(spell, 335, y);
					this.freeSans12.draw(this.stats.spells[spell], 439, y);
					y += 12;
				}
			}
		},
	
		init: function() {
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.B, 'buy');
			ig.input.bind(ig.KEY.X, 'jump');
			ig.input.bind(ig.KEY.C, 'attack');
			ig.input.bind(ig.KEY.T, 'talk');
			ig.input.bind(ig.KEY.W, 'weapon');
			ig.input.bind(ig.KEY.SPACE, 'inventory');
			
			this.loadHeroDeferred(930, 85, {});
			this.setCurrentLevel('X2Y1');
			this.loadLevel(LevelX2Y1);
		},
	
		update: function() {
			if (ig.input.pressed('inventory') && this.pauseTimer.delta() > 0.3 && !this.showSpeech) {
				this.showStats = !this.showStats;
				this.pauseTimer.reset();
			}
			else if (ig.input.pressed('talk') && this.talking && this.pauseTimer.delta() > 0.3 && !this.showStats) {
				this.showSpeech = !this.showSpeech;
				this.pauseTimer.reset();
			}
			else if (this.showSpeech) {
				if (ig.input.pressed('down') && this.talkingShopIndex < this.items.getItems(this.talkingShop).length - 1)
					this.talkingShopIndex++;
				else if (ig.input.pressed('up') && this.talkingShopIndex > 0)
					this.talkingShopIndex--;
				else if (ig.input.pressed('buy')) {
					item = this.items.getItems(this.talkingShop)[this.talkingShopIndex];
					if (item.cost > this.stats.gold) {
						this.errorSFX.play();
						this.talkingMessage = "You don't seem to have enough gold.";
					}
                    else if (item.alreadyMaxedOut(this.stats)) {
						this.errorSFX.play();
						this.talkingMessage = "You have too many items of that type.";   
                    }                    
					else if (item.alreadyHasItem(this.stats)) {
						this.errorSFX.play();
						this.talkingMessage = "You already own one at least as good.";
					}
					else {				
						this.buySFX.play();
						this.stats.gold -= item.cost;
                        item.buyItem(this.stats);
						this.talkingMessage = "Thank you very much.";
					}
				}
			}
			else if (!this.showStats && !this.showSpeech) {				
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
