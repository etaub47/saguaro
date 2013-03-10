ig.module(
    'game.skill'
)
.defines(function() {
    
    Skill = ig.Class.extend({
        id: 0,
        name: null,
        shortcut: null,
        maxLevel: 1,
        mpCost: 0,
        
        init: function(id, name, shortcut, maxLevel, mpCost) {
            this.id = id;
            this.name = name;
            this.shortcut = shortcut;
            this.maxLevel = maxLevel;
            this.mpCost = mpCost;
        },
        
        isSpell: function() {
            return this.mpCost > 0;
        }
    })
});
