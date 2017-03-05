+function(root, document, ng){
    if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
         ng.platformBrowserDynamic
            .platformBrowserDynamic().bootstrapModule(app.AppModule);
    }else{
        document.addEventListener("DOMContentLoaded", function () {
            ng.platformBrowserDynamic
            .platformBrowserDynamic().bootstrapModule(app.AppModule);
        });
     }
}(window, document, window.ng);