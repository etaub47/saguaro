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
				case 1: this.sword = itemId;
				case 2: this.bow = itemId;
				case 3: this.armor = itemId;
				case 4: this.shield = itemId;
			}
		}
    });
});
