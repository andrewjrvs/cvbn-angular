app.register('navigationBarModule', function (ng) {
// providers: [{ provide: 'Window',  useValue: window }],
     
 return ng.core
    .NgModule({
      imports: [ ng.platformBrowser.BrowserModule, ng.router.RouterModule ],
      declarations: [
                      app.scrollupDirective,
                      app.navigationBarComponent,
                    ],
      providers:[app.scrollupService, { provide: Window, useValue: window } , ],
      exports:[app.navigationBarComponent],
      bootstrap: [],
    }).Class({ 
      constructor: function() {}
    });

});
