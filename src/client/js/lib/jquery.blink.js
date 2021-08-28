(function($){

  $.fn.blink = function(options) {
    var defaults = { delay:250, color:'transparent', count:-1 };
    var options = $.extend(defaults, options);

    return this.each(function(){
      var obj = $(this);
      if ( obj.attr('timerid')>0 ) return;
      obj.attr('count', options.count);
      obj.attr('blinkOn', 1);
      obj.css('background', options.color);
      var timerid = setInterval(function(){
        if ( obj.attr('count')==0 ) {
          clearInterval(obj.attr('timerid'));
          timerid = 0;
          obj.attr('blinkOn', 0);
          obj.attr('timerid', 0);
          obj.css('background', '');
        }
        if ( obj.attr('blinkOn')>0 ) {
          obj.fadeTo(options.delay, 0.3);
          obj.attr('blinkOn', 0);
        }
        else {
          obj.fadeTo(options.delay, 1);
          obj.attr('blinkOn', 1);
        }
        var count = parseInt(obj.attr('count'));
        if ( count!=-1 ) obj.attr('count', count-1);
      }, options.delay);
      obj.attr('timerid', timerid);
    });
  }

  $.fn.unblink = function(options) {
    return this.each(function(){
      var obj = $(this);
      if ( obj.attr('timerid')>0 ) {
        obj.attr('count', 0);
      }
    });
  }

}(jQuery));