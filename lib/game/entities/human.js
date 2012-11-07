ig.module(
    'game.entities.human'
)
.requires(
    'impact.entity',
    'game.entities.friendly'
)
.defines(function(){
    
    EntityHuman = EntityFriendly.extend({
        animSheet: new ig.AnimationSheet('media/human.png', 16, 16),
        offset: {x: 4, y: 1},
        size: {x: 6, y: 14},
        
        check: function(other) {
            ig.game.talking = true;
            ig.game.talkingTimer.reset();
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('walk', 0.07, [0,1,2,3,4,5]);
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
        }
    })
});
