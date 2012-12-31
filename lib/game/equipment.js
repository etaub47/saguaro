ig.module(
    'game.equipment'
)
.defines(function() {
    
    Equipment = ig.Class.extend({
        id: 0,
        category: 0,
        cost: 0,
        value: 0,
        name: null,
		image: null,
        
        init: function(id, category, cost, value, name, imageStr) {
            this.id = id;
            this.category = category;
            this.cost = cost;
            this.value = value;
            this.name = name;
            this.image = new ig.Image(imageStr);
        },
        
        alreadyMaxedOut: function(stats) {
            return false;
        },
        
        alreadyHasItem: function(stats) {
            return stats.getEquipmentIdByType(this.category) >= this.id;
        },
        
        buyItem: function(stats) {
			stats.setEquipmentIdByType(this.category, this.id);
        }
    })
});
