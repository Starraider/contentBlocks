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
      this.pages = null;
      this.currentPage = null;
      this.wasClicked = false;

      this.init = function( selector, pages ) {

        this.selector = selector;
        // pages is a comma separated list of page ids, example: 1,2,3 explode it to an array
        this.pages = pages.split(',');
        console.log( this.pages );
        console.log('Init MozLoadingSpinner');
        console.log(this.selector);
      }

      $(selector + ' button[type="submit"]').on('click', function( e ) {
        let value = $(this).val();
        // if value and if pages is set and if value is in pages
        if( _this.pages && ! _this.pages.includes(value) ) {
          return;
        }

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
    var pages = $('#MozLsSelector').data('pages');
    let mozLoadingSpinner = new MozLoadingSpinner();
    mozLoadingSpinner.init( selector, pages );

  });

})( jQuery );
