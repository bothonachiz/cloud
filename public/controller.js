angular.module('posApp', [])
  .controller('posCtrl', function ($scope, $http) {
    $scope.test = 'kuy ton'

    $scope.testClick = function () {
      $http.post('/readvalue', {name: 'bothon'}).success(function (req, res) {
        console.log(req)
      })
    }
  })
