app.register('AboutComponent', function (ng) {
    return ng.core
        .Component({
            templateUrl: 'template/about.html' + '?v=' + (new Date())
            , directives: [app.SkillbarComponent]
        })
        .Class({
            constructor: [app.PersonalInformationService, function (mySelf) {
                var vm = this;
                vm.skills = [];
                mySelf.getSkills().subscribe(function(n){ Object.assign(vm.skills, n)});

            }]
        })
    ;
});
