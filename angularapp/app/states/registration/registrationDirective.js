require('./registration.less');

module.exports = function(ngModule) {
    var inject = ['$scope', 'registrationService'];

    function registrationConroller($scope, registrationService) {
        $scope.user = {
            fullName: '',
            dateOfBirth: '',
            sex: ''
        };

        $scope.submitForm = function() {
            if (!$scope.registrationForm.$valid) {
                return;
            }

            registrationService.registerUser($scope.user)
                .then(function() {
                    $scope.registered = true;
                });
        }
    };
    registrationConroller.$inject = inject;

    ngModule.directive('registration', function() {
        return {
            restrict: 'E',
            scope: {},
            template: require('./registration.html'),
            controller: registrationConroller
        }
    });
}
