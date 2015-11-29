describe('registration page', function() {
    var element,
        $rootScope,
        $compile,
        $timeout,
        scope,
        isoScope;

    var loadModules = function() {
        angular.mock.module('app.registration');
    };

    var createElement = function(menuItems) {
        scope = $rootScope.$new();
        element = angular.element(
            '<registration></registration>');
        $compile(element)(scope);
        scope.$digest();
        isoScope = element.data().$isolateScope;
    }

    var initDirective = function() {
        inject(function(_$compile_, _$rootScope_, _$timeout_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $timeout = _$timeout_;
        });
    };

    beforeEach(function() {
        loadModules();
        initDirective();
    });

    it('should be rendered', function() {
        createElement();
        expect(element.find('form')).to.have.length(1);
    });

    it('not should not validate input until submit clicked', function() {
        createElement();
        expect(element.find('ng-messages')).to.have.class('ng-hide');
        element.find('button').click();
        scope.$digest();
        expect(element.find('ng-messages')).not.to.have.class('ng-hide');
    });

    it('should not show success panel until submitted', function() {
        createElement();
        isoScope.user = {
            fullName: 'TestUser',
            dateOfBirth: '11/11/2011',
            sex: 'male'
        };
        expect(element.find('.panel-success')).to.have.class('ng-hide');

        element.find('button').click();
        $timeout.flush();
        expect(element.find('.panel-success')).not.to.have.class('ng-hide');
    });

    it('should hide form after registration', function() {
        createElement();
        isoScope.user = {
            fullName: 'TestUser',
            dateOfBirth: '11/11/2011',
            sex: 'male'
        };
        expect(element.find('form')).not.to.have.class('ng-hide');

        element.find('button').click();
        $timeout.flush();
        expect(element.find('form')).to.have.class('ng-hide');
    });
});
