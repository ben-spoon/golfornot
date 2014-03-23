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

        $('#details').find('li').remove();

        var details = {};

        details.city    = data['location']['city'];
        details.temp    = data['current_observation']['temp_f'];
        details.weather = data['current_observation']['weather'];
        details.wind    = data['current_observation']['wind_gust_mph'];
        details.feels   = data['current_observation']['feelslike_f'];

        $('#answer').text(decide(details));

        $.each(details, function(key, value) {
           $('#details').append('<li class="'+key+'"><strong>'+key+': </strong>'+value+'</li>');
        });

        $('.heres-why').show();

      },
      error : function(message) {
        alert(message);
      }
    });
}

function decide(details){
    var yes    = 0,
        no     = 0;

    // Check the general conditions to see if it is clear out
    if (details.weather.toLowerCase() != 'clear') {
        no++;
        yes--;
    } else {
        no--;
        yes++;
    }

    // Next check the wind gust speed
    if (details.wind > 10) {
        no++;
        yes--;
    } else {
       no--;
       yes++;
    }

    // Check the temperature, 60 degrees and up is ok
    if (details.temp >= 60) {
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
    if (details.feels >= 60) {
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
        return 'Go go go!';
      case no:
        return 'Not right now';
    }

}


});

