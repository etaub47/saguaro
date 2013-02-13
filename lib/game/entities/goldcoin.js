ig.module(
    'game.entities.goldcoin'
)
.requires(
    'impact.entity',
    'game.entities.item'    
)
.defines(function() {
    
    EntityGoldcoin = EntityItem.extend({
        animSheet: new ig.AnimationSheet('media/hud_gold.png', 7, 7),
        size: {x: 7, y: 7},
        pickupSFX: new ig.Sound('sounds/cash.*'),
        
        check: function(other) {
            ig.game.stats.awardGp(5);
            this.parent();
        }
    })
});
