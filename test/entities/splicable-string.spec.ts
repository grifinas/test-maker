import { SplicableString } from '../../src';
import { expect } from '../expectations';
import { describe } from 'mocha';

describe('SplicableString', () => {
  const input = 'aaaaabbbbbcccccdddddeeeeefffffggggghhhhh';

  describe('splice', () => {
    it('should correctly track line locations', async () => {
      const splicableString = new SplicableString(input);
      splicableString.splice({ start: 35, end: 40 }, 'irrelevant');
      splicableString.splice({ start: 5, end: 10 }, 'ww');
      splicableString.splice({ start: 0, end: 5 }, 'qq');
      splicableString.splice({ start: 10, end: 20 }, '12345678910');
      splicableString.splice({ start: 20, end: 25 }, 'new word');

      const result = splicableString.result();

      expect(result).to.be.eql('qqww12345678910new wordfffffgggggirrelevant');
    });

    context(
      'when trying to modify a an already determined chunk from the middle onwards',
      () => {
        it('should throw error', () => {
          const splicableString = new SplicableString(input);
          splicableString.splice(
            { start: 0, end: 20 },
            'some new letters here',
          );
          expect(() =>
            splicableString.splice({ start: 10, end: 20 }, 'replace something'),
          ).to.throw(Error);
        });
      },
    );
  });

  describe('add', () => {
    const addition1 = 'some-text';
    const addition2 = 'different-text';

    it('should add text without removing any of the original', () => {
      const splicableString = new SplicableString(input);

      splicableString.add(addition1);
      splicableString.add(addition2);

      const result = splicableString.result();

      expect(result).to.be.eql(`${addition1}${addition2}${input}`);
    });

    it('should have atomic partitions', () => {
      const splicableString = new SplicableString(input);

      splicableString.add(addition1);
      splicableString.add(addition2, 1);

      const result = splicableString.result();

      expect(result).to.be.eql(
        `${addition1}a${addition2}aaaabbbbbcccccdddddeeeeefffffggggghhhhh`,
      );
    });

    it('should not be overwritten by splice', () => {
      const splicableString = new SplicableString(input);

      splicableString.add(addition1);
      splicableString.splice({ start: 0, end: 1 }, addition2);

      const result = splicableString.result();

      expect(result).to.be.eql(`${addition1}${addition2}${input.substring(1)}`);
    });

    it('should add second line after first even if original first line was edited', () => {
      const firstAddedLine = "import { expect } from 'chai/expectations';\n";
      const firstReplacedLine =
        "import { stubType, stubFn } from '@stub/functions';";
      const secondLine =
        "import { getImportStatusFactory } from '../../../../src/domain/business-logic/get-import-status';";
      const secondAddedLine =
        "import { DateProvider } from '../../../../src/lib/date';\n";
      const splicableString = new SplicableString(
        `import { createStubInstance } from '@stub/functions';\n${secondLine}`,
      );
      splicableString.add(firstAddedLine);
      splicableString.splice(
        {
          //@ts-expect-error
          libraryName: '@stub/functions',
          start: 0,
          end: 54,
          specifiers: [{ specifier: 'createStubInstance' }],
        },
        firstReplacedLine,
      );
      splicableString.add(secondAddedLine);

      const result = splicableString.result();

      expect(result).to.be.eql(
        `${firstAddedLine}${secondAddedLine}${firstReplacedLine}\n${secondLine}`,
      );
    });
  });

  describe('remove', () => {
    const original = 'this is a piece of text';
    const flow = [
      { location: { start: 0, end: 5 }, result: 'is a piece of text' },
      { location: { start: 5, end: 10 }, result: 'piece of text' },
    ];

    it('should track words to remove by original position', () => {
      const splicableString = new SplicableString(original);
      flow.forEach(({ location, result }) => {
        splicableString.remove(location);
        expect(splicableString.result()).to.be.eql(result);
      });
    });

    context('when second remove overlaps with first', () => {
      const firstLocation = { start: 5, end: 16 };
      const firstResult = 'this of text';

      const invalidLocations = [
        { start: 10, end: 20 },
        { start: 10, end: 16 },
        { start: 8, end: 12 },
        { start: 5, end: 10 },
        { start: 0, end: 10 },
      ];

      it('should throw error', () => {
        const splicableString = new SplicableString(original);
        splicableString.remove(firstLocation);
        expect(splicableString.result()).to.be.eql(firstResult);
        invalidLocations.forEach((location) => {
          expect(() => splicableString.remove(location)).to.throw(Error);
        });
      });
    });
  });
});
