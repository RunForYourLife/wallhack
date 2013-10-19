var RunForLifeApp = angular.module('RunForLifeApp', []);
 
RunForLifeApp.controller('MainController', function MainController($scope) {
  $scope.buttons = [
    {'name': 'Crea Tu Perfil'}
  ];
});

RunForLifeApp.controller('PerfilController', function PerfilController($scope) {
  $scope.fields = [
    {'name': 'Crea Tu Perfil'}
  ];
});

RunForLifeApp.controller('AsideController', function AsideController($scope) {
  $scope.games = [
    {'name': 'Run for your life'}
  ];
});


