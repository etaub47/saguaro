ig.module(
    'game.entities.vampirebat'
)
.requires(
    'impact.entity',
    'game.entities.coreentity',
    'game.entities.food'
)
.defines(function(){
    
    EntityVampirebat = EntityCoreentity.extend({
        animSheet: new ig.AnimationSheet('media/vampirebat.png', 16, 16),
        checkAgainst: ig.Entity.TYPE.A,
        friction: {x: 100, y: 0},
        gravityFactor: 0,
        health: 10,
        maxVel: {x: 150, y: 75},
        offset: {x: 3, y: 3},
        rising: false,
        size: {x: 10, y: 10},
        speed: 100,
        type: ig.Entity.TYPE.B,
        
        check: function(other) {
            other.receiveDamage(5, this);
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('fly', 0.271, [0,1,2,1]);
        },
        
        kill: function() {
            ig.game.stats.awardXp(2);
            ig.game.items.dropItem([EntityFood], [40], this.pos.x, this.pos.y);
            this.parent();
        },

        update: function() {
            var xdir = this.flip ? -1 : 1;
            this.vel.x = this.speed * xdir;
            if (Math.abs(this.vel.y) > 30)
                this.rising = !this.rising;
            this.vel.y += (this.rising ? -2 : 2);
            this.currentAnim.flip.x = this.flip;
            this.parent();
        },
        
        handleMovementTrace: function(res) {
            this.parent(res);
            if (res.collision.x)
                this.flip = !this.flip;
            else if (this.pos.x < 15)
                this.flip = false;
            else if (this.pos.x > 1009)
                this.flip = true;                
            if (res.collision.y)
                this.rising = !this.rising;
        }
    });
});
