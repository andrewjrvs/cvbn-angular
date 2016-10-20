app.register('AppModule', function (ng) {
   
   app.tmpDirective = ng.core.Directive({
      selector: "[watermelon]",
      host: { '(click)': 'onClick()' }
    }).Class({ 
      constructor: function() {
      },
      onClick :function(){
        alert('clickEvent!');
      }
    });


   
   return ng.core
    .NgModule({
      imports: [ ng.platformBrowser.BrowserModule, ng.router.RouterModule, app.routing, app.navigationBarModule ],
      declarations: [
                      app.tmpDirective,
                      app.AppComponent, 
                      app.LogoComponent,
                    ],
      bootstrap: [app.AppComponent]
    }).Class({ 
      constructor: function() {}
    });
});
