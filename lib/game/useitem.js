ig.module(
    'game.useitem'
)
.defines(function() {
    
    Useitem = ig.Class.extend({
        id: 0,
        cost: 0,
        set: 0,
        max: 0,
        name: null,
		image: null,
        
        init: function(id, cost, set, max, name, imageStr) {
            this.id = id;
            this.cost = cost;
            this.set = set;
            this.max = max;
            this.name = name;
            this.image = new ig.Image(imageStr);
        },
        
        alreadyMaxedOut: function(stats) {
            return stats.getItemQuantityById(this.id) == this.max;
        },
        
        alreadyHasItem: function(stats) {
            return false;
        },
        
        buyItem: function(stats) {
			stats.addItemQuantityById(this.id, this.set, this.max);
        }
    })
});
