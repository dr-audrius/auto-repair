var carCtrl = function ($scope, $http, $location, $routeParams) {
    $scope.customers = [];
    $scope.allcustomers = [];
    $scope.customerToEdit = {};
    $scope.carRepairs = {};
    $scope.cars = [];
    $scope.editMode = true;
    $scope.username = "angular";
    $scope.dis = true;

    var scope = $scope;
    var check_toastr = toastr;

    $scope.car_id = $routeParams.carId;

    var api_url = "http://localhost:4300/";

    $scope.checkCar = function (customerId) {
        $http({
            method: "GET",
            url: "http://localhost:4300/cars/check/" + customerId
        }).then(function successCallback(res) {
            $scope.allcustomers = res.data;
            allInfo = $scope.allcustomers.slice(0);
            plateInfo = allInfo.map(function (item) { return item["plate_number"]; });
            $scope.occupied = plateInfo.includes(customerId)
        }, function failureCallback(res) {
            $scope.errorMsg = res.statusText;
        });
    };

    $scope.addCar = function (car) {
        $http({
            method: "POST",
            url: "http://localhost:4300/cars/add",
            data: JSON.stringify(car)
        }).then(function successCallback(res) {
            if (res.data === 'success') {
                $location.path("/cars");
            }
        }, function failureCallback(res) {
            $scope.errorMsg = res.statusText;
        });
    };

    $scope.deleteCar = function (carId) {
        debugger;
        $http({
            method: "GET",
            url: " http://localhost:4300/cars/delete/" + carId
        }).then(function successCallback(res) {
            $location.path("/");
        }, function failureCallback(res) {
            $scope.errorMsg = res.statusText;
            toastr.error('data.sqlState: ' + res.data.sqlState + ' data.code: ' + res.data.code, 'Error message: ');
        });
    };

    $scope.getCars = function () {
        var onCarComplete = function (response) { $scope.cars = response.data; }
        var onError = function (reason) { $scope.errorMsg = reason.statusText; }
        $http.get(api_url + "cars").then(onCarComplete, onError);
    };

    $scope.showRepairInfoByCarId = function (id) {
        var onRepairInfoComplete = function (response) {

            $scope.carRepairs = response.data.repair_data;
            $scope.car_make = response.data.car_make;
            $scope.car_model = response.data.car_model;

            console.log('Response DATA', response.data);
            console.log('Response CAR MAKE', $scope.car_make);
            console.log('Response CAR MODEL', $scope.car_model);
        }
        var onError = function (reason) { $scope.errorMsg = reason.statusText; }
        $http.get(api_url + "car_repairs/show/" + id).then(onRepairInfoComplete, onError);
    };

    $scope.updateRepairInfoByRepairId = function (carRepair) {
        var onRepairInfoComplete = function (response) {
            $scope.updatedRepairData = response.data;
            $scope.showRepairInfoByCarId($scope.car_id);
            scope.changeMode(carRepair);
            console.log('Updated single repair info with id' + ' of selected car', $scope.updatedRepairData);
        }
        var onError = function (reason) {
            $scope.errorMsg = reason.statusText;
            toastr.error('SQL:', reason.data.sqlState);
        }
        var data = JSON.stringify(carRepair);
        $http.post(api_url + "car_repair/update/" + carRepair.repair_id, data).then(onRepairInfoComplete, onError);
    };

    $scope.changeMode = function (item) {
        item.editMode = !item.editMode;
    };

    $scope.addNewRepairInfo = function (carRepair) {
        carRepair.car_id = $scope.car_id;

        var onAddingRepairInfoComplete = function (response) {
            $scope.addedRepairData = response.data;
            console.log('Updated single repair info with id' + ' of selected car', $scope.updatedRepairData);

            scope.changeMode(carRepair);
            $scope.showRepairInfoByCarId($scope.car_id);
        }
        var onError = function (reason) {
            $scope.errorMsg = reason.statusText;
            toastr.error('SQL:', reason.data.sqlState);
        }

        var data = JSON.stringify(carRepair);
        $http.post(api_url + "car_repair/add/", data).then(onAddingRepairInfoComplete, onError);

        console.log('Inside addNewRepairInfo');
        console.log(carRepair);
    }

    $scope.removeRepairFromList = function (carRepair) {
        // $scope.carRepairs.slice(-1,1)
        $scope.carRepairs.pop();
    }

    $scope.addNewRepairGeneral = function (carRepair) {
        var preventAddingRepair = false;
        angular.forEach($scope.carRepairs, function (carRepair, key) {

            if (carRepair.newRepair && carRepair.editMode) {
                preventAddingRepair = true;
            }

        });

        if (!preventAddingRepair) {

            $scope.carRepairs.push({
                'repair_id': "",
                'car_id': "",
                'repair_date': "",
                'repaired_part': "",
                'comments': "",
                'editMode': false,
                'newRepair': true
            });

        }

        else {

            console.log('Save an item before adding new repair');

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "700",
                "timeOut": "0",
                "extendedTimeOut": "500",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"

            }
            toastr.warning('Save an item before adding new repair', 'Warning.');
        }
    };

    $scope.deleteRepairInfoByRepairId = function (carRepair) {

        var car_id = $scope.car_id;

        var onRepairInfoDelete = function (response) {
            $scope.deletedRepairData = response.data;
            console.log('Updated single repair info with id' + ' of selected car', $scope.updatedRepairData);
            $scope.showRepairInfoByCarId(car_id);
        }
        var onError = function (reason) { $scope.errorMsg = reason.statusText; }

        var data = JSON.stringify(carRepair);
        $http.post(api_url + "car_repair/delete/" + carRepair.repair_id, data).then(onRepairInfoDelete, onError);
    };


    $scope.test = function (item) {
        console.log(item.editMode);
        console.log($resource);
    };

    $scope.personalDetails = [
        {
            'fname': 'name 1',
            'lname': 'suname 1',
            'email': 'email1@e.com'
        },
        {
            'fname': 'name 2',
            'lname': 'suname 2',
            'email': 'email2@e.com'
        },
        {
            'fname': 'name 3',
            'lname': 'suname 3',
            'email': 'email3@e.com'
        }];

    $scope.addNew = function (personalDetail) {
        $scope.personalDetails.push({
            'fname': "",
            'lname': "",
            'email': "",
        });


    };

    $scope.remove = function () {
        var newDataList = [];
        $scope.selectedAll = false;
        angular.forEach($scope.personalDetails, function (selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        $scope.personalDetails = newDataList;
    };

    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }
        angular.forEach($scope.personalDetails, function (personalDetail) {
            personalDetail.selected = $scope.selectedAll;
        });
    };

    $scope.cancelAdd = function () {
        $location.path("/cars");
    };

    $scope.init = function () {

        var full = $routeParams;
        var customerId = $routeParams.customerId;
        var operation = $routeParams.operation;
        var carId = $routeParams.carId;

        // // if (operation === 'edit') {
        // //     $scope.getCustomerById(carId);
        // // } else if (operation === 'delete') {
        // //     $scope.deleteCustomer(carId);
        // // } else if (operation === 'check') {
        //     $scope.checkCustomer(customerId);
        // } else 
        if (operation === 'show') {
            $scope.showRepairInfoByCarId(carId);
        } else {
            $scope.getCars();
        }
    };

    $scope.init();

    $scope.test = function () {

        angular.forEach($scope.carRepairs, function (carRepair, key) {
            if (carRepair.newRepair) {
                carRepair.editMode = false;
                if (($scope.carRepairs.length - 1) == key) {
                    carRepair.editMode = true;
                    console.log('test function:' + carRepair);
                }
            }
        });
    }
};

app.controller('carCtrl', ["$scope", "$http", "$location", "$routeParams", carCtrl]);

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
    }
});
