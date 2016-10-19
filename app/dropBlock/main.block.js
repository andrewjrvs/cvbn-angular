+function(root){
    var game= null;
    function start() {
        var gm = gameFactory.new(document.getElementById('dropBlock'));
        
        gm.start();
        update.call(gm, 0);
        game = gm;

    }

    root.blockDropStart = start;


    function update(time){
        this.update(time);
        requestAnimationFrame(update.bind(this));
    }


    document.addEventListener('keydown', function(event) {
        if(event.keyCode === 37){
            game.playerMove(-1);
        }else if(event.keyCode === 39){
            game.playerMove(1);
        }else if(event.keyCode === 40){
            game.playerDrop()
        }else if(event.keyCode === 81){
            game.playerRotate(-1);
        }else if(event.keyCode === 87){
            game.playerRotate(1);
        }
    })
}(window);