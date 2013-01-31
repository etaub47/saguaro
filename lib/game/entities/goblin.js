ig.module(
    'game.entities.goblin'
)
.requires(
    'impact.entity',
    'game.entities.coreentity',
    'game.entities.goldcoin'
)
.defines(function(){
    
    EntityGoblin = EntityCoreentity.extend({
        animSheet: new ig.AnimationSheet('media/goblin.png', 16, 16),
        checkAgainst: ig.Entity.TYPE.A,
        friction: {x: 150, y: 0},
        health: 10,
        maxVel: {x: 100, y: 100},
        offset: {x: 5, y: 2},
        size: {x: 6, y: 12},
        speed: 50,
        type: ig.Entity.TYPE.B,
        arrowTimer: new ig.Timer(),
        
        check: function(other) {
            other.receiveDamage(10, this);
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('walk', 0.06, [0,1,2,1]);
        },
        
        kill: function() {
            ig.game.spawnEntity(EntityGoldcoin, this.pos.x, this.pos.y, {decay: true});
            this.parent();
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
            var hero = ig.game.getEntitiesByType(EntityHero)[0]; // TODO: more efficient way to get hero
            if (this.arrowTimer && this.arrowTimer.delta() > 2 && Math.abs(hero.pos.y - this.pos.y) < 5 &&
                ((this.flip && hero.pos.x < this.pos.x) || (!this.flip && hero.pos.x > this.pos.x))) {
                ig.game.spawnEntity(EntityGoblinArrow, this.pos.x, this.pos.y, {flip: this.flip});
                this.arrowTimer.reset();                
            }
            this.parent();
        },
        
        handleMovementTrace: function(res) {
            this.parent(res);
            if (res.collision.x) {
                this.flip = !this.flip;
            }
        }
    });
    
    EntityGoblinArrow = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/arrow.png', 14, 4),
        checkAgainst: ig.Entity.TYPE.A,
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
