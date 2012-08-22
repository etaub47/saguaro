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
        activeWeapon: 0,
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
        totalWeapons: 2,
        type: ig.Entity.TYPE.A,
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
            this.addAnim('run', 0.07, [0,1,2,3,4,5]);
            this.addAnim('jump', 1, [0]);
            this.addAnim('stab', 1, [2]);
        },
        
        update: function() {
            
            // moving left or right
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
            
            // attack timer expires
            if (this.attackTimer && this.attackTimer.delta() > 0.25) {
                this.attackState = null;
                if (this.sword) this.sword.kill();
            }
            
            // switch weapons
            if (ig.input.pressed('weapon')) {
                this.activeWeapon++;
                if (this.activeWeapon >= this.totalWeapons)
                    this.activeWeapon = 0;
            }
            
            // attack
            if (ig.input.pressed('attack') && (this.attackState == null)) {
                this.tempWeapon = 
                this.attackTimer = new ig.Timer();               
                switch (this.activeWeapon) {
                    case (0):
                        this.attackState = 'stab';
                        this.sword = ig.game.spawnEntity(EntitySword, this.pos.x, this.pos.y, {flip: this.flip});
                        break;
                    case (1):
                        this.attackState = 'shoot';
                        ig.game.spawnEntity(EntityArrow, this.pos.x, this.pos.y, {flip: this.flip});
                        break;
                }
            }
            
            // move sword with hero
            if (this.sword) this.sword.vel = this.vel;
                
            // select animation state and direction
            if (this.attackState == 'stab')
                this.currentAnim = this.anims.stab;
            else if (this.vel.y < 0 || this.vel.y > 0)
                this.currentAnim = this.anims.jump;
            else if (this.vel.x != 0)
                this.currentAnim = this.anims.run;
            else
                this.currentAnim = this.anims.idle;
            this.currentAnim.flip.x = this.flip;
                        
            this.parent();
        }
    });
    
    EntitySword = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/sword.png', 14, 4),
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        gravityFactor: 0,
        lifetime: 0.25,
        maxVel: {x: 100, y: 200},
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
            if (res.collision.x || res.collision.y) {
                this.kill();
            }
        },
        
        update: function() {
            this.currentAnim.flip.x = this.flip;
            this.parent();
        }
    });
    
    EntityArrow = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/arrow.png', 14, 4),
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        gravityFactor: 0,
        maxVel: {x: 200, y: 0},
        size: {x: 14, y: 4},
        type: ig.Entity.TYPE.NONE,
        
        check: function(other) {
            other.receiveDamage(5, this);
            this.kill();
        },
        
        init: function(x, y, settings) {
            this.parent(x + (settings.flip ? -8 : 6), y + 8, settings);
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim('idle', 0.2, [0]);
        },
        
        handleMovementTrace: function(res) {
            this.parent(res);
            if (res.collision.x || res.collision.y) {
                this.kill();
            }
        },
        
        update: function() {
            this.currentAnim.flip.x = this.flip;
            this.parent();
        }
    })
});
