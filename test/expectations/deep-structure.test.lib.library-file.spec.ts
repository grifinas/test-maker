import { foo, bar, baz } from '../../src/lib/library-file';

describe('library-file', () => {
  describe('foo', () => {
    it('should', async () => {
      const result = foo();
      expect(result).to.be.eql();
    });
  });

  describe('bar', () => {
    it('should', async () => {
      const result = bar();
      expect(result).to.be.eql();
    });
  });

  describe('baz', () => {
    it('should', async () => {
      const result = baz();
      expect(result).to.be.eql();
    });
  });
});
