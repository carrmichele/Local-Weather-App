//angular current time app//
/* global $*/
var app = angular.module('myApp', []);
app.controller('datCtrl', function($scope) {
    $scope.today = new Date();
});

//begin jQuery //
$(document).ready(function(){

	//main call for openWeatherMap.org api
    var weather = 
    $.getJSON("http://ip-api.com/json",function(data2){
      
      // find current location 
      var lat=data2.lat;
      var long= data2.lon;
       var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=68e31604dab3d14f1cbec91f6463653d'; 
    //function for coordinates
$.getJSON(api, function(data){

	//cache for info
  var cTemp;
  var kTemp;
      var tempSwap=true;
   var weatherType= data.weather[0].description;
        kTemp = data.main.temp;
       var windSpeed= data.wind.speed;
    var city = data.name;
  var country = data.sys.country;
  var icon = data.weather[0].id;
  var sunrise = data.sys.sunrise;
				var sunset = data.sys.sunset;
	//end cache
	
	
    //main temp
    fTemp = (kTemp*(9/5)-459.67).toFixed(1);
   
    //convert temp to celcius
    cTemp = (kTemp-273).toFixed(1);
      console.log(city);
	
	//location//
	
     $("#city").html(city + ' , ' + country);
	
//current weather description   
$("#weatherType").html(weatherType);
	
	//current temp//
      $("#fTemp").html(fTemp + " &#8457;");
  
//convert temp function//
	$("#fTemp").click(function(){
        if(tempSwap===false){
          $("#fTemp").html(fTemp + " &#8457;"); 
          tempSwap=true;
        }
        else{
          $("#fTemp").html(cTemp + " &#8451;");
          tempSwap=false;
        }   
      });
	
//wind speed output
windSpeed = (2.237*(windSpeed)).toFixed(1);
       $("#windSpeed").html(windSpeed + " mph" + " winds");

//current time
				var currentTime = new Date().getTime() / 1000;

			// Show Day/Night Icon based on current time
			if ( currentTime > sunrise && currentTime < sunset ) {
				$('#icon').attr('class', 'wi wi-owm-' + icon);
			} else {
				$('#icon').attr('class', 'wi wi-owm-night-' + icon);
			}
  
  });
    });
});