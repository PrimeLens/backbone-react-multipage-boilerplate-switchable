describe('suite of tests for the platform',function () {
  it('Router base js should not be changed', function() {
    console.log('Router base js should not be changed.');
    var checksum = objectHash(routerSetupConfig, { algorithm: 'md5', encoding: 'base64' });
    expect(checksum).toBe('vqEBe0TRcYQPjor2ZW6OQw==');
  });
  it('should run this example test', function() {
    console.log('This sample test should run.');
    expect(1).toBe(1);
  });
});