(function ( $, window) {
  
  
  var _super = $.fn.modal;
  
  // create a new constructor
  var ModalMap = function(element, options) {
     // call the original constructor
    _super.Constructor.apply( this, arguments );
  };
  
  ModalMap.DEFAULTS = $.extend({}, _super.Constructor.DEFAULTS, {
    defaultMaxHeight: 300, 
    map: {
      zoom: 15
      // mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  });
  
  var $mapElement, map, marker;
  
  // extend prototypes and add a super function
  ModalMap.prototype = $.extend({}, _super.Constructor.prototype, {
    constructor: ModalMap,
    _super: function() {
      var args = $.makeArray(arguments);
      _super.Constructor.prototype[args.shift()].apply(this, args);
    },
    show: function() {
      // do custom method stuff
      var options = this.options;
      
      var $modalBody = this.$element.find(".modal-body");
      
      var latLng = new google.maps.LatLng(options.latitude, options.longitude);
      
      this.$element.css('display', 'block');
      var $modalTitle = this.$element.find(".modal-title");
      $modalTitle.html(options.title);
      
      $modalBody.html("");
      if (!$mapElement) {
        this.$mapElement = $mapElement = $('<div class="modal-map-element"></div>');
      };
      $modalBody.append($mapElement);
      
      if (!map) {
        this.map = map = new google.maps.Map($mapElement[0], options.map);
      }
      map.setCenter(latLng);
      if (marker) {
        marker.setMap(null);
      }
      
      var markerOptions = {
        position: latLng,
        map: map
      };
      
      if (options.title) {
        markerOptions.title = options.title;
      }
      marker = new google.maps.Marker(markerOptions);
      
      // call the original method
      this._super('show');
      var delegate = this;
      $(window).on('resize', this._resizeDelegate = function() {
        delegate.resize();
      });
      this.resize();
    }, 
    
    hide: function() {
      $(window).off('resize', this._resizeDelegate);
      this._super('hide');
    }, 
    
    resize: function() {

      var $modalDialog = this.$element.find('.modal-dialog');
      var $modalBody = this.$element.find('.modal-body');
      
      $modalBody.css('max-height', '');
      var maxHeight = parseFloat($modalBody.css('max-height'));
      if (isNaN(maxHeight)) {
        maxHeight = this.options.defaultContentHeight;
        $modalBody.css('max-height', maxHeight + "px");
      }
      
      var h = $(window).height();
      var fh = this.$element.find('.modal-footer').outerHeight(false);
      var hh = this.$element.find('.modal-header').outerHeight(false);
      var mt = parseFloat($modalDialog.css('margin-top')) + parseFloat($modalDialog.css('border-top-width'));
      var mb = parseFloat($modalDialog.css('margin-bottom')) + parseFloat($modalDialog.css('border-bottom-width'));
      var bh = h - mt - mb - fh - hh;
      $modalBody.outerHeight(bh);
      
      this.$mapElement.outerHeight($modalBody.height());
      
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center); 
    }
  });

  
  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, ModalMap.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if (!data) $this.data('bs.modal', (data = new ModalMap(this, options)));
      else data.options = $.extend({}, data.options, option);
      if (typeof option == 'string') data[option](_relatedTarget);
      else if (options.show) data.show(_relatedTarget);
    });
  }

  $.fn.modalMap = Plugin;
  $.fn.modalMap.Constructor = ModalMap;
  
  $(document).on('click.bs.modal.data-api', '[data-toggle="modal-map"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); // strip for ie7
    option = $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

    if ($this.is('a')) e.preventDefault();

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus');
      });
    });
    
    Plugin.call($target, option, this);
  });

})(jQuery, window);
