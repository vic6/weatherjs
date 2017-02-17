$(document).ready(function() {
});

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
      // debugger
      html = '<h2>'+title+'</h2>';
      html += '<ul><li>'+"Today - " + description+'</li>';
      html += '<h2>'+temp+'&deg;'+'</h2>';



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
