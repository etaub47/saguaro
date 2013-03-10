ig.module( 
	'game.stats'
)
.defines(function(){

    Stats = ig.Class.extend({
        hpCurrent: 50,
		hpMax: 50,
		mpCurrent: 50,
		mpMax: 50,
        level: 1,
        xpCurrent: 0,
        xpMax: 100,
        spCurrent: 10,
        spMax: 12,
		arrows: 12,
		salve: 23,
		crystals: 34,
		beer: 45,
		antidote: 56,
		gold: 1878,
		sword: 1,
		bow: 0,
		armor: 7,
		shield: 10,
        skills: [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        events: new Array(),
        
        // 0 = gold coin obtained in X2Y1 (284, 88)
        // 1 = gold coin obtained in X2Y1 (520, 120)
        // 2 = gold coin obtained in X2Y1 (764, 136)
        
        init: function() {
            for (i = 0; i < 100; i++) {
                this.events[i] = false;
            }
		},
		
		getEquipmentIdByType: function(typeId) {
			switch (typeId) {
				case 1: return this.sword;
				case 2: return this.bow;
				case 3: return this.armor;
				case 4: return this.shield;
				default: return null;
			}
		},
        
		setEquipmentIdByType: function(typeId, itemId) {
			switch (typeId) {
				case 1: this.sword = itemId; break;
				case 2: this.bow = itemId; break;
				case 3: this.armor = itemId; break;
				case 4: this.shield = itemId; break;
			}
		},

        getItemQuantityById: function(itemId) {
            switch (itemId) {
                case 19: return this.salve;
                case 20: return this.crystals;
                case 21: return this.antidote;
                case 22: return this.beer;
                case 23: return this.arrows;
                default: return 0;
            }
        },
		
        addItemQuantityById: function(itemId, quantity, max) {
            switch (itemId) {
                case 19: this.salve += quantity; if (this.salve >= max) this.salve = max; break;
                case 20: this.crystals += quantity; if (this.crystals >= max) this.crystals = max; break;
                case 21: this.antidote += quantity; if (this.antidote >= max) this.antidote = max; break;
                case 22: this.beer += quantity; if (this.beer >= max) this.beer = max; break;
                case 23: this.arrows += quantity; if (this.arrows >= max) this.arrows = max; break;
            }
        },

        useItemById: function(itemId) {
            switch (itemId) {
                case 19: if (this.salve <= 0) return false; this.salve--; return true;
                case 20: if (this.crystals <= 0) return false; this.crystals--; return true;
                case 21: if (this.antidote <= 0) return false; this.antidote--; return true;
                case 22: if (this.beer <= 0) return false; this.beer--; return true;
                case 23: if (this.arrows <= 0) return false; this.arrows--; return true;
                default: return false;
            }
        },
        
        awardGp: function(gp) {
            this.gold += gp;
            if (this.gold > 9999)
                this.gold = 9999;
        },
        
        awardXp: function(xp) {
            if (this.level < 30) {
                this.xpCurrent += xp;
                if (this.xpCurrent > this.xpMax) {
                    // TODO: play sound indicating player went up a level
                    this.level++;
                    var nextXpArray = [0, 100, 200, 350, 500, 700, 900, 1150, 1400, 1700, 2000, 2350, 2700, 3100,
                                       3500, 3950, 4400, 4900, 5400, 5950, 6500, 7100, 7700, 8350, 9000, 9700, 10400,
                                       11150, 11900, 12700, 13500];
                    if (this.level < 30)
                        this.xpMax = nextXpArray[this.level];
                    this.hpCurrent += 10;
                    this.hpMax += 10;
                    this.mpCurrent += 10;
                    this.mpMax += 10;
                    this.spCurrent++;
                    this.spMax++;
                }
            }
        },
        
        increaseHp: function(amount) {
            this.hpCurrent += amount;
            if (this.hpCurrent > this.hpMax)
                this.hpCurrent = this.hpMax;
            var hero = ig.game.getEntitiesByType(EntityHero)[0];
            hero.health = this.hpCurrent;
        },
        
        getSkillLevelById: function(skillId) {
            return this.skills[skillId - 1];
        },
        
        addNewSkill: function(skillId) {
            this.skills[skillId - 1] = 1;
        },
        
        increaseSkillLevel: function(skillId) {
            this.skills[skillId - 1]++;
        },
        
        hasSkill: function(skillId) {
            return this.getSkillLevelById() > 0;
        },
        
        canIncreaseSkillLevel: function(skillId) {
            var skill = ig.game.skills.getSkill(skillId);
            return this.hasSkill(skillId) && this.getSkillLevelById() < skill.maxLevel;
        }
    });
});
