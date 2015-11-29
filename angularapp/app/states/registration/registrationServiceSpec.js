describe('registration service', function() {
    var $timeout,
        registrationService;

    beforeEach(function() {
        angular.mock.module('app.registration');
        inject(function(_registrationService_, _$timeout_) {
            $timeout = _$timeout_;
            registrationService = _registrationService_;
        });
    });

    it('should exist', function() {
        expect(registrationService).to.exist;
    });

    it('should be empty when created', function() {
        expect(registrationService.registeredUsers).to.be.empty;
    });

    it('should register users', function() {
        registrationService.registerUser({
            fullName: 'TestUser'
        });
        $timeout.flush();
        expect(registrationService.registeredUsers[0].fullName).to.equal('TestUser');
    });
});
