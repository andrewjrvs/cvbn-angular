+function(app) {

    app.routing = ng.router.RouterModule.forRoot([
        { path: '', component: app.HomeComponent, pathMatch: 'full' },
        { path: 'about', component: app.AboutComponent},
        { path: 'projects', component: app.ProjectComponent },
        { path: 'oldPath', redirectTo: '/' }
    ]);
}(window.app || (window.app = {}));