ig.module(
    'game.entities.levelexit'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityLevelexit = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 0, 255, 0.7)',
        size: {x: 4, y: 16},
        level: null,
        dest_x: 0,
        dest_y: 0,
        checkAgainst: ig.Entity.TYPE.A,
        
        update: function() { },
        
        check: function(other) {
            if (other instanceof EntityHero && this.level) {
                if (this.dest_x == 0)
                    this.dest_x = other.pos.x;
                else if (this.dest_y == 0)
                    this.dest_y = other.pos.y;                
                ig.game.loadHeroDeferred(this.dest_x, this.dest_y,
                    {activeWeapon: other.activeWeapon, flip: other.flip, health: other.health,
                     climbing: other.climbing, vel: other.vel});
                ig.game.loadLevelDeferred(ig.global['Level' + this.level]);
            }
        }
    })
});
