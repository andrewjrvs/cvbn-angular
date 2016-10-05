app.register('SkillbarComponent', function (ng) {
    return ng.core.
    Component({
        selector: 'skill-bar'
        , inputs: ['value']
        , templateUrl: 'template/_skillbar.html'
        , host: { '[class.row]': 'true' }
    }).
    Class({
        constructor: function () {
            this.value = null;
        }
    });

});