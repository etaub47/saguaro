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
