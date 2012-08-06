ig.module(
    'game.entities.hero'
)
.requires(
    'impact.entity'
)
.defines(function(){
    
    EntityHero = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/hero.png', 16, 16 ),
        size: {x: 8, y: 12},
        offset: {x: 4, y: 2},
        flip: false,
        maxVel: {x: 100, y: 150},
        friction: {x: 600, y: 0},
        accelGround: 400,
        accelAir: 200,
        jump: 200,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [19] );
            this.addAnim( 'run', 0.07, [19,18,17,16,15,14]);
        },
        
        update: function() {
            var accel = this.standing ? this.accelGround : this.accelAir;
            if (ig.input.state('left')) {
                this.accel.x = -accel;
                this.flip = true;
            }
            else if (ig.input.state('right')) {
                this.accel.x = accel;
                this.flip = false;
            }
            else {
                this.accel.x = 0;
            }
            // jump
            if (this.standing && ig.input.pressed('jump')) {
                this.vel.y = -this.jump;
            }
            // move
            this.parent();
        }
        
    });
});
