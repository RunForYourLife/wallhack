RunForLifeApp.factory('asideData', function($http, $log)  {
    return {
        getOptions: function(successcbk){
            $http({method:'GET', url:'/dummyData/Aside.json'}).
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