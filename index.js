
$(document).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();

    $("#weather-header").click(toggleTemp);

    getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    // function showPosition(position) {
    //     console.log( "Latitude: " + position.coords.latitude, "Longitude: " + position.coords.longitude);
    //     successCallback(position);
    // }

    function displayLocation(latitude,longitude)    {

        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200)    {
                var data = JSON.parse(request.responseText);
                //alert(request.responseText); // check under which type your city is stored, later comment this line
                var addressComponents = data.results[0].address_components;
                for(i=0;i<addressComponents.length;i++) {
                    var types = addressComponents[i].types
                    //alert(types);
                    if(types=="locality,political") {
                        //alert(addressComponents[i].long_name); // this should be your city, depending on where you are
                        console.log("City",addressComponents[i].long_name);
                        var city = addressComponents[i].long_name;
                    }
                    if ( types == "country,political") {
                        console.log("Country Code", addressComponents[i].short_name );
                        var country =  addressComponents[i].short_name;
                    }
                }
                //alert(address.city.short_name);
                getWeather(city,country);
            }
        };
        request.send();
    };

    function successCallback (position) {
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        displayLocation(x,y);
    }

    function getWeather(city, country) {
        $.simpleWeather({
            location: city + ", " + country,//'Buenos Aires, AR',
            woeid: '',
            unit: 'c',
            success: function(weather) {
                var html = '';

                html += '<div id="tooltiper" class="col-md-6 col-md-offset-3 hvr-fade text-center" data-placement="auto left" data-toggle="tooltip" title="Click to change unit!">';
                // html += '</div>';
                // html += '<div class="col-md-6 hvr-fade ">'
                html += '<p class="weather-header-temp" id="celcius">'+weather.temp+' °C</p>';
                var x = parseInt(weather.temp) * 9 / 5 + 32;
                html += '<p class="weather-header-temp hidden" id="freedom">'+Math.round(x)+' °F</p>';
                // html += '<p ><div id="weather-header-currently">'+weather.currently+'</div></p>';
                html += '</div>'
                html += '<div class="col-md-3" ><img id="weather-image" src="'+weather.image+'"  /></div>';
                $("#weather-header").html(html);


                html = '<div class="col-md-6">';
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

                html = '<div class="col-md-6">';
                html += '<table class="table table-hover">';
                html += '<thead><tr><th colspan="4"  class="text-center" >Forecast</th></tr></thead>';
                html += '<tbody>';
                weather.forecast.forEach( function(e,i) {
                    if ( i>4) {
                        return;
                    }
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

                $("#weather").removeClass("hidden");
                $("#loader").addClass("hidden");
                $('#tooltiper').tooltip("show");
            },
            error: function(error) {
                $("#weather").html('<p>'+error+'</p>');
            }
        });
    }


    function toggleTemp() {
        if ( $("#freedom").hasClass("hidden") ) {
            //Convert Freddom to Celcius
            $("#celcius").addClass("hidden");
            $("#freedom").removeClass("hidden");
        }
        else {
            //Convert Celcius to Freedom
            $("#celcius").removeClass("hidden");
            $("#freedom").addClass("hidden");
        }
    }
});

