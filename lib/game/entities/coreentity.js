ig.module(
    'game.entities.coreentity'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityCoreentity = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.ACTIVE,
        defaultCollides: ig.Entity.COLLIDES.ACTIVE,
        flip: false,
        invincible: false,
        invincibleDelay: 1,
        invincibleTimer: null,
        
        draw: function() {
            if (this.invincible)
                this.currentAnim.alpha = (this.invincibleTimer.delta() / this.invincibleDelay) / 4 * 3 + 0.25;
            else
                this.currentAnim.alpha = 1;
            this.parent();
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.invincibleTimer = new ig.Timer();
        },
        
        makeInvincible: function() {
            this.invincible = true;
            this.collides = ig.Entity.COLLIDES.NEVER;
            this.invincibleTimer.reset();
        },
        
        receiveDamage: function(amount, from) {
            if (this.invincible)
                return;
            this.makeInvincible();
            this.parent(amount, from);
        },
        
        update: function() {
            if (this.invincible && this.invincibleTimer.delta() > this.invincibleDelay) {
                this.invincible = false;
                this.collides = this.defaultCollides;
            }
            this.parent();
        }
    });
});
