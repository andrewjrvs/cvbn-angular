app.register('AppModule', function (ng) {
    
   return ng.core
    .NgModule({
      imports: [ ng.platformBrowser.BrowserModule,
                  ng.http.HttpModule,
                  ng.router.RouterModule, 
                  app.routing, 
                  app.navigationBarModule ],
      declarations: [
                      app.AppComponent, 
                      app.LogoComponent,
                    ],
      providers: [app.PersonalInformationService],
      bootstrap: [app.AppComponent]
    }).Class({ 
      constructor: function() {}
    });
});
