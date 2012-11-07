ig.module(
    'game.entities.friendly'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityFriendly = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        flip: false,
        speed: 20,
        type: ig.Entity.TYPE.A
    })    

});
