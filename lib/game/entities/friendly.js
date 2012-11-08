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
        message: null,
        shop: 0,
        speed: 20,
        type: ig.Entity.TYPE.A
    })    

});
