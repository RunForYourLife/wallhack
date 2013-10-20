var RunForLifeApp = angular.module('RunForLifeApp', []);
 
RunForLifeApp.controller('GamesController', function GamesController($scope) {
  $scope.games = [
    {'name': 'Run for your life',
     'description': 'asdfas dasdf asdf asdf asdf '},
    {'name': 'The Farm',
     'description': 'asdf asdf asd fasd f'},
    {'name': 'Your mum trains with you',
     'description': 'asdf asd fasd fasd fasd fasd fasdf'}
  ];
});

RunForLifeApp.controller('GameDetailsController', function GameDetailsController($scope) {
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

