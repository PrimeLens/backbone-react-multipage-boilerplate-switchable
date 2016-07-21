describe('suite of tests to make sure ignored files are not included', function() {
  it('should not have ignoretest partial in htmlpartials', function() {
    console.log('Unit Test: The htmlpartials should not have ignoretest');
      expect(typeof htmlpartials.ignoretest).toBe("undefined");
  });
});