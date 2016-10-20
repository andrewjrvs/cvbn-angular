app.register('scrollupService', function (ng) {
    // add class('display'')
    return ng.core.Injectable('scrollupService').Class({ 
      constructor: [ng.core.Inject(Window), function(displayWindow) {
          this.Window = displayWindow;
       }],
      ScrollToTop : function(){
        var sTop = (this.Window.pageYOffset || this.Window.document.documentElement.scrollTop) - (this.Window.document.documentElement.clientTop || 0)
        var _w = this.Window;

        // animate the scroll up, so we don't need JQUERY at this point.
        var tick = function () {
            sTop = sTop - (sTop / 10);

            if (sTop < 5) {
                sTop = 0;
            } else if (sTop < 10) {
                sTop = sTop - (sTop / 5);
            }
            _w.scrollTo(0, sTop);

            if (sTop >= 10) {
                (_w.requestAnimationFrame && _w.requestAnimationFrame(tick)) || _w.setTimeout(tick, 10)
            }
        };
        tick();
      }
    });
});