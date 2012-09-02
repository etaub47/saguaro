ig.module(
    'game.entities.vampirebat'
)
.requires(
    'impact.entity'
)
.defines(function(){
    
    EntityVampirebat = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/vampirebat.png', 16, 16 ),
        gravityFactor: 0,
        size: {x: 10, y: 10},
        offset: {x: 3, y: 3},
        flip: false,
        health: 20,
        maxVel: {x: 150, y: 75},
        friction: {x: 100, y: 0},
        speed: 100,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('fly', 0.3, [0,1,2,1]);
        },
        
        update: function() {
            var xdir = this.flip ? -1 : 1;
            this.vel.x = this.speed * xdir;
            this.currentAnim.flip.x = this.flip;
            this.parent();
        },
        
        handleMovementTrace: function(res) {
            this.parent(res);
            if (res.collision.x)
                this.flip = !this.flip;
        }
    });
});
