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