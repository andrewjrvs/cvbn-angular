app.register('NavigationComponent', function (ng) {
    return ng.core
    .Component({
        selector: 'app-navigation'
        , templateUrl: 'template/_navigation.html' + '?v=' + (new Date())
        , providers: []
    })
    .Class({
        constructor: [ng.router.Router, function (router) {
            this.router = router;
        }]

        
        , gotoPage: function(name) {
            this.router.navigate(['/' + name]);
        }
    });
});