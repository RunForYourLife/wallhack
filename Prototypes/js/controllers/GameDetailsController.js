
RunForLifeApp.controller('GameDetailsController', 
	function GameDetailsController($scope, $routeParams, gamesData) {
		$scope.params = $routeParams;
		//getGameById($route.current.params.gameId);
		gamesData.getGameById($routeParams.gameId,function(game){
			$scope.name = game.name;
			$scope.description =  game.description;
		});
});