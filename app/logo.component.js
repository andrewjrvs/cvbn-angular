app.register('LogoComponent', function (ng) {
    return ng.core
        .Component({
            selector: 'site-logo'
            , templateUrl: 'template/_logo.html'
        })
        .Class({
            constructor: function () { }
        });
});
