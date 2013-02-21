ig.module( 
	'game.items'
)
.requires(
    'game.equipment',
    'game.useitem'
)
.defines(function(){
    
    Items = ig.Class.extend({
        
        itemList: new Array(),
        
        init: function() {
            this.itemList[1] = new Equipment(1, 1, 0, 10, "Common Sword", 'media/inv_common.png');
            this.itemList[2] = new Equipment(2, 1, 0, 20, "Garth''s Blade", 'media/inv_common.png');
            this.itemList[3] = new Equipment(3, 1, 0, 40, "Dragon Slayer", 'media/inv_common.png');     
            this.itemList[4] = new Equipment(4, 2, 100, 10, "Longbow", 'media/inv_bow.png');
            this.itemList[5] = new Equipment(5, 2, 350, 20, "Elven Bow", 'media/inv_common.png');
            this.itemList[6] = new Equipment(6, 2, 0, 30, "Whisperwind", 'media/inv_common.png');
            this.itemList[7] = new Equipment(7, 3, 0, 10, "Leather Armor", 'media/inv_leather.png');
            this.itemList[8] = new Equipment(8, 3, 250, 20, "Chain Mail", 'media/inv_chain.png');
            this.itemList[9] = new Equipment(9, 3, 500, 40, "Dwarven Plate", 'media/inv_common.png');
            this.itemList[10] = new Equipment(10, 4, 0, 10, "Wooden Shield", 'media/inv_wooden.png');
            this.itemList[11] = new Equipment(11, 4, 200, 20, "Iron Shield", 'media/inv_iron.png');
            this.itemList[12] = new Equipment(12, 4, 0, 30, "Enchanted Shield", 'media/inv_common.png');
            this.itemList[13] = new Equipment(13, 5, 0, 0, "Force Boots", 'media/inv_common.png');
            this.itemList[14] = new Equipment(14, 5, 0, 0, "Power Bracelet", 'media/inv_common.png');
            this.itemList[15] = new Equipment(15, 5, 0, 0, "Ring of Haste", 'media/inv_common.png');
            this.itemList[16] = new Equipment(16, 5, 0, 0, "Black Cape", 'media/inv_common.png');
            this.itemList[17] = new Equipment(17, 5, 0, 0, "TODO", 'media/inv_common.png');
            this.itemList[18] = new Equipment(18, 5, 0, 0, "TODO", 'media/inv_common.png');
            this.itemList[19] = new Useitem(19, 20, 1, 9, "Healing Salve", 'media/inv_salve.png');
            this.itemList[20] = new Useitem(20, 50, 1, 9, "Mana Crystal", 'media/inv_common.png');
            this.itemList[21] = new Useitem(21, 30, 1, 9, "Antidote", 'media/inv_antidote.png');
            this.itemList[22] = new Useitem(22, 25, 1, 9, "Malt Beer", 'media/inv_common.png');
            this.itemList[23] = new Useitem(23, 10, 10, 99, "Quiver of Arrows", 'media/inv_arrows.png');
		},
        
        // get an item by its unique id
        getItem: function(idx) {
            return this.itemList[idx];
        },
        
        // get items offered at a shop by the shop id
        getItems: function(idx) {
            switch (idx) {
                case 1: return [this.getItem(4), this.getItem(8), this.getItem(11)];
                case 2: return [this.getItem(19), this.getItem(21), this.getItem(23)];
                default: return [];
            }
        },

        // possibly drop an item based on an array of items and an array of chances
        dropItem: function(itemArray, chanceArray, x, y) {
            var roll = Math.floor((Math.random() * 100) + 1);
            for (var idx = 0; idx < chanceArray.length; idx++) {
                if (roll <= chanceArray[idx]) {
                    ig.game.spawnEntity(itemArray[idx], x, y, {decay: true});
                    return;
                }
                roll -= chanceArray[idx];
            }
        }
        
    });
});
