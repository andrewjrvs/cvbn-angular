app.register('AppModule', function (ng) {
   
   
   return ng.core
    .NgModule({
      imports: [ ng.platformBrowser.BrowserModule, ng.router.RouterModule, app.routing ],
      declarations: [app.AppComponent],
      bootstrap: [app.AppComponent]
    }).Class({
      constructor: function() {}
    });;
});
