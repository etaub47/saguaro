ig.module(
    'game.entities.orc'
)
.requires(
    'impact.entity',
    'game.entities.coreentity'
)
.defines(function(){
    
    EntityOrc = Coreentity.extend({
        animSheet: new ig.AnimationSheet( 'media/hero.png', 16, 16 ),
        size: {x: 10, y: 14},
        offset: {x: 3, y: 1},
        health: 20,
        maxVel: {x: 100, y: 100},
        friction: {x: 150, y: 0},
        speed: 25,
        jump: 100,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,
        
        check: function(other) {
            other.receiveDamage(10, this);
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'walk', 0.07, [0,1,2,3,4,5]);
            this.addAnim( 'jump', 1, [0]);
        },
        
        update: function() {
            if (!ig.game.collisionMap.getTile(
                this.pos.x + (this.flip ? 4 : this.size.x - 4),
                this.pos.y + this.size.y + 1
            )) {
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
