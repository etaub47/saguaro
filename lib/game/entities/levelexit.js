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
        dest_x: null,
        dest_y: null,
        checkAgainst: ig.Entity.TYPE.A,
        
        update: function() { },
        
        check: function(other) {
            if (other instanceof EntityHero && this.level) {
                ig.game.loadLevel(ig.global['Level' + this.level]);
                //ig.game.spawnEntity(EntityHero, this.dest_x, this.dest_y, other.settings);
                //other.kill();
            }
        }
    })
});
