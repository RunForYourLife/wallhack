RunForLifeApp.controller('GamesController', function GamesController($scope, gamesData) {
  gamesData.getGames(function(data){
    $scope.games=data;
  });
});