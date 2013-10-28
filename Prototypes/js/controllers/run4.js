var RunForLifeApp = angular
  .module('RunForLifeApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider){

      $locationProvider.html5Mode(false);

      $routeProvider
        .when('/Games/:gameId', {
          controller: 'GameDetailsController'
        });
  });






RunForLifeApp.controller('InitialWin', function InitialWin($scope) {
  $scope.buttons = [
    {'name': 'Crea Tu Perfil'}
  ];
});

RunForLifeApp.controller('SignUpForm', function PerfilController($scope) {
  $scope.fields = [
    {'name': 'Crea Tu Perfil'}
  ];
});

