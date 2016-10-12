+function(root, blockFactory){
    "use strict";


    function Board(canvas, x, y ){
        this.el = null;
        this.arena = null;
        this.width = x;
        this.height = y;
        this.reset();
        this.canvas = canvas;
        
        this.context = this.canvas.getContext('2d');
        this.context.scale(18, 18);
    }

    Board.prototype.reset = function(){
        this.arena = createMatrix(this.width, this.height);
    }

    Board.prototype.drawBoard = function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw(this.arena, null, false);
    }

    Board.prototype.draw = function(shape, point, shadow){
        point = point || {x: 0, y: 0};
        point.x = point.x || 0;
        point.y = point.y || 0;
        shape = shape || [[]];
        var self = this;
        shape.forEach(function(row, y) { 
            row.forEach(function(value, x) {
                if(value !== 0){
                    self.context.fillStyle = blockFactory.colors[value];
                    self.context.fillRect(x +point.x, y +point.y, 1, 1);
                    if(shadow){
                        self.context.shadowColor = '#999';
                        self.context.shadowBlur = 20;
                        self.context.shadowOffsetX = 15;
                        self.context.shadowOffsetY = 15;
                    }
                }
            })
        });
    }//end function

    Board.prototype.arenaSweep = function(){
        var rowCount = 1;
        var rtnPoints = 0;
        outer: for(var y = this.arena.length - 1; y > 0; --y){
            for(var x = 0; x < this.arena[y].length;++x){
                if(this.arena[y][x] === 0){
                    continue outer;
                }
            }
            var row = this.arena.splice(y, 1)[0].fill(0);
            this.arena.unshift(row);
            ++y;

            rtnPoints += rowCount * 10;
            rowCount *= 2;
        }
        return rtnPoints;
    }

    Board.prototype.checkForHit = function(shape){
        var m = shape.shape
            , o = shape.offset
        ;
        for(var y = 0; y < m.length; ++y){
            for(var x = 0; x < m[y].length; ++x){
                if(m[y][x] !== 0 &&
                    (!this.arena[y + o.y] ||
                    this.arena[y + o.y][x + o.x] !== 0)){
                        return true;             
                }   
            }
        }
        return false;
    }

    Board.prototype.merge = function(shape){
        var self = this;
        shape.shape.forEach(function(row, y){
            row.forEach(function (value, x) {
                if(value !== 0){
                    self.arena[y+shape.offset.y][x + shape.offset.x] = value;
                }
            });
        });

    }

    function createMatrix(w, h){
        var matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }//end function


    root.boardFactory = {
        "new" : function(canvas, x, y){ return new Board(canvas, x, y) ;},
        "Board" : Board,
    };

}(window, blockFactory);