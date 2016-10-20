app.register('scrollupDirective', function (ng) {
    // add class('display'')
    return ng.core.Directive({
      selector: "[scrollup]",
      host: { '(click)': 'onClick()', '[class.display]': 'displayScroll' },
    }).Class({ 
      constructor: [app.scrollupService, ng.core.ElementRef, ng.core.Renderer,function(suService, elementRef, renderer) {
            //this.Window = displayWindow;
            var vm = this;
            vm.displayScroll = false;
            vm.suService = suService;
            vm.unlistenScroll = renderer.listenGlobal('window', 'scroll', function(e){ 
                /// <summary>this will hide/show the scroll item based on where we are in the page.</summary>
                var sTop = (this.pageYOffset || this.document.documentElement.scrollTop) - (this.document.documentElement.clientTop || 0)
                    , okToDisplay = sTop > 200
                ;


                if (okToDisplay && !vm.displayScroll) {
                    // then we need to add the class
                    vm.displayScroll = true;
                } else if(!okToDisplay && vm.displayScroll){
                    // otherwise remove it.
                    vm.displayScroll = false;
                }
        
            });
      }],
      onClick :function(){
        this.suService.ScrollToTop();
      },
      ngDestroy: function(){
        this.unlistenScroll();
      }
    });
});