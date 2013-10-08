angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Articulos",
        "link": "articles"
    }, {
        "title": "Crea un nuevo Articulo",
        "link": "articles/create"
    }];
}]);