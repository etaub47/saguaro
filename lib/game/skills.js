ig.module( 
	'game.skills'
)
.requires(
    'game.skill'
)
.defines(function(){
    
    Skills = ig.Class.extend({
        
        skillList: new Array(13),
        
        init: function() {
            this.skillList[1] = new Skill(1, "Search", "S", 1, 0);
            this.skillList[2] = new Skill(2, "Open Locks", "L", 1, 0);
            this.skillList[3] = new Skill(3, "Avoid Traps", "T", 1, 0);
            this.skillList[4] = new Skill(4, "Climb", "-", 2, 0);
            this.skillList[5] = new Skill(5, "Decrypt", "D", 1, 0);
            this.skillList[6] = new Skill(6, "Fireball", "-", 3, 10);
            this.skillList[7] = new Skill(7, "Chill", "-", 2, 10);
            this.skillList[8] = new Skill(8, "Repel", "-", 2, 10);
            this.skillList[9] = new Skill(9, "Ghost", "-", 2, 20);
            this.skillList[10] = new Skill(10, "Lightning", "-", 3, 15);
            this.skillList[11] = new Skill(11, "Reveal", "-", 2, 15);
            this.skillList[12] = new Skill(12, "Fly", "-", 2, 15);
            this.skillList[13] = new Skill(13, "Teleport", "-", 2, 20);
        },
        
        getNumSkills: function() {
            return 13;  
        },
        
        // get a skill by its unique id
        getSkill: function(idx) {
            return this.skillList[idx];
        },
    });
});
