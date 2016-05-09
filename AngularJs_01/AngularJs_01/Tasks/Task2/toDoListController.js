Date.prototype.toJSONLocal = (function () {
    function addZ(n) {
        return (n < 10 ? '0' : '') + n;
    }
    return function () {
        return this.getFullYear() + '-' +
               addZ(this.getMonth() + 1) + '-' +
               addZ(this.getDate()) + 'T' +
               addZ(this.getHours()) + ':' +
               addZ(this.getMinutes());
    };
}());

var toDoList = angular.module("toDoList", []).directive('focus',
        function ($timeout) {
            return {
                scope: {
                    trigger: '@focus'
                },
                link: function (scope, element) {
                    scope.$watch('trigger', function (value) {
                        if (value === "true") {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        });

toDoList.controller("toDoListController", function ($scope) {
    $scope.readData = todoModel.read();

    $scope.clickHandlerAdd = function () {
        todoModel.addItem($scope.name, $scope.dateTime, $scope.description, $scope.completed);
        todoModel.save();
        $scope.name = '';
        $scope.description = '';
        $scope.completed = false;
    };

    $scope.onBlurHandler = function (id, data) {
        todoModel.updateItem(id, data);
        todoModel.save();
        $scope.selectedNameRowId = undefined;
        $scope.selectedDescriptionRowId = undefined;
    };

    $scope.clickHandlerDelete = function (id) {
        todoModel.removeItem(id);
        todoModel.save();
    };

    $scope.clickHandlerEdit = function (id, num) {
        switch (num) {
            case 0:
                $scope.selectedNameRowId = id;
                $scope.selectedDescriptionRowId = undefined;
                break;
            case 1:
                $scope.selectedDescriptionRowId = id;
                $scope.selectedNameRowId = undefined;
                break;
        }
    };

    $scope.clickHandlerShowDescription = function (show) {
        if (show == 'Show description') {
            $scope.url = "_descriptionPartial.html";
            $scope.showDescription = 'Hide description';
            $scope.showDescriptionClass = true;
        }
        else {
            $scope.url = undefined;
            $scope.showDescription = 'Show description';
            $scope.showDescriptionClass = false;
        }
    };

    var currentDate = new Date();
    $scope.dateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes());
    $scope.name = '';
    $scope.description = '';
    $scope.completed = false;
    $scope.selectedNameRowId = undefined;
    $scope.selectedDescriptionRowId = undefined;
    $scope.showDescription = 'Show description';
    $scope.showDescriptionClass = false;
});