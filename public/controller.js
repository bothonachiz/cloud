angular.module('posApp', [])
  .controller('posCtrl', function ($scope, $http) {
    $scope.getData = function () {
      $http.get('/readvalue').success(function (req, res) {
        console.log(req)
        $scope.value = req
      })
    }

    $scope.addData = function (pi, pn, pp) {
      var newData = {pid: pi, pname: pn, pprice: pp}
      $http.post('/value', newData).success(function (req, res) {
        $scope.pid = $scope.pname = $scope.pprice = ''
        $scope.getData()
      })
    }

    $scope.deleteData = function (pi) {
      var deleteid = {_id: pi}
      console.log(deleteid)
      $http.delete('/value/' + pi , {params: deleteid}).success(function (req, res) {
        $scope.getData()
      })
    }

    $scope.getData()
  })
