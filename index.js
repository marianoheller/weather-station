// v3.1.0
//Docs at http://simpleweatherjs.com
$(document).ready(function() {
    $.simpleWeather({
        location: 'Austin, TX',
        woeid: '',
        unit: 'c',
        success: function(weather) {
            var html = '';
            console.log(weather);

            html = '<div>'
            html += '<img src="'+weather.image+'" class="" />';
            html += '<p>'+weather.temp+' C</p>';
            html += '<p>'+weather.currently+'</p>'
            html += '</div>'
            $("#weather-header").html(html);


            html = '<div>';
            html += '<table class="table table-hover">';
            html += '<thead><tr><th colspan="2"  class="text-center" >Details</th></tr></thead>';
            html += '<tbody>';
            html+= '<tr><td>Low</td><td>'+weather.low+'</td></tr>';
            html+= '<tr><td>High</td><td>'+weather.high+'</td></tr>';
            html+= '<tr><td>humidity</td><td>'+weather.humidity+'</td></tr>';
            html+= '<tr><td>pressure</td><td>'+weather.pressure+'</td></tr>';
            html+= '<tr><td>sunrise</td><td>'+weather.sunrise+'</td></tr>';
            html+= '<tr><td>sunset</td><td>'+weather.sunset+'</td></tr>';
            html+= '<tr><td>visibility</td><td>'+weather.visibility+'</td></tr>';
            html += '</tbody></table>';
            html += '</div>';
            $("#weather-details").html(html);

            html = '<div>';
            html += '<table class="table table-hover">';
            html += '<thead><tr><th colspan="3"  class="text-center" >Forecast</th></tr></thead>';
            html += '<tbody>';
            weather.forecast.forEach( function(e) {
                html+= '<tr>';
                html += '<td>'+e.day+'</td>';
                html += '<td>'+e.low+'</td>';
                html += '<td>'+e.high+'</td>';
                html += '<td><img src="'+e.thumbnail+'"/></td>';
                html += '</tr>';
            });
            html += '</tbody></table>';
            html += '</div>';
            $("#weather-forecast").html(html);

        },
        error: function(error) {
        $("#weather").html('<p>'+error+'</p>');
        }
    });
});
