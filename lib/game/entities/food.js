ig.module(
    'game.entities.food'
)
.requires(
    'impact.entity',
    'game.entities.item'    
)
.defines(function() {
    
    EntityFood = EntityItem.extend({
        animSheet: new ig.AnimationSheet('media/food.png', 16, 16),
        size: {x: 12, y: 12},
        pickupSFX: new ig.Sound('sounds/eating.*'),
        
        check: function(other) {
            ig.game.stats.increaseHp(5);
            this.parent();
        }
    })
});
