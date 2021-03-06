app.register('PersonalInformationService', function (ng) {
     function project(title, blurb, imageURL, labels){
        this.imageURL = imageURL || "";
        this.title =  title || "";
        this.blurb = blurb || "";
        this.labels = [];
        Array.prototype.push.apply(this.labels, labels || []);
    }

    var skills = [
        { "label": 'Programming', "sub": 'C#, VB.NET, PHP', "ability": 94 }
        , { "label": 'Database', "sub": 'MS SQL, MySQL', "ability": 82 }
        , { "label": 'JavaScript', "sub": 'vanilla, jQuery', "ability": 95 }
        , { "label": 'HTML', "sub": 'HTML5, CSS3', "ability": 85 }
        , { "label": 'WordPress', "sub": null, "ability": 75 }
    ];

    var projects = [
        new project("WireOne: Wire Funds Transfer Request Form"
                    , "Worked with a team on a year long project to automate our Wire Funds form entry which would touch multiple deparments. I worked on responsive design, form capturing, after hour request processing, and backend queue processing."
                    , "/images/projects/wireOne.preview.png"
                    , ["C#", "MVC", "MS SQL", "SignalR", "Bootstrap"]
            )
        , new project("Hann Financial Website"
                    , "Site allows customers to securely view their loans and leases, make schedualed payments on their accounts, enroll in auto-pay, change contact information, and request payoff quotes. It also allows dealers to quote rates, submit loan applications, and request payoff quotes."
                    , "/images/projects/hann.preview.png"
                    , ["VB.NET", "Webforms", "ASP Membership", "MS SQL", "TELERIK Web Controls", "Aspose", "SSIS packages"]
            )
        , new project("Valley Forge Asset Managment, LLC Website"
                    , "Created a simple customer facing brochuire site for Valley forge Asset Manangment. Site was responsive with a database driven customer list."
                    , "/images/projects/vfam.preview.png"
                    , ["C#", "MVC", "Entity Framework", "Zurb Foundation"]
            )
    ];
    



    return ng.core.Injectable().Class({ 
      constructor: [ng.http.Http, function(http) {
            var vm = this;
            vm._ = {};
            vm.projects = [];
            vm._.http = http;

            vm.getSkills = function () {
                return vm._.http.get('assets/myskills.json?_v=' + (new Date).getMilliseconds()).map(function (res) { return res.json(); });
            };
            vm.getProjects = function () {
                if (!vm.projects.length) {
                    Array.prototype.push.apply(vm.projects, projects);
                }
                return vm.projects;
            }
       }],
      
    });
});