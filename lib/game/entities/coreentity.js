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
        invincibleDelay: 0.75,
        invincibleTimer: null,
        skipBlood: false,
        
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
            if (settings.flip && settings.flip == "true")
                this.flip = true;
        },
        
        kill: function() {
            this.parent();
            if (!this.skipBlood)
                ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {});
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
    
    EntityDeathExplosion = ig.Entity.extend({
        lifetime: 1,
        callBack: null,
        particles: 25,
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            for (var i = 0; i < this.particles; i++)
                ig.game.spawnEntity(EntityDeathExplosionParticle, x, y,
                                    {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
            this.idleTimer = new ig.Timer();
        },
        
        update: function() {
            if (this.idleTimer.delta() > this.lifetime) {
                this.kill();
                if (this.callBack)
                    this.callBack();
                return;
            }
        }
    });
    
    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 2,
        fadetime: 1,
        bounciness: 0,
        vel: {x: 100, y: 30},
        friction: {x: 100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        animSheet: new ig.AnimationSheet('media/blood.png', 2, 2),
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            var frameID = Math.round(Math.random() * this.totalColors) +
                (this.colorOffset * (this.totalColors + 1));
            this.addAnim('idle', 0.2, [frameID]);
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
            
        },
        
        update: function() {
            if (this.idleTimer.delta() > this.lifetime) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
            this.parent();
        }
    })
});
