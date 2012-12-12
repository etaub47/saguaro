ig.module(
    'game.entities.item'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityItem = ig.Entity.extend({
        animSheet: null,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        decayTimer: null,
        flip: false,
        lifetime: 6,
        name: null,
        size: {x: 16, y: 16},
        speed: 0,
        pickupEvent: -1,
        pickupSFX: null,
        strength: 0,
        type: ig.Entity.TYPE.NONE,
        value: 0,
        warning: 2,

        check: function(other) {
            this.pickupSFX.play();
            if (this.pickupEvent >= 0)
                ig.game.stats.events[this.pickupEvent] = true;
            this.kill();
        },
        
        draw: function() {
            if (this.decayTimer && this.decayTimer.delta() + this.warning > this.lifetime)
                this.currentAnim.alpha = ((this.decayTimer.delta() * 4) % 2 >= 1) ? 1 : 0;
            this.parent();
        },
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.2, [0]);
            if (settings.decay)
                this.decayTimer = new ig.Timer();
            if (settings.pickupEvent)
                this.pickupEvent = settings.pickupEvent;
        },
        
        update: function() {
            this.parent();
            if (this.decayTimer && this.decayTimer.delta() > this.lifetime)
                this.kill();
        }
    })    
});
