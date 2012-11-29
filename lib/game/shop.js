ig.module( 
	'game.shop' 
)
.requires(
    'game.entities.bow'    
)
.defines(function(){
    
    Shop = ig.Class.extend({
        
        longbow: new EntityBow(10, 10, 100, 20, 'TestingBow', {}),
        
        getItems: function(idx) {
            switch (idx) {
                case 1: return [this.longbow];
                default: return [];
            }
        },
        
        init: function() {
        }

    });
});
