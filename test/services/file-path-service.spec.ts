import { FilePathService } from '../../src/services/file-path-service';
import { expect } from '../expectations';

describe('File Path Service', () => {
  FilePathService.setRootFrom('/stub/src/some-part-that-does-not-matter');

  describe('getImportString', () => {
    it("should get import string for specified path", async () => {
      const result = FilePathService.getImportString('/stub/test/some-file.spec.ts', '/stub/src/lib/thing-we-want-to-import.ts');
      expect(result).to.be.eql('../src/lib/thing-we-want-to-import');

      const result2 = FilePathService.getImportString('/stub/test/some/deep/directory/some-file.spec.ts', '/stub/src/lib/thing-we-want-to-import.ts');
      expect(result2).to.be.eql('../../../../src/lib/thing-we-want-to-import');

      const result3 = FilePathService.getImportString('/stub/test/domain/actions/useful-action.spec.ts', '/stub/src/domain/actions/useful-action.ts');
      expect(result3).to.be.eql('../../../src/domain/actions/useful-action');
    });

    context('when import is in test directory as well', () => {
      it('should not move all the way to root', () => {
        const result = FilePathService.getImportString('/stub/test/some-file.spec.ts', '/stub/test/utils/builders/some-builder.ts');
        expect(result).to.be.eql('./utils/builders/some-builder');

        const result2 = FilePathService.getImportString('/stub/test/directory/some-file.spec.ts', '/stub/test/utils/builders/some-builder.ts');
        expect(result2).to.be.eql('../utils/builders/some-builder');
      });
    });
  })
});
