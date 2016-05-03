angular.module('posApp', [])
  .controller('posCtrl', function ($scope, $http) {
    $scope.getData = function () {
      $http.get('/readvalue').success(function (req, res) {
        // console.log(req)
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
      //  console.log(deleteid)
      $http.delete('/value/' + pi , {params: deleteid}).success(function (req, res) {
        $scope.getData()
      })
    }

    $scope.showData = function (pi) {
      var showid = {_id: pi}
      //  console.log(showid)
      $http.get('/readvalueIndex/' + pi , {params: showid}).success(function (req, res) {
        $scope.singlevalue = req
        $scope.newname = $scope.singlevalue[0].pname
        $scope.newprice = $scope.singlevalue[0].pprice
        $scope.editId = $scope.singlevalue[0]._id
        //  console.log($scope.singlevalue)

        $('#modal1').openModal()
      })
    }

    $scope.editData = function (pi, pn, pp) {
      var data = {_id: pi,pname: pn, pprice: pp}
      $http.put('/value', data).success(function (req, res) {
        $scope.getData()
      })
    }

    $scope.getData()
  })

  .directive('confirmationNeeded', function () {
    return {
      priority: 1,
      terminal: true,
      link: function (scope, element, attr) {
        var msg = attr.confirmationNeeded || 'Are you sure?'
        var clickAction = attr.ngClick
        element.bind('click', function () {
          if (window.confirm(msg)) {
            scope.$eval(clickAction)
          }
        })
      }
    }
  })
