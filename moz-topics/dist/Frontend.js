/**
 * Logic for pagination & filter of topics
 *
 * @dependencies jquery
 *
 * @author Darius Mozgiel | mozgiel.de
 */
$(document).ready(function () {

  function MozTopics() {

    let _this = this;
    this.topics = null;
    this.selector = null;
    this.fcClass = 'moz-fc--';
    this.componentIsReady = false;
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.startIndex = 0;
    this.showAll = true;
    this.activeFilter = false;

    this.init = function (selector) {

      // init selectors
      this.selector = selector;
      this.$topics = $(selector);
      this.$listItems = this.$topics.find('li');
      this.$infobox = $('#MozTopicsInfoBox');
      this.$pagination = $('#MozTopicsPageIndex');

      // set start values
      this.counter = this.$listItems.length;
      // categorize
      this.categoriesItems();
    }

    this.categoriesItems = function () {
        this.setFirstChar();
        this.setAlphabeticFilter();
        this.paginate();
        this.componentIsReady = true;
    }

    this.setFirstChar = function () {
      this.$listItems.map( ( index, item) => {
        let $link = $(item).find('a')
        let firstChar = $link.text().charAt(0)
        $(item).addClass( _this.fcClass + firstChar );
      })
    }

    this.setAlphabeticFilter = function() {
      for ( i = 0; i < 26; i++ ) {
        let letter = String.fromCharCode(65 + i ); // 97 lowercase
        let $letterItems = $('.' + _this.fcClass + letter );
        if( $letterItems.length === 0 ) {
          $('.page-link[data-char="'+ letter +'"]').addClass('disabled');
        }
      }
    }

    this.changeEvent = function() {

      let visibleItems = this.$listItems.not('.d-none');
      this.counter = visibleItems.length;
      // Handle pagination
      this.paginate();
      // Handle alert box if no entries
      if( visibleItems.length > 0 ) {
        this.$infobox.addClass('d-none');
      } else {
        this.$infobox.removeClass('d-none');
      }
    }

    this.paginate = function() {
      // hide pagination & go back
      if( this.activeFilter ) {
        this.$pagination.addClass('d-none');
        return;
      }
      // else
      this.$pagination.removeClass('d-none');
      let visibleItems = this.$listItems.not('.d-none');

      let startIndex;
      if( this.currentPage === 1 ) {
        startIndex = 0;
      } else {
        startIndex = ( _this.currentPage - 1 ) * _this.itemsPerPage;
      }
      let stopIndex = startIndex + this.itemsPerPage;

      visibleItems.each( function( index ) {
        if( index >= startIndex && index <= stopIndex ) {
          console.log( index + " is inside");
        } else {
          $(this).addClass('d-none');
        }
      })
    }

    /**
     * Click event for the alphabetical index
     */
    $('#MozTopicsAlphabeticIndex .page-link').click( function(e) {
      e.preventDefault();
      // pagination class
      $('#MozTopicsAlphabeticIndex .page-link').removeClass('active');
      $(this).addClass('active');
      // loop
      let charAttribute = $(this).data('char');
      if( charAttribute ) {
        console.log( charAttribute )
        if( charAttribute === 'all' ) {
          _this.activeFilter = null;
          _this.$listItems.removeClass('d-none');
        } else {
          _this.activeFilter = charAttribute;
          _this.$listItems.addClass('d-none');
          $('.' + _this.fcClass + charAttribute ).removeClass('d-none');
        }

      }

      _this.changeEvent();
    })

    $('#MozTopicsPageIndex .page-link').click( function(e) {
      e.preventDefault();
      _this.$listItems.removeClass('d-none');
      $('#MozTopicsPageIndex .page-link').removeClass('active');

      // define new index
      let page = $(this).data('page');
      if( page === 'prev' ) {
        _this.currentPage--;
      } else if( page === 'next' ) {
        _this.currentPage++;
      } else {
        _this.currentPage = $(this).data('page');
      }
      // set active class
      $('.page-link[data-page="'+ _this.currentPage +'"]').addClass('active');
      // TODO check if prev next buttons should be allowed
      _this.paginate();
    })
  }

  let mozTopics = new MozTopics();
  mozTopics.init('.moz-topics__list > ul');
})
