app.register('AppComponent', function (ng) {
    var mainConstructor = function () {
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
        constructor: mainConstructor
    });
});