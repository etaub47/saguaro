ig.module(
    'game.entities.goldcoin'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityGoldcoin = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/hud_gold.png', 7, 7),
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        decayTimer: null,
        lifetime: 6,
        size: {x: 7, y: 7},
        pickupSFX: new ig.Sound('sounds/cash.*'),
        type: ig.Entity.TYPE.NONE,
        warning: 2,
        
        check: function(other) {
            this.pickupSFX.play();
            ig.game.stats.gold += 5;
            this.kill();
        },
        
        draw: function() {
            if (this.decayTimer && this.decayTimer.delta() + this.warning > this.lifetime)
                this.currentAnim.alpha = ((this.decayTimer.delta() * 4) % 2 >= 1) ? 1 : 0;
            this.parent();
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.2, [0]);
            if (settings.decay)
                this.decayTimer = new ig.Timer();
        },
        
        update: function() {
            this.parent();
            if (this.decayTimer && this.decayTimer.delta() > this.lifetime)
                this.kill();
        }
    })
});
