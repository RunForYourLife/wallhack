RunForLifeApp.factory('gamesData', function($http, $log)  {
    return {
        getGames: function(successcbk){
            $http({method:'GET', url:'/dummyData/Games.json'}).
                success(function(data,status,headers,config){
                    $log.warn(data);
                    successcbk(data);
                }).
                error(function(data,status,headers,config){
                    $log.warn(data,status,headers,config);
                });
        }
    };
});