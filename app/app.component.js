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
        , directives: [
            app.NavigationComponent
            , app.LogoComponent
            , ng.router.ROUTER_DIRECTIVES]
    }).
    Class({
        constructor: mainConstructor
    });
});