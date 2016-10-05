+function(root, document, ng){
    document.addEventListener("DOMContentLoaded", function () {
        ng.platformBrowserDynamic
        .platformBrowserDynamic().bootstrapModule(app.AppModule);
    });
}(window, document, window.ng);