$(document).ready(function() {
$('.go').click(function() {
    var z = $('.zip').val();
    getWeather(z);
});



function getWeather(zip) {
    $.ajax({
      url : "http://api.wunderground.com/api/6acab691999af9a6/geolookup/conditions/q/"+zip+".json",
      dataType : "jsonp",
      success : function(parsed_json) {
        var location = parsed_json['location']['city'],
            temp = parsed_json['current_observation']['temp_f'],
            weather = parsed_json['current_observation']['weather'],
            wind_mph =   parsed_json['current_observation']['wind_mph'];
        if (temp > 60) {
          $('.answer').text('Yes!');
        } else {
          $('.answer').text('Nah, don\'t go');
        }
        console.log(weather);
        console.log(wind_mph);

      }
      });
}



});

