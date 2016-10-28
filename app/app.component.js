app.register('AppComponent', function (ng) {
    var mainConstructor = function (router) {

        router.events.subscribe(function(path){
            if (path.url != this.url) {
                window.scrollTo(0, 0);
            }
        });
        this.setTitle = function (strTitle) {
            //documentTitle.setTitle(strTitle);
        }
    };

    return ng.core.
    Component({
        selector: 'my-app'
        , templateUrl: '/template/main.html'
        , directives: []
    }).
    Class({
        constructor: [ng.router.Router, mainConstructor]
    });
});