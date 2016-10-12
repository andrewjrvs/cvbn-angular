app.register('HomeComponent', function (ng) {
    "use strict";

    var Settings = {
        "selectors": {
            "el_text": '.flashy-show .screen .mission-text:not(.mission-text-copy)'
            , "el_copyText": '.flashy-show .screen .mission-text-copy'
            , "el_screen": '.flashy-show .screen'
        }
    };

    var _internal = {
        "el_text": null
        , "el_copyText": null
        , "el_screen": null
        , "parallax_center": {
            "top": 0
            , "left": 0
        }
    };


    function mission_document_orentiation(e) {
        var alpha = e.alpha
            , beta = e.beta
            , gamma = e.gamma
        ;


        parallax_missionText(gamma, beta, 90, 90);
        //parallax_screen(x, y, _internal.parallax_center.left, _internal.parallax_center.top);
        paralax_shell(gamma, beta, 90, 90);
    }


    
    function parallax_missionText(x, y, maxX, maxY) {
        /// <summary>this will move the mission text around</summary>
        var maxXdeviation = 3
            , maxYdeviation = 3
            , top = 0
            , left = 0
        ;
        top = ((y * (maxYdeviation) / maxY) - maxYdeviation);// * -1;
        left = ((x * maxXdeviation / maxX) - maxXdeviation);// * -1;
        //top = ((y * (maxYdeviation) / _internal.parallax_center.top) - maxYdeviation) * -1;
        //left = ((x * maxXdeviation / _internal.parallax_center.left) - maxXdeviation) * -1;

        if (top > maxYdeviation) {
            top = maxYdeviation;
        } else if (top < (maxYdeviation * -1)) {
            top = maxYdeviation * -1;
        }

        if (left > maxXdeviation) {
            left = maxXdeviation;
        } else if (left < (maxXdeviation * -1)) {
            left = maxXdeviation * -1;
        }
        _internal.el_copyText.style.transform = 'matrix(1,0,0,1,' + (left) + ',' + (top) + ')';
    }//end function

    function parallax_screen(x, y, maxX, maxY) {
        /// <summary>this will move the mission text around</summary>
        var maxXdeviation = 3
            , maxYdeviation = 3
            , top = 0
            , left = 0
        ;
        top = ((y * (maxYdeviation) / maxY) - maxYdeviation) * -1;
        left = ((x * maxXdeviation / maxX) - maxXdeviation) * -1;
        //top = ((y * (maxYdeviation) / _internal.parallax_center.top) - maxYdeviation) * -1;
        //left = ((x * maxXdeviation / _internal.parallax_center.left) - maxXdeviation) * -1;

        if (top > maxYdeviation) {
            top = maxYdeviation;
        } else if (top < (maxYdeviation * -1)) {
            top = maxYdeviation * -1;
        }

        if (left > maxXdeviation) {
            left = maxXdeviation;
        } else if (left < (maxXdeviation * -1)) {
            left = maxXdeviation * -1;
        }
        _internal.el_screen.style.transform = 'matrix(1,0,0,1,' + (left) + ',' + (top) + ')';
    }

    function paralax_shell(x, y, maxX, maxY) {
        /// <summary>this will move the mission text around</summary>
        var maxXdeviation = 20
            , maxYdeviation = 20
            , tiltX = 0
            , tiltY = 0
            , degX = 0
            , degY = 0
            , deg = '0deg'
        ;
        degY = (((y * (maxYdeviation) / maxY) - maxYdeviation));
        degX = (((x * (maxXdeviation) / maxX) - maxXdeviation));

        if (degY > maxYdeviation) degY = maxYdeviation;
        if (degX > maxXdeviation) degX = maxXdeviation;

        if (degY < 0) degY = degY * -1;
        if (degX < 0) degX = degX * -1;
        deg = (degY > degX ? degY : degX) + 'deg';

        tiltY = degY;
        tiltX = degX;

        if (maxX - x > 0) tiltX = tiltX * -1;
        if (maxY - y > 0) tiltY = tiltY * -1;

        document.querySelector('.flashy-show .shell').style.transform = 'rotate3d(' + tiltY + ',' + (tiltX * -1) + ',0,' + deg + ')';

    }

    
    return ng.core.

    Component({
        templateUrl: 'template/home.html',
        host: {
            '(window:mousemove)': 'mission_document_mousemove($event)'
            , '(window:resize)': 'update_parallaxCenter($event)'
            , '(window:scroll)': 'update_parallaxCenter($event)'
        }
    }).
    Class({
        constructor: function () {
            this.name = 'world';
            this.gameRunning = false;
        }
        , ngOnInit: function () {

            _internal.el_screen = document.querySelector(Settings.selectors.el_screen);
            _internal.el_text = document.querySelector(Settings.selectors.el_text);

            //_internal.el_copyText = document.querySelector(Settings.selectors.el_copyText);
            _internal.el_copyText = _internal.el_text.cloneNode(true);
            _internal.el_copyText.className += " mission-text-copy";
            _internal.el_text.parentNode.appendChild(_internal.el_copyText);


            this.update_parallaxCenter();

        }
        , startGame : function(e){
            if(!this.gameRunning){
                this.gameRunning = true;
                blockDropStart();
            }
        }
        , mission_document_mousemove: function(e) {
            var x = e.clientX
                , y = e.clientY
            ;


            parallax_missionText(x, y, _internal.parallax_center.left, _internal.parallax_center.top);
            //parallax_screen(x, y, _internal.parallax_center.left, _internal.parallax_center.top);
            paralax_shell(x, y, _internal.parallax_center.left, _internal.parallax_center.top);
        }//end function
        , update_parallaxCenter: function () {
            var viewportOffset = _internal.el_text.getBoundingClientRect();
            _internal.parallax_center.top = viewportOffset.top + (viewportOffset.height / 2);
            _internal.parallax_center.left = viewportOffset.left + (viewportOffset.width / 2);

        }
    });
});