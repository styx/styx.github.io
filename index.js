$(document).ready(function() {
  $('#open-timepicker').ztimep({
    hour: '3',
    ampm: 'am',
    duration: false,
    clickEvents: {
      onSave: function(h, m, ampm) {
        console.log(h, ':', m, ampm);
      }
    }
  })
});
