ig.module(
    'game.entities.bow'
)
.requires(
    'impact.entity',
    'game.entities.item'    
)
.defines(function() {
    
    EntityBow = EntityItem.extend({
        cost: 0,
        damage: 0,
        name: null,
        
        check: function(other) {
            this.parent();
        },
        
        draw: function() {
            this.parent();
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.cost = settings.cost;
            this.damage = settings.damage;
            this.name = settings.name;
        },
        
        update: function() {
            this.parent();
        }
    })
});
