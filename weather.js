$(document).ready(function() {
});


// $(document).ready(function() {
//   $.simpleWeather({
//     location: 'Austin, TX',
//     woeid: '',
//     unit: 'f',
//     success: function(weather) {
//       html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
//       html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
//       html += '<li class="currently">'+weather.currently+'</li>';
//       html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
//
//       $("#weather").html(html);
//     },
//     error: function(error) {
//       $("#weather").html('<p>'+error+'</p>');
//     }
//   });
// });

var getWeather = function() {
  var location = $('#srch-term').val();
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

  $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json', function(data) {
    if (data.query.results === null) {
      $('.media-heading').text("Location not Found");
    } else {
      var forecast = data.query.results.channel.item.forecast;
      var temp = data.query.results.channel.item.condition.temp;
      var description = data.query.results.channel.item.condition.text;
      var image = data.query.results.channel.item.description;
      var title = data.query.results.channel.title;
      var high
      var low

      // debugger

      html = '<h2>'+title+'</h2>';
      html += '<h2>'+temp+'&deg;'+'</h2>';

      html += '<ul><li>'+description+'</li>';


      // html += '<li class="currently">'+forecast+'</li>';
      $('.media-heading').text(location);
      $('#media').attr('src', image.match(expression)[0]);
      for(day in forecast) {
        // debugger
        html += '<li>'+ forecast[day].date + '- ' + forecast[day].text + ' High/Low: ' + forecast[day].high + '/' + forecast[day].low + '</li>';

      }
      $('#weather').html(html);
    }
  });
};
