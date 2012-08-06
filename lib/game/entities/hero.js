ig.module(
    'game.entities.hero'
)
.requires(
    'impact.entity'
)
.defines(function(){
    
    EntityHero = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/hero.png', 16, 16 ),
        size: {x: 12, y: 14},
        offset: {x: 2, y: 1},
        flip: false,
        maxVel: {x: 100, y: 200},
        friction: {x: 500, y: 0},
        accelGround: 400,
        accelAir: 250,
        jump: 200,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [19] );
            this.addAnim( 'run', 0.07, [19,18,17,16,15,14]);
            this.addAnim( 'jump', 1, [19]);
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
            // set the current animation
            if (this.vel.y < 0) {
                this.currentAnim = this.anims.jump;
            }
            else if (this.vel.y > 0) {
                this.currentAnim = this.anims.jump;
            }
            else if (this.vel.x != 0) {
                this.currentAnim = this.anims.run;
            }
            else {
                this.currentAnim = this.anims.idle;
            }
            // flip
            this.currentAnim.flip.x = this.flip;            
            // move
            this.parent();
        }
        
    });
});
