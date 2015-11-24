window.validateInterest = function validateInterest(interest) {
    var validInterests = ['nikon', 'slr', 'ford', 'mclaren', 'lotus'];
    return new Promise(function(resolve) {
        setTimeout(function() {
            var isValid = validInterests.indexOf(interest) > -1;
            // console.log('Validating: ' + interest + ', isValid: ' + isValid);
            resolve(isValid);
        }, 1);
    });
};

/*
 * memoize.js
 * by @philogb and @addyosmani
 * with further optimizations by @mathias
 * and @DmitryBaranovsk
 * perf tests: http://bit.ly/q3zpG3
 * Released under an MIT license.
 */
window.memoize = function memoize(fn) {
    return function() {
        var args = Array.prototype.slice.call(arguments),
            hash = "",
            i = args.length;
        currentArg = null;
        while (i--) {
            currentArg = args[i];
            hash += (currentArg === Object(currentArg)) ?
                JSON.stringify(currentArg) : currentArg;
            fn.memoize || (fn.memoize = {});
        }
        return (hash in fn.memoize) ? fn.memoize[hash] :
            fn.memoize[hash] = fn.apply(this, args);
    };
};

// In production code I would use some kind of module system (preferrably CommonJS).
// This solution do not mutate original segments object and creates a new one.
// Not sure whether it's ok in this particular case, but I usually try to avoid mutability
window.validateSegments = function validateSegments(segments) {
	// use memoization for caching
    var validateInterest = window.memoize(window.validateInterest);

    return Promise.all(segments.map(function(segment) {
        return Promise.all(segment.interests.map(function(interest) {
            // don't care about failures since I'm not sure how should handle them
            // Strategy I would use in production code:
            // 	retry several times, then, if still failed, 
            //  add interest to special 'not validated' array
            return validateInterest(interest).then(function(valid) {
                return {
                    interest: interest,
                    valid: valid
                };
            });
        })).then(function(validatedInterests) {
            return {
                name: segment.name,
                interests: validatedInterests.filter(function(result) {
                    return result.valid;
                }).map(function(result) {
                    return result.interest
                })
            }
        });
    }));
};
