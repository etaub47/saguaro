ig.module(
    'game.entities.arrow'
)
.requires(
    'impact.entity',
    'game.entities.item'    
)
.defines(function() {
    
    EntityArrow = EntityItem.extend({
        animSheet: new ig.AnimationSheet('media/hud_arrow.png', 7, 7),
        size: {x: 7, y: 7},
        pickupSFX: new ig.Sound('sounds/cash.*'),
        
        check: function(other) {
            ig.game.stats.addItemQuantityById(23, 5, 99);
            this.parent();
        }
    })
});
