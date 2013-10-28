RunForLifeApp.factory('gamesData', function($http, $log, $filter)  {
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
        },
        getGameById: function(id,callback){
            console.log(id);
            $http.get('/dummyData/Games.json')
                .success(function(data) {
                    // prepare data here
                    var game = $filter('filter')(data, { "id" : id})[0];
                    callback(game);
                });
        }
    };
});