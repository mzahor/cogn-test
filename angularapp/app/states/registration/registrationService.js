module.exports = function(ngModule) {
    var inject = ['$httpBackend', '$q', '$timeout'];
    var factory = function($httpBackend, $q, $timeout) {
        // this service should contain business logic 
        // related to user registration
        var registeredUsers = [];

        function registerUser(userInfo) {
            var deferred = $q.defer();

            $timeout(function() {
                registeredUsers.push(userInfo);
                deferred.resolve();
            }, 1000);

            return deferred.promise;
        };

        return {
            registerUser: registerUser,
            registeredUsers: registeredUsers
        }
    };

    factory.$inject = inject;
    ngModule.factory('registrationService', factory);
}
