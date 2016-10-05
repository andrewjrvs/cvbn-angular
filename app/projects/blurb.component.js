app.register('BlurbComponent', function (ng) {
    return ng.core.
    Component({
        selector: '[project-blurb]'
        , inputs: ['project']
        , templateUrl: 'template/_projectBlurb.html'
        , host: { '[class.project-overview]': 'true' }
    }).
    Class({
        constructor: function () {
            this.imageURL = "";
            this.title = "";
            this.blurb = "";
            this.labels = "";
        }
        ,ngOnInit: function(){
            this.imageURL = this.project.imageURL;
            this.title = this.project.title;
            this.blurb = this.project.blurb;
            this.labels = this.project.labels;
        }
    });

});