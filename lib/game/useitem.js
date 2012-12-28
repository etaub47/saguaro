ig.module(
    'game.useitem'
)
.defines(function() {
    
    Useitem = ig.Class.extend({
        id: 0,
        cost: 0,
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
        
        alreadyHasItem: function(stats) {
            return stats.getEquipmentIdByType(this.category) >= this.id;
        }
    })
});
