app.register('AboutComponent', function (ng) {
    return ng.core
        .Component({
            templateUrl: 'template/about.html' + '?v=' + (new Date())
            , directives: [app.SkillbarComponent]
            , providers: [PersonalInformationService]
        })
        .Class({
            constructor: [PersonalInformationService, function (mySelf) {
                this.skills = mySelf.getSkills();
            }]
        })
    ;
});
