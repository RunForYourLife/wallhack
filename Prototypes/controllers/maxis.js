var RunForLifeApp = angular.module('RunForLifeApp', []);
 
RunForLifeApp.controller('MainController', function MainController($scope) {
  $scope.games = [
    {'name': 'Run for your life'}
  ];
});

RunForLifeApp.controller('PerfilController', function PerfilController($scope) {
  $scope.games = [
    {'name': 'Crea Tu Perfil'}
  ];
});

RunForLifeApp.controller('AsideController', function AsideController($scope) {
  $scope.games = [
    {'name': 'Run for your life'}
  ];
});


