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
        skills: { "Search": "S", "Pick Locks": "L" },
        spells: { "Fireball": "5 MP", "Chill": "10 MP", "Repel": "10 MP" }
    });
    
});
