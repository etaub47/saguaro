ig.module(
    'game.entities.orc'
)
.requires(
    'impact.entity',
    'game.entities.coreentity'
)
.defines(function(){
    
    EntityOrc = EntityCoreentity.extend({
        animSheet: new ig.AnimationSheet('media/orc.png', 16, 16),
        checkAgainst: ig.Entity.TYPE.A,
        friction: {x: 150, y: 0},
        health: 20,
        maxVel: {x: 100, y: 100},
        offset: {x: 4, y: 1},
        size: {x: 6, y: 14},
        speed: 40,
        type: ig.Entity.TYPE.B,
        
        check: function(other) {
            other.receiveDamage(10, this);
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('walk', 0.07, [0,1,2,1]);
        },
        
        update: function() {
            if (!ig.game.collisionMap.getTile(
                this.pos.x + (this.flip ? 2 : this.size.x - 2),
                this.pos.y + this.size.y + 1)) {
                this.flip = !this.flip;
            }
            var xdir = this.flip ? -1 : 1;
            this.vel.x = this.speed * xdir;
            this.currentAnim.flip.x = this.flip;
            this.parent();
        },
        
        handleMovementTrace: function(res) {
            this.parent(res);
            if (res.collision.x) {
                this.flip = !this.flip;
            }
        }
    });
});
