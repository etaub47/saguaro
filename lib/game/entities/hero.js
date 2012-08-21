ig.module(
    'game.entities.hero'
)
.requires(
    'impact.entity'
)
.defines(function(){
    
    EntityHero = ig.Entity.extend({
        accelAir: 250,
        accelGround: 400,
        animSheet: new ig.AnimationSheet('media/hero.png', 16, 16),
        attackState: null,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        flip: false,
        friction: {x: 500, y: 0},
        jump: 200,
        maxVel: {x: 100, y: 200},
        offset: {x: 3, y: 1},
        size: {x: 10, y: 14},
        type: ig.Entity.TYPE.A,
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.addAnim('run', 0.07, [0,1,2,3,4,5]);
            this.addAnim('jump', 1, [0]);
            this.addAnim('stab', 1, [2]);
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
            if (this.stabTimer && this.stabTimer.delta() > this.sword.lifetime) {
                this.attackState = null;
                this.sword.kill();
            }
            if (ig.input.pressed('attack') && (this.attackState == null)) {
                this.attackState = 'stab';
                this.sword = ig.game.spawnEntity(EntitySword, this.pos.x, this.pos.y, {flip: this.flip});
                this.stabTimer = new ig.Timer();                    
            }
            if (this.attackState == 'stab') {
                this.currentAnim = this.anims.stab;
            }           
            else if (this.vel.y < 0 || this.vel.y > 0) {
                this.currentAnim = this.anims.jump;
            }
            else if (this.vel.x != 0) {
                this.currentAnim = this.anims.run;
            }
            else {
                this.currentAnim = this.anims.idle;
            }
            if (this.sword) {
                this.sword.vel = this.vel;
            }
            this.currentAnim.flip.x = this.flip;
            this.parent();
        }
    });
    
    EntitySword = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/sword.png', 16, 16),
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        gravityFactor: 0,
        lifetime: 0.25,
        maxVel: {x: 100, y: 200},
        offset: {x: 1, y: 6},
        size: {x: 14, y: 4},
        type: ig.Entity.TYPE.NONE,
        
        check: function(other) {
            other.receiveDamage(10, this);
        },
        
        init: function(x, y, settings) {
            this.parent(x + (settings.flip ? -8 : 6), y + 8, settings);
            this.addAnim('idle', 0.2, [0]);
        },
        
        handleMovementTrace: function(res) {
            this.parent(res);
        },
        
        update: function() {
            this.currentAnim.flip.x = this.flip;
            this.parent();
        }
    });
});
