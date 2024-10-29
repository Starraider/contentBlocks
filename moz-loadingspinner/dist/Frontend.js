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

      this.init = function (selector, pages) {

        this.selector = selector;
        // Check if pages is a string with commas, if not and it is an int, create an array with only this value
        this.pages = pages.toString().split(',');

        // Check, if a form with the selector exists
        if ($(selector).length) {
          this.initForm();
        }
      }

      this.initForm = function () {
        window.scrollTo(0, 0);
      }

      $(selector + ' button[type="submit"]').on('click', function (e) {
        let value = $(this).val();
        // if value and if pages is set and if value is in pages
        if (_this.pages && !_this.pages.includes(value)) {
          return;
        }

        if (_this.wasClicked) {
          return;
        }
        e.preventDefault();
        _this.wasClicked = true;

        window.scrollTo(0, 0);
        $(selector).addClass('d-none');
        $('.moz-loadingspinner').removeClass('d-none');
        $(selector + ' button[type="submit"]').trigger('click');
      });
    }

    var selector = $('#MozLsSelector').data('selector');
    var pages = $('#MozLsSelector').data('pages');
    let mozLoadingSpinner = new MozLoadingSpinner();
    mozLoadingSpinner.init(selector, pages);

  });

})(jQuery);
