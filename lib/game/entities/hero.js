ig.module(
    'game.entities.hero'
)
.requires(
    'impact.entity'
)
.defines(function(){
    
    EntityHero = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/hero.png', 16, 16 ),
        size: {x: 10, y: 14},
        offset: {x: 3, y: 1},
        flip: false,
        maxVel: {x: 100, y: 200},
        friction: {x: 500, y: 0},
        accelGround: 400,
        accelAir: 250,
        jump: 200,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim('idle', 1, [0]);
            this.addAnim('run', 0.07, [0,1,2,3,4,5]);
            this.addAnim('jump', 1, [0]);
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
            if (this.standing && ig.input.pressed('jump')) {
                this.vel.y = -this.jump;
            }
            if (ig.input.pressed('attack')) {
                ig.game.spawnEntity(EntitySword, this.pos.x, this.pos.y, {flip: this.flip});
            }
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
            this.currentAnim.flip.x = this.flip;            
            this.parent();
        }
    });
    
    EntitySword = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/sword.png', 16, 16),
        size: {x: 14, y: 4},
        offset: {x: 1, y: 6},
        maxVel: {x: 150, y: 0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        init: function(x, y, settings) {
            this.parent(x + (settings.flip ? -4 : 8), y + 8, settings);
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim('idle', 0.2, [0]);
        }
    });
});
