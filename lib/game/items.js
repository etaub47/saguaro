ig.module( 
	'game.items'
)
.requires(
    'game.equipment'    
)
.defines(function(){
    
    Items = ig.Class.extend({
        
        itemList: new Array(),
        
        init: function() {
            this.itemList[1] = new Equipment(1, 1, 0, 10, "Common Sword", 'media/inv_sword.png');
            this.itemList[2] = new Equipment(2, 1, 0, 20, "Garth''s Blade", 'media/inv_sword.png');
            this.itemList[3] = new Equipment(3, 1, 0, 40, "Dragon Slayer", 'media/inv_sword.png');     
            this.itemList[4] = new Equipment(4, 2, 100, 10, "Longbow", 'media/inv_bow.png');
            this.itemList[5] = new Equipment(5, 2, 350, 20, "Elven Bow", 'media/inv_sword.png');
            this.itemList[6] = new Equipment(6, 2, 0, 30, "Whisperwind", 'media/inv_sword.png');
            this.itemList[7] = new Equipment(7, 3, 0, 10, "Leather Armor", 'media/inv_sword.png');
            this.itemList[8] = new Equipment(8, 3, 250, 20, "Chain Mail", 'media/inv_sword.png');
            this.itemList[9] = new Equipment(9, 3, 500, 40, "Dwarven Plate", 'media/inv_sword.png');
            this.itemList[10] = new Equipment(10, 4, 0, 10, "Wooden Shield", 'media/inv_sword.png');
            this.itemList[11] = new Equipment(11, 4, 200, 20, "Iron Shield", 'media/inv_sword.png');
            this.itemList[12] = new Equipment(12, 4, 0, 30, "Enchanted Shield", 'media/inv_sword.png');
		},
        
        // get an item by its unique id
        getItem: function(idx) {
            return this.itemList[idx];
        },
        
        // get items offered at a shop by the shop id
        getItems: function(idx) {
            switch (idx) {
                case 1: return [this.getItem(4), this.getItem(8), this.getItem(11)];
                default: return [];
            }
        }
    });
});
