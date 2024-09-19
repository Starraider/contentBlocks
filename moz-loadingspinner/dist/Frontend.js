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

    function MozLoadingSpinner() {

      let _this = this;
      this.selector = null;

      this.init = function( selector ) {

        this.selector = selector;

        console.log('Init MozLoadingSpinner');
        console.log(this.selector);
      }

    }

    var selector = $('#MozLsSelector').data('selector');
    // console.log(selector);
    // listen to click on selector
    $(selector + ' button[type="submit"]').on('click', function( e ) {
      console.log('clicked');
      e.preventDefault();
      // show spinner
      $(selector).addClass('d-none');
      $('.moz-loadingspinner').removeClass('d-none');
      setTimeout(function(){
        // submit the form
        $(selector + ' button[type="submit"]').click();
      }, 3000);
    });

  });

})( jQuery );
