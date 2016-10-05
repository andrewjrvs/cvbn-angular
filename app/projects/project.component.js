app.register('ProjectComponent', function (ng) {
    return ng.core
        .Component({
            templateUrl: 'template/projects.html' + '?v=' + (new Date())
            , directives: [app.BlurbComponent]
            , providers: [PersonalInformationService]
        })
        .Class({
            constructor: [PersonalInformationService, function (mySelf) {
                this.projects = mySelf.getProjects();
            }]
        })
    ;
});