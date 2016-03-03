var myModule = angular.Module('localStorage',[]);

myModule.controller("MainController", ['$scope', 'LocalStorage',
                    function($scope, LocalStorageService){
    var mc = this;
    
   /*c.students = [
        {
        name: "Bob Dole",
        correct: 0,
        incorrect: 0,
        },
        {
            name: "Ted Cruz",
            correct: 0,
            incorrect:0,
        },
        {
            name:"Hillary Clinton:,
            correct:0,
            inccorect:0,
        }
    ]

    */
    mc.latestData = function(){
        return LocalStorageService.getData();
    };
    
    mc.update = function(val){
        return LocalStorageService.setData(val);
    };
    //run first as above, then comment out show
    mc.update(angular.toJson(mc.students)); //write
    
    mc.students = LocalStorageService.getData(); //read
    
}]);

myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('my-storage');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});