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
        size: {x: 16, y: 16},
        level: null,
        heading: null,
        checkAgainst: ig.Entity.TYPE.A,
        
        update: function() { },
        
        check: function(other) {
            if (other instanceof EntityHero && this.level && this.heading) {
                var dest_x, dest_y;
                if (this.heading == 'east') { dest_x = 2; dest_y = other.pos.y; }
                else if (this.heading == 'north') { dest_x = other.pos.x; dest_y = 242; }
                else if (this.heading == 'west') { dest_x = 1012; dest_y = other.pos.y; }
                else if (this.heading == 'south') { dest_x = other.pos.x; dest_y = 2; }             
                ig.game.loadHeroDeferred(dest_x, dest_y,
                    {activeWeapon: other.activeWeapon, flip: other.flip, health: other.health,
                     climbing: other.climbing, vel: other.vel});
                ig.game.setCurrentLevel(this.level);
                ig.game.loadLevelDeferred(ig.global['Level' + this.level]);                
            }
        }
    })
});
