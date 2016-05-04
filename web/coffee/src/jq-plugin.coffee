$.fn.extend
  somePlugin: (options) ->
    settings = 
      option1: "red"
  
    settings = $.extend settings, options
  
    return @each () ->
      $(this).css
        color: settings.color
