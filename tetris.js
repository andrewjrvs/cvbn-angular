+function(root){

    let canvas = null;
        let context = null;
    function start() {
     canvas = document.getElementById('tetris');
     context = canvas.getContext('2d');

        context.scale(18, 18);
        
        playerReset();
        update();

    }

    root.tetrisStart = start;

function arenaSweep(){
    let rowCount = 1;
    outer: for(let y = arena.length - 1; y > 0; --y){
        for(let x = 0; x < arena[y].length;++x){
            if(arena[y][x] === 0){
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }

}

function collide(arena, player){
    const [m,o] = [player.matrix, player.pos];

    for(let y = 0; y < m.length; ++y){

        for(let x = 0; x < m[y].length; ++x){
           if(m[y][x] !== 0 &&
              (!arena[y + o.y] ||
              arena[y + o.y][x + o.x] !== 0)){
                return true;             
           }   
        }
    }
    return false;
}

function createMatrix(w, h){
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function merge(arena, player){
    
    player.matrix.forEach((row, y) =>{
        row.forEach((value, x) => {
            if(value !== 0){
                arena[y+player.pos.y][x + player.pos.x] = value;
            }
        })

    })

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

}

function draw(){
    //context.fillStyle = "rgba(0, 0, 0, 0)";
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.fillRect(0,0,canvas.width, canvas.height);
    drawMatrix(arena, {x:0, y: 0});
    drawMatrix(player.matrix, player.pos, true);
}

function drawMatrix(matrix, offset, shadow){
    matrix.forEach((row, y) => { 
        //console.log(row);
        row.forEach((value, x) => {
            if(value !== 0){
                context.fillStyle= colors[value];
                context.fillRect(x +offset.x, y +offset.y, 1, 1);
                if(shadow){
                    context.shadowColor = '#999';
                    context.shadowBlur = 20;
                    context.shadowOffsetX = 15;
                    context.shadowOffsetY = 15;
                }
            }
        })
    });
}
let lastTime = 0;
let dropCounter = 0 ;
let dropInterval = 1000;

const colors = [
    null,
    'red',
    'blue',
    'green',
    'purple',
    'yellow',
    'cyan',
    'gray'
]

function update(time = 0){
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if(dropCounter > dropInterval){
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}



const player = {
   pos : {x:0, y:0}
   , matrix: null
   , score: 0
};

const arena = createMatrix(12, 20);

function playerDrop(){
    player.pos.y++ ;
    if(collide(arena, player)){
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter=0;
}

function playerMove(dir){
    player.pos.x += dir;
    if(collide(arena,player)){
        player.pos.x -= dir;
    }

}
function playerReset(){
    const peices = 'ILJOSZT';
    player.matrix = createPeice(peices[peices.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = 5;
    if(collide(arena, player)){
        arena.forEach(row=>row.fill(0));
        player.score = 0;
        updateScore();
    }
}

function rotate(matrix, dir){
    for (let y = 0; y  < matrix.length; ++y){
        for(let x = 0; x < y; ++x){
            [matrix[x][y], 
            matrix[y][x]] =
            [matrix[y][x], 
            matrix[x][y]]
        }

    }
    if(dir > 0){
        matrix.forEach(row => row.reverse());
    }else{
        matrix.reverse();
    }
}

function playerRotate(dir){
    let offset = 1;
    const pos = player.pos.x;
    rotate(player.matrix, dir);
    while(collide(arena, player)){
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        console.log(offset, player.matrix[0].length);
        if(offset > player.matrix[0].length){
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function updateScore(){
    //document.getElementById('score').innerHTML = player.score;
}

document.addEventListener('keydown', event => {
    if(event.keyCode === 37){
        playerMove(-1);
    }else if(event.keyCode === 39){
        playerMove(1);
    }else if(event.keyCode === 40){
         playerDrop()
    }else if(event.keyCode === 81){
        playerRotate(-1);
    }else if(event.keyCode === 87){
        playerRotate(1);
    }
})
}(window);