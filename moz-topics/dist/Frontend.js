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
    this.lastPage = 3;
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
      this.createPagination();
      this.paginate();
      this.componentIsReady = true;
    }

    this.setFirstChar = function () {
      this.$listItems.map((index, item) => {
        let $link = $(item).find('a')
        let firstChar = $link.text().charAt(0)
        $(item).addClass(_this.fcClass + firstChar);
      })
    }

    this.setAlphabeticFilter = function () {
      for (i = 0; i < 26; i++) {
        let letter = String.fromCharCode(65 + i); // 97 lowercase
        let $letterItems = $('.' + _this.fcClass + letter);
        if ($letterItems.length === 0) {
          $('.page-link[data-char="' + letter + '"]').addClass('disabled');
        }
      }
    }

    this.changeEvent = function () {

      let visibleItems = this.$listItems.not('.d-none');
      this.counter = visibleItems.length;
      // Handle pagination
      this.paginate();
      // Handle alert box if no entries
      if (visibleItems.length > 0) {
        this.$infobox.addClass('d-none');
      } else {
        this.$infobox.removeClass('d-none');
      }
    }

    this.setPaginationUI = function (element) {
      // define new index
      let page = $(element).data('page');
      if (page === 'prev') {
        this.currentPage--;
      } else if (page === 'next') {
        this.currentPage++;
      } else {
        this.currentPage = $(element).data('page');
      }
      // set active class
      $('.page-link[data-page="' + this.currentPage + '"]').addClass('active');

      if (this.currentPage === 1) {
        $('#MozTopicsPrevPage').addClass('disabled');
      } else {
        $('#MozTopicsPrevPage').removeClass('disabled');
      }

      if (this.currentPage === this.lastPage) {
        $('#MozTopicsNextPage').addClass('disabled');
      } else {
        $('#MozTopicsNextPage').removeClass('disabled');
      }
    }

    /**
     * Creates the pagination. Prev + first index exists as html
     * The rest gets appended. In the end also the "next page"
     */
    this.createPagination = function () {
      let pageDivPrefab = '<li class="page-item"><a class="page-link" data-page="{PAGE}" href="#">{PAGE}</a></li>';
      let firstPageDiv = '<li class="page-item"><a id="MozTopicsNextPage" class="page-link" data-page="next" href="#"><i class="fa fa-chevron-right"></i></a></li>'
      let nextPageDiv = '<li class="page-item"><a id="MozTopicsNextPage" class="page-link" data-page="next" href="#"><i class="fa fa-chevron-right"></i></a></li>'
      let $paginatonList = $('#MozTopicsPageIndex .pagination');
      let pageCount = Math.ceil(this.$listItems.length / 10);
      for (let i = 1; i < pageCount; i++) {
        let pageIndex = i + 1;
        $paginatonList.append( pageDivPrefab.replaceAll('{PAGE}', pageIndex.toString() ) );
      }
      $paginatonList.append(nextPageDiv);
    }

    this.paginate = function () {
      // hide pagination & go back
      if (this.activeFilter) {
        this.$pagination.addClass('d-none');
        return;
      }
      // else
      this.$pagination.removeClass('d-none');
      let visibleItems = this.$listItems.not('.d-none');

      let startIndex;
      if (this.currentPage === 1) {
        startIndex = 0;
      } else {
        startIndex = (_this.currentPage - 1) * _this.itemsPerPage;
      }
      let stopIndex = startIndex + this.itemsPerPage;

      visibleItems.each(function (index) {
        if (index >= startIndex && index <= stopIndex) {
          // is within the filter
        } else {
          $(this).addClass('d-none');
        }
      })
    }

    /**
     * Click event for the alphabetical index
     */
    $(document).on('click', '#MozTopicsAlphabeticIndex .page-link', function (e) {
      e.preventDefault();
      // pagination class
      $('#MozTopicsAlphabeticIndex .page-link').removeClass('active');
      $(this).addClass('active');
      // loop
      let charAttribute = $(this).data('char');
      if (charAttribute) {
        console.log(charAttribute);
        if (charAttribute === 'all') {
          _this.activeFilter = null;
          _this.$listItems.removeClass('d-none');
        } else {
          _this.activeFilter = charAttribute;
          _this.$listItems.addClass('d-none');
          $('.' + _this.fcClass + charAttribute).removeClass('d-none');
        }

      }

      _this.changeEvent();
    })

    $(document).on("click", "#MozTopicsPageIndex .page-link", function (e) {
      e.preventDefault();
      _this.$listItems.removeClass('d-none');
      $('#MozTopicsPageIndex .page-link').removeClass('active');

      _this.setPaginationUI(this);

      _this.paginate();
    })
  }

  let mozTopics = new MozTopics();
  mozTopics.init('.moz-topics__list > ul');
})
