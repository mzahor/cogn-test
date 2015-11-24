var callInfoDecorator = function(fn) {
    var decorated = function() {
        decorated.timesCalled++;
        decorated.args.push(Array.prototype.slice.call(arguments));
        return fn.apply(this, arguments);
    }

    decorated.timesCalled = 0;
    decorated.args = [];
    decorated.fn = fn;

    return decorated;
}

describe('interestValidator', function() {
    it('should exist', function() {
        expect(window.validateInterest).to.exist;
    });

    it('should return true for valid iterests', function(done) {
        window.validateInterest('nikon').then(function(valid) {
            expect(valid).to.be.true;
            done();
        });
    });

    it('should return false for invalid iterests', function(done) {
        window.validateInterest('invalid').then(function(valid) {
            expect(valid).to.be.false;
            done();
        });
    });
});

describe('memoize function', function() {
    it('should call underlying function only once by distinct arguments set', function() {
        var testFunc = callInfoDecorator(function() {});

        var memoizedFunc = window.memoize(testFunc);

        memoizedFunc(1);
        expect(testFunc.timesCalled).to.be.equal(1);
        memoizedFunc(1);
        expect(testFunc.timesCalled).to.be.equal(1);
        memoizedFunc('two');
        expect(testFunc.timesCalled).to.be.equal(2);
        memoizedFunc('two');
        expect(testFunc.timesCalled).to.be.equal(2);
        expect(testFunc.args).to.eql([
            [1],
            ['two']
        ]);
    });
});

describe('segments validator', function() {
    var segments;
    var validSegments;

    beforeEach(function() {
        segments = [{
            name: 'Photography',
            interests: ['nikon', 'slr', 'cannon']
        }, {
            name: 'Auto',
            interests: ['ford', 'volvo', 'ferrari']
        }, {
            name: 'Motor Racing',
            interests: ['mclaren', 'ferrari', 'lotus']
        }];

        validSegments = [{
            name: 'Photography',
            interests: ['nikon', 'slr']
        }, {
            name: 'Auto',
            interests: ['ford']
        }, {
            name: 'Motor Racing',
            interests: ['mclaren', 'lotus']
        }];
    });

    it('should exist', function() {
        expect(window.validateSegments).to.exist;
    });

    it('should filter invalid interests', function(done) {
        window.validateSegments(segments).then(function(validatedSegments) {
            expect(validatedSegments.length).to.be.equal(segments.length);
            expect(validatedSegments).to.eql(validSegments);
            done();
        });
    });

    it('should use caching', function(done) {
        var segments = [{
            name: 'Photography',
            interests: ['nikon', 'nikon', 'nikon', 'cannon']
        }, {
            name: 'Auto',
            interests: ['nikon', 'nikon', 'cannon', 'cannon']
        }];

        window.validateInterest = callInfoDecorator(window.validateInterest);

        window.validateSegments(segments).then(function(validatedSegments) {
            expect(window.validateInterest.timesCalled).to.be.equal(2);
            expect(window.validateInterest.args).to.be.eql([
                ['nikon'],
                ['cannon']
            ]);

            window.validateInterest = window.validateInterest.fn;
            done();
        });
    });

    xit('should have good performance', function(done) {
        var getRandomItem = function getRandomItem(items) {
            return items[Math.floor(Math.random() * items.length)];
        }

        var generateSegments = function generateSegments(segCount, intCount) {
            var segmentNames = segments.map(function(s) {
                return s.name;
            });
            var interestNames = Array.prototype.concat.apply([], segments.map(function(s) {
                return s.interests;
            }));

            var result = [];

            for (var i = 0; i < segCount; i++) {
                var segment = {
                    name: getRandomItem(segmentNames),
                    interests: []
                };
                for (var j = 0; j < intCount; j++) {
                    segment.interests.push(getRandomItem(interestNames))
                }
                result.push(segment);
            };

            return result;
        }

        this.timeout(10000);
        var lotsOfSegments = generateSegments(100, 1000);
        var start = performance.now();
        window.validateSegments(lotsOfSegments).then(function(validatedSegments) {
            console.log('Time taken: ' + (performance.now() - start) + 'ms');
            done();
        });
    });
});
