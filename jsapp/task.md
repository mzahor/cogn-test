```js
var segments = [
  {
    name: 'Photography',
    interests: ['nikon', 'slr', 'cannon']
  }, {
    name: 'Auto',
    interests: ['ford', 'volvo', 'ferrari']
  }, {
    name: 'Motor Racing',
    interests: ['mclaren', 'ferrari', 'lotus']
  }
];

function validateInterest(interest) {
  var validInterests = ['nikon', 'slr', 'ford', 'mclaren', 'lotus'];
  return new Promise(function(resolve) {
    setTimeout(function() {
      var isValid = validInterests.indexOf(interest) > -1;
      console.log('Validating: ' + interest + ', isValid: ' + isValid);
      resolve(isValid);
    }, 100);
  });
}
```

Add code below this comment that validates the interests
in a given list of segments and logs the list of validated segments
back to the console. The function validateInterest is
provided to mock the Facebook Ads API.
You should consider the following in your solution:
 * You need only support Chrome, so use of a library should not be required.
 * Efficiently handle large lists of segments with many interests.
 * Assume that calls to the Facebook API have quotas so should be used sparingly.
 * Don't be afraid to show your OO or functional JavaScript skills, this can earn you extra credit.
eg. After calling something like:
   validateSegments(segments, callback);
You should see an array of segments with invalid interests filtered out in
your console:

```js
 {
   name: 'Photography',
   interests: ['nikon', 'slr']
 }, {
   name: 'Auto',
   interests: ['ford']
 }, {
   name: 'Motor Racing',
   interests: ['mclaren', 'lotus']
 }
```