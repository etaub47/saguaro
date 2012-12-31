ig.module( 
	'game.stats' 
)
.defines(function(){

    Stats = ig.Class.extend({
        hpCurrent: 50,
		hpMax: 50,
		mpCurrent: 35,
		mpMax: 50,
        level: 12,
        xpCurrent: 12500,
        xpMax: 14000,
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
        skills: { "Search": "S", "Pick Locks": "L" },
        spells: { "Fireball": "5 MP", "Chill": "10 MP", "Repel": "10 MP" },
        events: new Array(),
        
        // 0 = gold coin obtained in X1Y1
        
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
        }
    });
});
