describe('suite of tests for the walking dead component', function() {
  it('should not mix jQuery with React', function() {
    console.log('Unit Test: The walking dead react component should not contain jQuery');
    var walkingDeadComponentStr = '' + rc.walkingPageComponent
      , indexOf$ = walkingDeadComponentStr.indexOf('$')
      , indexOfjQuery = walkingDeadComponentStr.indexOf('jQuery')
      , indexTotal = indexOf$ + indexOfjQuery;
      expect(indexTotal).toBe(-2);
  });
});