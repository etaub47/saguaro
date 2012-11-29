ig.module(
    'game.entities.bow'
)
.requires(
    'impact.entity',
    'game.entities.item'    
)
.defines(function() {
    
    EntityBow = EntityItem.extend({
        animSheet: new ig.AnimationSheet('media/hud_gold.png', 7, 7), // TODO
		shopImage: new ig.Image('media/inv_sword.png'), // TODO
        cost: 0,
        damage: 0,
        name: null,
        
        check: function(other) {
            this.parent();
        },
        
        draw: function() {
            this.parent();
        },
        
        init: function(x, y, cost, damage, name, settings) {
            this.parent(x, y, settings);
            this.category = 2;
            this.cost = cost;
            this.damage = damage;
            this.name = name;
        },
        
        update: function() {
            this.parent();
        }
    })
});
