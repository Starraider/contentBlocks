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

    this.init = function (selector) {

      this.selector = selector;
      this.$topics = $(selector);
      this.$listItems = this.$topics.find('li');
      this.$infobox = $('#MozTopicsInfoBox');

      this.categoriesItems();
    }

    this.categoriesItems = function () {
        this.setFirstChar();
        this.componentIsReady = true;
    }

    this.setFirstChar = function () {
      this.$listItems.map( ( index, item) => {
        let $link = $(item).find('a')
        let firstChar = $link.text().charAt(0)
        $(item).addClass( _this.fcClass + firstChar );
      })
    }

    this.changeEvent = function() {
      console.log( this.selector + " li:not('.d-none')" )
      let visibleItems = this.$listItems.not('.d-none');
      if( visibleItems.length > 0 ) {
        this.$infobox.addClass('d-none');
      } else {
        this.$infobox.removeClass('d-none');

      }
    }

    $('.page-link').click( function(e) {

      e.preventDefault();
      let charAttribute = $(this).data('char');
      if( charAttribute ) {
        _this.$listItems.addClass('d-none');
        console.log('.' + _this.fcClass + charAttribute)
        $('.' + _this.fcClass + charAttribute ).removeClass('d-none');
      }

      _this.changeEvent();
    })
  }

  let mozTopics = new MozTopics();
  mozTopics.init('.moz-topics__list > ul');
})
