$(function () {
$('.go').click(function() {
    var z = $('.zip').val();
    getWeather(z);
});
$('.zip').keypress(function (e) {
    if(e.keyCode == 13) {
        var z = $('.zip').val();
        getWeather(z);
    }




function getWeather(zip) {
  $('.details li span').text('');

  if (zip.length < 5 || zip.length > 5) {
    $('#answer').text('Invalid Zip');
  } else {
    var api_key = '6acab691999af9a6';
    $.ajax({
      url : "http://api.wunderground.com/api/"+api_key+"/geolookup/conditions/q/"+zip+".json",
      dataType : "jsonp",
      success : function(data) {


        var details = {};

        details.City    = data['location']['city'];
        details.Temperature    = data['current_observation']['temp_f'] + '&deg;';
        details.Weather = data['current_observation']['weather'];
        details.Wind    = data['current_observation']['wind_string'] + ' ' + data['current_observation']['wind_gust_mph'] + ' mph';
        details.FeelsLike   = data['current_observation']['feelslike_f'];

        $('.answer').text(decide(details));
        $('.temperature span').append(details.Temperature);
        $('.location span').append(details.City);
        $('.weather span').append(details.Weather);
        $('.wind span').append(details.Wind);
        $('.heres-why').show();
        $('.icon').css('display', 'inline-block');

      },
      error : function(message) {
        alert(message);
      }
    });
  }
}

function decide(details){
    var yes    = 0,
        no     = 0;

    // Check the general conditions to see if it is clear out
    if (details.Weather.toLowerCase() != 'clear' ||
        details.Weather.toLowerCase() != 'partly cloudy' ||
        details.Weather.toLowerCase() != 'scattered clouds') {
        no++;
        yes--;
    } else {
        no--;
        yes++;
    }

    // Next check the wind gust speed
    if (details.Wind > 15) {
        no++;
        yes--;
    } else {
       no--;
       yes++;
    }

    // Check the temperature, 60 degrees and up is ok
    if (details.Temp >= 60) {
        yes++;
        no--;
    } else {
        no++;
        yes--;
    }

    /*
       Feels like is pretty important, becuase it
       takes into concideration a few things. This
       is why it carries more weight than just
       temperature alone.
    */
    if (details.FeelsLike >= 60) {
        yes = yes + 2;
        no  = no - 2;
    } else {
        no = no + 2;
        yes = yes - 2;
    }





    // First determine whether the options are even
    // If so, return maybe
    if (yes == no) {
        return 'Eh, maybe.';
    }

    // If not, get the return option with the most votes
    var answer = Math.max(yes,no);
    switch(answer){
      case yes:
        return 'I would go if I were you!';
      case no:
        return 'Not right now';
    }

}


});

});