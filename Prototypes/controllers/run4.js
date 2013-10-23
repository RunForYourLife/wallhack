var RunForLifeApp = angular
  .module('RunForLifeApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider){

      $locationProvider.html5Mode(false);

      $routeProvider
        .when('/Games/:gameId', {
          controller: 'GameDetailsController'
        });
  });


RunForLifeApp.controller('GamesController', function GamesController($scope) {
  $scope.games = [
    {'id' : 1,
     'name': 'Run for your life',
     'description': 'asdfas dasdf asdf asdf asdf '},
    {'id' : 2,
     'name': 'The Farm',
     'description': 'asdf asdf asd fasd f'},
    {'id' : 3,
     'name': 'Your mum trains with you',
     'description': 'asdf asd fasd fasd fasd fasd fasdf'}
  ];
});

RunForLifeApp.controller('GameDetailsController', function GameDetailsController($scope, $routeParams) {
  $scope.params = $routeParams;
  $scope.name =  'Run for your life';
  $scope.description =  'asdfas dasdf asdf asdf asdf';
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

