ig.module(
    'game.entities.hero'
)
.requires(
    'impact.entity',
    'game.entities.coreentity'
)
.defines(function(){
    
    EntityHero = EntityCoreentity.extend({
        accelAir: 250,
        accelGround: 400,
        activeWeapon: 0,
        animSheet: new ig.AnimationSheet('media/hero.png', 16, 16),
        attackState: null,
        checkAgainst: ig.Entity.TYPE.NONE,
        climb: 50,
        climbing: false,
        collides: ig.Entity.COLLIDES.PASSIVE,
        defaultCollides: ig.Entity.COLLIDES.PASSIVE,
        friction: {x: 500, y: 0},
        health: 50,
        invincibleDelay: 2,
        jump: 350,
        maxVel: {x: 100, y: 225},
        offset: {x: 4, y: 1},
        size: {x: 6, y: 14},
        totalWeapons: 3,
        type: ig.Entity.TYPE.A,
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.setupAnimation(0);
        },
        
        receiveDamage: function(amount, from) {
            this.parent(amount, from);
            ig.game.hpCurrent = this.health;
            this.climbing = false;
        },
        
        setupAnimation: function(offset) {
            offset = offset * 9;
            this.addAnim('idle', 1, [offset + 0]);
            this.addAnim('run', 0.07, [offset + 0, offset + 1, offset + 2, offset + 3,
                                       offset + 4, offset + 5]);
            this.addAnim('climb', 0.2, [28,29]);
            this.addAnim('jump', 1, [offset + 8]);
            this.addAnim('fall', 0.2, [offset + 6, offset + 7]);
            this.addAnim('stab', 1, [2]);            
            this.addAnim('shoot', 0.6, [27]);            
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
            
            // moving up or down
            if ((this.standing || this.climbing) && // remove to allow jump and climb
                (((ig.game.collisionMap.getTile(this.pos.x + (this.flip ? -1 : this.size.x + 1), this.pos.y)) ||
                 (ig.game.collisionMap.getTile(this.pos.x + (this.flip ? -1 : this.size.x + 1), this.pos.y + this.size.y - 1))))) {
                if (ig.input.state('up')) {
                    this.climbing = true;
                    this.currentAnim = this.anims.climb;                
                    this.vel.y = -this.climb;
                }
                else if (ig.input.state('down')) {
                    this.climbing = true;
                    this.currentAnim = this.anims.climb;                
                    this.vel.y = this.climb;
                }
                else {
                    this.climbing = false;
                }
            }

            // stop climbing
            if (this.standing && !ig.input.state('up') && !ig.input.state('down'))
                this.climbing = false;
            
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
                this.setupAnimation(this.activeWeapon);
            }
            
            // attack
            if (ig.input.pressed('attack') && (this.attackState == null) && !this.climbing) {
                this.attackTimer = new ig.Timer();               
                switch (this.activeWeapon) {
                    case (1):
                        this.attackState = 'stab';
                        this.sword = ig.game.spawnEntity(EntitySword, this.pos.x, this.pos.y, {flip: this.flip});
                        break;
                    case (2):
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
            else if (this.attackState == 'shoot')
                this.currentAnim = this.anims.shoot;                
            else if (this.vel.y < 0 && !this.climbing)
                this.currentAnim = this.anims.jump;
            else if (this.vel.y > 0 && !this.climbing)
                this.currentAnim = this.anims.fall;
            else if (this.vel.x != 0)
                this.currentAnim = this.anims.run;
            else if (!this.climbing)
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
        maxVel: {x: 100, y: 225},
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
            other.receiveDamage(10, this);
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
