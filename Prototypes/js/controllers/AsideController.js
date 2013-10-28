RunForLifeApp.controller('AsideController', function GamesController($scope, asideData) {
  asideData.getOptions(function(data){
    $scope.aside=data;
  });
});