+function(root){
    "use strict";


    function Player(){
        this.shape = null;
        this.score = null;
        this.reset();
        return this;
    }

    Player.prototype.reset = function(){
        this.shape = null;
        this.score = 0;
        return this;
    }

    Player.prototype.drop = function(reverse){
        if(reverse){
            this.shape.offset.y--;
        }else{
            this.shape.offset.y++;
        }
    }
    Player.prototype.move = function(dir){
        this.shape.offset.x += dir;
    }

    Player.prototype.rotate = function(dir){
        this.shape.rotate(dir);
    }

    root.playerFactory = {
        "new" : function () { return new Player();},
        "Player" : Player,
    };
}(window);