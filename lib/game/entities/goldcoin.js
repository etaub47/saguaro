ig.module(
    'game.entities.goldcoin'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityGoldcoin = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/hud_gold.png', 16, 16),
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        //decayTimer: new ig.Timer,
        //invincible: false,
        //invincibleDelay: 1,
        //invincibleTimer: null,
        size: {x: 9, y: 9},
        type: ig.Entity.TYPE.NONE,
        
        draw: function() {
            //if (this.invincible)
            //    this.currentAnim.alpha = (this.invincibleTimer.delta() / this.invincibleDelay) / 4 * 3 + 0.25;
            //else
            //    this.currentAnim.alpha = 1;
            this.parent();
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.2, [0]);
            //this.decayTimer = new ig.Timer();
        },
        
        update: function() {
            //if (this.invincible && this.invincibleTimer.delta() > this.invincibleDelay) {
            //    this.invincible = false;
            //}
            this.parent();
        }
    });
});
