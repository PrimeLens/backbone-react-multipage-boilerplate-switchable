describe('suite of tests for the platform',function () {
  it('Router base js should not be changed', function() {
    console.log('Router base js should not be changed.');
    var checksum = objectHash(routerSetupConfig);
    expect(checksum).toBe('bc4831ec394192debd5fa1a36e92d56031d7990e');
  });
  it('should run this example test', function() {
    console.log('This sample test should run.');
    expect(1).toBe(1);
  });
});