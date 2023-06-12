/**
 * @module moz-counter
 *
 * Counter js functionality
 * Checks if component is inside the viewport
 * triggers animations if true
 *
 * @dependency jquery
 * @author Darius Mozgiel | mozgiel.de
 */
(function ($) {

  $(document).ready(function () {

    function MozCounter() {

      let _this = this;
      this.counters = null;
      this.selector = null;

      this.init = function( selector ) {

        this.selector = selector;
        this.counters = $( selector );

        _this.checkItems();
      }

      $(window).scroll(function(){
        _this.checkItems();
      });

      this.checkItems = function() {
        let className = _this.selector.replace('.', '');
        console.log( className );
        _this.counters.each( function(){
          if(_this.elementScrolled(this )) {
            if( $(this).hasClass( className ) ) {
              $(this).removeClass( className );
              _this.animateValue(this, 0, $(this).data('value'), $(this).data('duration') );
            }
          }
        })
      }

      // This is then function used to detect if the element is scrolled into view
      this.elementScrolled = function(elem)
      {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        return ((elemTop <= docViewBottom ) && (elemTop >= docViewTop));
      }

       this.animateValue = function(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = _this.numberWithCommas( Math.floor(progress * (end - start) + start) );
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }

      this.numberWithCommas = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    }

    let mozCounter = new MozCounter();
    mozCounter.init('.should-count-in-view');
  });

})( jQuery );
