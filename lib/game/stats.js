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
        skills: { "Search": "S", "Pick Locks": "L" },
        spells: { "Fireball": "5 MP", "Chill": "10 MP", "Repel": "10 MP" }
    });
    
});
