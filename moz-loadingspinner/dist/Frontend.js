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
      this.wasClicked = false;

      this.init = function( selector ) {

        this.selector = selector;

        console.log('Init MozLoadingSpinner');
        console.log(this.selector);
      }

      $(selector + ' button[type="submit"]').on('click', function( e ) {
        console.log('clicked');
        if( _this.wasClicked ) {
          return;
        }
        e.preventDefault();
        _this.wasClicked = true;

        $(selector).addClass('d-none');
        $('.moz-loadingspinner').removeClass('d-none');
        $(selector + ' button[type="submit"]').trigger('click');
      });
    }

    var selector = $('#MozLsSelector').data('selector');
    let mozLoadingSpinner = new MozLoadingSpinner();
    mozLoadingSpinner.init( selector );

  });

})( jQuery );
