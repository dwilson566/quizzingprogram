var myModule = angular.module('WeatherApp', []);

myModule.controller("WeatherController", ['$scope', '$http', 'weatherService',
            function($Scope, $http, weatherService) {
                var wc = this;

                var cities = [{
                    Name: 'Amarillo',
                    Temperature: 0,
                    lat: 0,
                    long: 0,
                    url_name: 'Amarillo',
                    state: "TX"
                }, {
                    Name: 'Honolulu',
                    Temperature: 0,
                    lat: 0,
                    long: 0,
                    url_name: 'Honolulu',
                    state: "Hawaii"
                }, {
                    Name: 'Los Angeles',
                    Temperature: 0,
                    lat: 0,
                    long: 0,
                    url_name: 'Los_Angeles',
                    state: "California"
                }, {
                    Name: 'New York',
                    Temperature: 0,
                    lat: 0,
                    long: 0,
                    url_name: 'New_York',
                    state: "New_York"
                }];
            
            
            ///Notes_________________----------------------__________________-----------------
            
            ///Weather Service Direcitve
            
            myModule.directive('myConditions',function(){
                return {
                    restrict: 'E',
                    scope: true,
                    templateUrl: 'currentCondition.html'
                }
            });
                
                //uses the weather service to obtain  the current conditons
                wc.currentCondition = function() {
                    weatherService.getCurrentConditions(wc.selected_city)
                        .success(function(data) {

                            var google_static_map_key = "";

                            wc.weather = data.current_observation;
                            wc.city = wc.weather.display_location.city;
                            wc.temperature_string = wc.weather.temperature_string;

                            wc.google_static_map_key = "https://maps.googleapis.com/maps/api/staicmap?center=" +
                                wc.weatehr.observation_location.latitude + "," +
                                wc.weather.observation_location.longitude +
                                "&zoom =10&size=600x300&key=" +
                                google_static_map_key;
                        });

                };

                
                myModule.factory('weatherService', [$http, function($http) {
                    //factory allows us to specify an object to send back
                    var weatherService = {};

                    //weather underground API Key
                    var key = "123456789";

                    //get current rest conditons
                    weatherService.getCurrentConditions = function(city) {

                        //for api
                        var url = "https://api.wunderground.com/api/" +
                            key + "/condtions/q/" +
                            city.state + "/" +
                            city.url_name + ".json" + "?callback=JSON_CALLBACK"; //CORS Cross origin rescearch

                        console.log(url);

                        return $http.jsonp(url);}


                        return weatherService;

                    }]
                    

                }]);