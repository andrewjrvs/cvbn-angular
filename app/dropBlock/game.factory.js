+function(root, playerFactory, boardFactory, blockFactory, document){
    "use strict";

    var settings = {
        "ListCount" : 5
    }

    function Game(canvas){
        this.board = null;
        this.player = null;
        this.highScore = null;
        this.newPeiceList = [];
        this.lastTime = 0;
        this.dropCounter = 0 ;
        this.dropInterval = 1000;
        this.canvas = canvas;

    }

    Game.prototype.reset = function(){
        this.newPeiceList.length = 0;
        populatePeiceList.call(this);
        this.player.reset();
        this.player.shape = this.newPeiceList.shift();
        this.player.shape.offset.x = 8;
        this.board.reset();
        populatePeiceList.call(this);
    }

   

    Game.prototype.clearHighScore = function(){
        this.highScore = 0;
    }

    Game.prototype.start = function (){
        this.board = boardFactory.new(this.canvas, 12, 20);
        this.player = playerFactory.new();
        this.reset();
        console.log('end start');
    }

    Game.prototype.playerRotate = function playerRotate(dir){
        var offset = 1;
        var pos = this.player.shape.offset.x;
        this.player.rotate(dir);
        while(this.board.checkForHit(this.player.shape)){
            this.player.move(offset);
            offset = -(offset + (offset > 0 ? 1 : -1));
            if(offset > this.player.shape.shape[0].length){
                this.player.rotate(-dir);
                this.player.shape.offset.x = pos;
                return;
            }
        }//wend
   }

   Game.prototype.playerMove = function playerMove(dir){
        this.player.move(dir);
        if(this.board.checkForHit(this.player.shape)){
             this.player.move(-1 * dir);
        }
    }

    Game.prototype.playerDrop = function playerDrop(){
        this.player.drop();
        
        if(this.board.checkForHit(this.player.shape)){
            this.player.drop(true);
            this.board.merge(this.player.shape);
            this.player.score = this.board.arenaSweep();
            // update score;
            if(this.player.score > this.highScore) {
                this.highScore = this.player.score;
            }
            this.player.shape = this.newPeiceList.shift();


            this.player.shape.offset.x = 8;
            this.player.shape.offset.y = 0;
            
            if(this.board.checkForHit(this.player.shape)){
                // Game over
                console.log("Game Over");
                this.reset();
            }
            populatePeiceList.call(this); 
        }
        this.dropCounter=0;
    }

    Game.prototype.update = function update(time){
        var deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.dropCounter += deltaTime;
        if(this.dropCounter > this.dropInterval){
            this.playerDrop();
        }
        //this.board.reset();
        this.board.drawBoard();
        this.board.draw(this.player.shape.shape, this.player.shape.offset, true);
    }

    function populatePeiceList(){
        for(var i = 0, len = settings.ListCount - this.newPeiceList.length; i < len; i++){
            this.newPeiceList.push(blockFactory.randomBlock());
        }
    }

    root.gameFactory = {
        "new" : function (canvas) { return new Game(canvas); },
        "Game" : Game
    }
}(window, playerFactory, boardFactory, blockFactory, document);