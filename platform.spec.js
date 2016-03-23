describe('suite of tests for the platform',function () {
  it('Router base js should not be changed', function() {
    console.log('Unit Test: Router base js should not be changed.');
    var checksum = objectHash(routerSetupConfig, { algorithm: 'md5', encoding: 'base64' });
    expect(checksum).toBe('2f10vxKAVe5PHd17c8tJdA==');
  });
  it('should run this example test', function() {
    console.log('Unit Test: This sample test should run.');
    expect(1).toBe(1);
  });
});