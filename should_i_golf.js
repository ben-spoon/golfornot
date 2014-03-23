$(document).ready(function() {
$('.go').click(function() {
    var z = $('.zip').val();
    getWeather(z);
});



function getWeather(zip) {
    $.ajax({
      url : "http://api.wunderground.com/api/6acab691999af9a6/geolookup/conditions/q/"+zip+".json",
      dataType : "jsonp",
      success : function(data) {

        var details = {};

        details.city    = data['location']['city'];
        details.temp    = data['current_observation']['temp_f'];
        details.weather = data['current_observation']['weather'];
        details.wind    = data['current_observation']['wind_mph'];

        $('#answer').text(decide(details));

        $.each(details, function(key, value) {
           $('#details').append('<li class="'+key+'">'+key+': '+value+'</li>');
        });

      },
      error : function(message) {
        alert(message);
      }
    });
}

function decide(details){
  answer = 'No';

  

  return answer;
}


});

