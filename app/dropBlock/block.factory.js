+function(root){
    "use strict";

    var colors = [
        null,
        '#e72944',
        '#1086ff',
        '#35d440',
        'purple',
        'black',
        'cyan',
        'gray'
    ];

    function Offset(x, y){
        x = x || 0;
        y = y || 0;
        this.x = x;
        this.y = y;
    }


    function Block(shape){
        this.shape = shape;
        this.offset = new Offset();
    }

    Block.prototype.rotate = function rotate(dir){
        var tmpPeice = null;
        for (var y = 0; y < this.shape.length; ++y){
            for(var x = 0; x < y; ++x){
                tmpPeice = this.shape[x][y];
                this.shape[x][y] = this.shape[y][x];
                this.shape[y][x] = tmpPeice;
            }
        }
        if(dir > 0){
            this.shape.forEach(function(row){ row.reverse()});
        }else{
            this.shape.reverse();
        }
    }

    function createPeice(type){
        if(type === 'T'){
            return [
            [0,0,0],
            [1,1,1],
            [0,1,0]
            ]

        }else if(type === 'O'){
            return [
            [2,2],
            [2,2],
            ]

        }else if(type === 'L'){
            return [
            [0,3,0],
            [0,3,0],
            [0,3,3]
            ]

        }else if(type === 'J'){
            return [
            [0,4,0],
            [0,4,0],
            [4,4,0]
            ]

        }
        else if(type === 'I'){
            return [
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0],
            [0,5,0,0]
            ]

        }else if(type === 'S'){
            return [
            [0,6,6],
            [6,6,0],
            [0,0,0]
            ]

        }else if(type === 'Z'){
            return [
            [7,7,0],
            [0,7,7],
            [0,0,0]
            ]

        }

    }//end function


    root.blockFactory = {
        "get" : function(letter) {return new Block(createPeice(letter)); },
        "randomBlock" : function(){
            var peices = 'ILJOSZT';
            return new Block(createPeice(peices[peices.length * Math.random() | 0]));
        },
        "colors" : colors,
        "Offset": Offset


    }
}(window);