(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  }
  else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  }
  else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  var pluginName = 'ztimep';
  var ztimepTemplate =
  "<div class='ztimep-controls'>" +
    "<div class='ztimep-header'>" +
      "<i class='fa fa-clock-o' aria-hidden='true'></i>" +
      "<div class='ztimep-header-label'>" +
        "<%= saveEnabled ? hour + ':' + min + (inNormalMode ? (' ' + ampm) : '') : '' %>" +
      "</div>" +
      "<input type='text' class='ztimep-header-input' value='<%= hour24 %>:<%= min || '00' %>' />" +
      "<button class='ztimep-close'>" +
        "X" +
      "</button>"+
    "</div>" +
    "<table class='ztimep-table' border='0' cellspacing='0' cellpadding='0'>" +
      "<thead>" +
          "<tr class='ztimep-table-header'>" +
            "<td class='table-title' colspan='2'>Hours</td>" +
            "<td class='ztimep-table-vertical-splitter'></td>" +
            "<td class='ztimep-table-vertical-splitter'></td>" +
            "<td class='table-title' colspan='2'>Mins</td>" +
          "</tr>" +
      "</thead>" +
      "<tbody>" +
        "<tr class='ztimep-table-time-row'>" +
          "<td class='ztimep-table-hour <%= hour === '1' ? 'active' : '' %>'><div>1</div></td>" +
          "<td class='ztimep-table-hour <%= hour === '2' ? 'active' : '' %>'><div>2</div></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-min <%= min === '00' ? 'active' : '' %>'><div>00</div></td>" +
          "<td class='ztimep-table-min <%= min === '05' ? 'active' : '' %>'><div>05</div></td>" +
        "</tr>" +
        "<tr>" +
          "<td class='ztimep-table-hour <%= hour === '3' ? 'active' : '' %>'><div>3</div></td>" +
          "<td class='ztimep-table-hour <%= hour === '4' ? 'active' : '' %>'><div>4</div></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-min <%= min === '10' ? 'active' : '' %>'><div>10</div></td>" +
          "<td class='ztimep-table-min <%= min === '15' ? 'active' : '' %>'><div>15</div></td>" +
        "</tr>" +
        "<tr>" +
          "<td class='ztimep-table-hour <%= hour === '5' ? 'active' : '' %>'><div>5</div></td>" +
          "<td class='ztimep-table-hour <%= hour === '6' ? 'active' : '' %>'><div>6</div></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-min <%= min === '20' ? 'active' : '' %>'><div>20</div></td>" +
          "<td class='ztimep-table-min <%= min === '25' ? 'active' : '' %>'><div>25</div></td>" +
        "</tr>" +
        "<tr>" +
          "<td class='ztimep-table-hour <%= hour === '7' ? 'active' : '' %>'><div>7</div></td>" +
          "<td class='ztimep-table-hour <%= hour === '8' ? 'active' : '' %>'><div>8</div></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-min <%= min === '30' ? 'active' : '' %>'><div>30</div></td>" +
          "<td class='ztimep-table-min <%= min === '35' ? 'active' : '' %>'><div>35</div></td>" +
        "</tr>" +
        "<tr>" +
          "<td class='ztimep-table-hour <%= hour === '9' ? 'active' : '' %>'><div>9</div></td>" +
          "<td class='ztimep-table-hour <%= hour === '10' ? 'active' : '' %>'><div>10</div></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-min <%= min === '40' ? 'active' : '' %>'><div>40</div></td>" +
          "<td class='ztimep-table-min <%= min === '45' ? 'active' : '' %>'><div>45</div></td>" +
        "</tr>" +
        "<tr>" +
          "<td class='ztimep-table-hour <%= hour === '11' ? 'active' : '' %>'><div>11</div></td>" +
          "<td class='ztimep-table-hour <%= hour === '12' ? 'active' : '' %>'><div>12</div></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-vertical-splitter'></td>" +
          "<td class='ztimep-table-min <%= min === '50' ? 'active' : '' %>'><div>50</div></td>" +
          "<td class='ztimep-table-min <%= min === '55' ? 'active' : '' %>'><div>55</div></td>" +
        "</tr>" +
        "<% if (inNormalMode) {%>" +
          "<tr class='ztimep-table-horizontal-splitter'></tr>" +
          "<tr class='ztimep-table-ampm'>" +
            "<td colspan='3' class='ztimep-table-am <%= ampm === 'am' ? 'active' : '' %>'><div>am</div></td>" +
            "<td colspan='3' class='ztimep-table-pm <%= ampm === 'pm' ? 'active' : '' %>'><div>pm</div></td>" +
          "</tr>" +
        "<% } %>" +
      "</tbody>" +
    "</table>" +
    "<div class='ztimep-save-wrapper'>" +
      "<button class='ztimep-save' <%= saveEnabled ? '' : 'disabled=disabled' %>>" +
        "Save" +
      "</button>"+
    "</div>" +
  "</div>";


  var defaults = {
    hour: null,
    min: null,
    ampm: 'am',
    duration: false,
    template: ztimepTemplate,
    clickEvents: {
      onSave: null,
    },
    targets: {
      open: 'ztimep-open',
      save: 'ztimep-save',
      close: 'ztimep-close',
      selectHour: 'ztimep-table-hour',
      selectMinute: 'ztimep-table-min',
      toManualMode: 'ztimep-header',
      headerInput: 'ztimep-header-input',
      headerLabel: 'ztimep-header-label',
      selectAm: 'ztimep-table-am',
      selectPm: 'ztimep-table-pm',
      modal: 'ztimep-controls',
    },
  };

  function ZTimeP(element, options) {
    this.element = element;

    // Merge default options with user options
    this.options = $.extend(true, {}, defaults, options);

    this.hour = this.options.hour;
    this.min = this.options.min;
    this.ampm = this.options.ampm;
    this.inManualMode = false;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  ZTimeP.prototype.init = function () {
    // Quick and dirty test to make sure rendering is possible.
    if (typeof _ === 'undefined') {
      throw new Error(
        "Underscore was not found. Please include underscore.js"
      );
    } else {
      this.compiledZTimePTemplate = _.template(this.options.template);
    }

    // Create the parent element that will hold the plugin and save it
    // for later
    $(this.element).append(
      '<a href="#" class="' + this.options.targets.open + '">Open timepicker</a>' +
      '<div class="ztimep"></div>'
    );

    this.calendarContainer = $('.ztimep', this.element);

    this.render();
    this.resize()
    this.bindEvents();
  }

  ZTimeP.prototype.bindEvents = function () {
    var data = {},
      $container = $(this.element),
      targets = this.options.targets,
      classes = this.options.classes,
      onClickEvent = (document.ontouchstart !== null)
        ? 'click'
        : 'touchstart'
      onClickEventName = onClickEvent + '.ztimep';

    // Make sure we don't already have events
    $container
      .off(onClickEventName, '.' + targets.open)
      .off(onClickEventName, '.' + targets.save)
      .off(onClickEventName, '.' + targets.selectHour)
      .off(onClickEventName, '.' + targets.selectMinute)
      .off(onClickEventName, '.' + targets.toManualMode)
      .off(onClickEventName, '.' + targets.selectAm)
      .off(onClickEventName, '.' + targets.selectPm)
      .off(onClickEventName, '.' + targets.close)
      .off('focusout.ztimep', '.' + targets.headerInput);

    $(document).off('keydown.ztimep');
    
    data = {
      context: this
    };

    $container
      .on(onClickEventName, '.' + targets.open, data, this.open)
      .on(onClickEventName, '.' + targets.save, data, this.save)
      .on(onClickEventName, '.' + targets.selectHour, data, this.selectHour)
      .on(onClickEventName, '.' + targets.selectMinute, data, this.selectMinute)
      .on(onClickEventName, '.' + targets.toManualMode, data, this.toManualMode)
      .on(onClickEventName, '.' + targets.selectAm, data, this.selectAmPm)
      .on(onClickEventName, '.' + targets.selectPm, data, this.selectAmPm)
      .on(onClickEventName, '.' + targets.close, data, this.close)
      .on('focusout.ztimep', '.' + targets.headerInput, data, this.outOfManualMode);
    
    $(document).on('keydown.ztimep', data, this.keyevent);
    $(window).resize(_.debounce(this.resize, 150));
 };

  ZTimeP.prototype.resize = function () {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      var ctx = $('.ztimep');
      var maxHeight = $(window).height() - 8;
      var maxWidth = $(window).width() - 8;
      var basePage= {
        width: ctx.width(),
        height: ctx.height(),
        scale: 1,
        scaleX: 1,
        scaleY: 1
      };
      var scaleX = 1, scaleY = 1;                      
      scaleX = maxWidth / basePage.width
      scaleY = maxHeight / basePage.height;
      basePage.scaleX = scaleX;
      basePage.scaleY = scaleY;
      basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;
      if (basePage.scale < 1) {
        var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth)/2));
        var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight)/2));
        ctx.css({'-webkit-transform' :'scale(' + basePage.scale + ')', 'left':newLeftPos + 'px', 'top':newTopPos + 'px', 'margin-top': '0px', 'margin-left': '0px'});
      } else {
        ctx.css({'top': '25%', left: '55%', 'margin-top': '-100px', 'margin-left': '-250px', '-webkit-transform' :'scale(1)'})
      }
    }
  }

  ZTimeP.prototype.keyevent = function (event) {
    var ctx = event.data.context;
    if (event.keyCode == 27) {
      ctx.close(event);
    } else if (event.keyCode == 13) {
      if (ctx.hour && ctx.min && ctx.ampm) {
        ctx.save(event);
      }
    }
  }

  ZTimeP.prototype.render = function () {
    var hour24 = (parseInt(this.hour) || 0) + (this.ampm === 'pm' ? 12 : 0);
    var data = {
      isTime: true,
      hour: this.hour,
      min: this.min,
      ampm: this.ampm,
      hour24: hour24,
      saveEnabled: this.hour && this.min && this.ampm,
      inNormalMode: !this.options.duration,
    };

    this.calendarContainer.empty();
    this.calendarContainer.html(this.compiledZTimePTemplate(data));
  };

  ZTimeP.prototype.open = function (event) {
    var ctx = event.data.context
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $(ctx.calendarContainer).css({
        width: window.innerWidth - 8,
        height: window.innerHeight - 8,
        position: "fixed",
        top: 0,
        left: 0,
        margin: 0
      });
    }
    ctx.calendarContainer.show();
  };

  ZTimeP.prototype.close = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var ctx = event.data.context;
    ctx.calendarContainer.hide();
  };

  ZTimeP.prototype.toManualMode = function (event) {
    var ctx = event.data.context;
    $('.ztimep-header-input', ctx.calendarContainer).show();
    $('.ztimep-header-label', ctx.calendarContainer).hide();
  };

  ZTimeP.prototype.save = function (event) {
    var ctx = event.data.context;
    ctx.calendarContainer.hide();
    if (ctx.options.clickEvents.onSave) {
      ctx.options.clickEvents.onSave.apply(ctx, [ctx.hour, ctx.min || '00', ctx.options.duration ? '' : ctx.ampm]);
    }
  };

  ZTimeP.prototype.selectHour = function (event) {
    var ctx = event.data.context;
    ctx.hour = $(this).text();
    ctx.render();
  };

  ZTimeP.prototype.selectMinute = function (event) {
    var ctx = event.data.context;
    ctx.min = $(this).text();
    ctx.render();
  };

  ZTimeP.prototype.selectAmPm = function (event) {
    var ctx = event.data.context;
    ctx.ampm = $(this).text();
    ctx.render();
  };

  ZTimeP.prototype.outOfManualMode = function (event) {
    var ctx = event.data.context;
    var hm = this.value.trim().split(':');

    var parsedH = parseInt(hm[0]) || 0;
    if (parsedH > 12) {
      ctx.hour = (parsedH - 12).toString();
      ctx.ampm = 'pm';
    } else {
      ctx.hour = parsedH.toString();
      ctx.ampm = 'am';
    }

    var parsedM = parseInt(hm[1]) || 0;
    ctx.min = (parsedM < 10 ? '0' : '') + parsedM.toString();

    ctx.render();
  };

  ZTimeP.prototype.destroy = function () {
    var $container = $(this.calendarContainer);
    $container.parent().data('plugin_ztimep', null);
    this.options = defaults;
    $container.empty().remove();
    this.element = null;
  };

  $.fn.ztimep = function (options) {
    var zTimePInstance;

    if (this.length > 1) {
      throw new Error("Does not support multiple elements");
    }

    if (!this.length) {
      throw new Error(
        "Cannot be instantiated on an empty selector."
      );
    }

    if (!this.data('plugin_ztimep')) {
      zTimePInstance = new ZTimeP(this, options);
      this.data('plugin_ztimep', zTimePInstance);
      return zTimePInstance;
    }

    return this.data('plugin_ztimep');
  };

}));
