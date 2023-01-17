import { Location, SplicableString, UnitTest } from '../entities';
import { capitalize, getMissingImports } from '../lib';
import { File, NamedImport } from 'typescript-parser';
import { getImports, getImportsFromParameters } from '../actions';
import { readFileSync } from 'fs';
import { getParser } from '../parser';
import { Actions, TemplateService, TestViewRegistry } from '../services';
import { TestTypes } from '../interfaces';
import { TEMPLATE_FUNCTION_TESTS } from '../templates/parts/function-tests';
import { TEMPLATE_BUILD_TEST_CONTEXT } from '../templates';

interface UpdateContext {
  testContent: string;
  testFile: File;
  unit: UnitTest;
}

TestViewRegistry.register(Actions.Update, TestTypes.UNIT, makeUnitTestUpdate);

export async function makeUnitTestUpdate(
  templateService: TemplateService,
  unit: UnitTest,
): Promise<string> {
  const testContent = readFileSync(unit.path).toString();
  const testFile = await getParser().parseFile(unit.path, '');

  const context: UpdateContext = {
    testContent,
    testFile,
    unit,
  };

  return await [updateMocks, addMissingFunctionTests].reduce(
    async (newContent, action) => {
      return await action(templateService, {
        ...context,
        testContent: await newContent,
      });
    },
    Promise.resolve(testContent),
  );
}

async function addMissingFunctionTests(
  templateService: TemplateService,
  updateContext: UpdateContext,
): Promise<string> {
  const { unit, testContent } = updateContext;

  if (unit.functions.length === 1) {
    return testContent;
  }

  const missingFunctions = unit.functions.filter((fn) => {
    return testContent.indexOf(`describe('${fn}', ()`) === -1;
  });

  if (missingFunctions.length === 0) {
    return testContent;
  }
  const newCodeGoesHere = testContent.lastIndexOf('});');

  const forSplicing = new SplicableString(testContent);
  forSplicing.add(
    templateService.use(TEMPLATE_FUNCTION_TESTS, unit, {
      functions: missingFunctions,
    }),
    newCodeGoesHere,
  );

  return forSplicing.result();
}

async function updateMocks(
  templateService: TemplateService,
  updateContext: UpdateContext,
): Promise<string> {
  const { unit, testFile, testContent } = updateContext;
  const missingMocks = unit.parameters.filter(
    (parameter) =>
      !testFile.declarations.find(
        (declaration) =>
          declaration.name === `get${capitalize(parameter.name)}`,
      ),
  );

  if (missingMocks.length === 0) {
    return testContent;
  }

  const buildTestContext = testFile.declarations.find(
    (declaration) => declaration.name === 'buildTestContext',
  );

  if (!buildTestContext || !buildTestContext.start || !buildTestContext.end) {
    throw new Error(
      'Failed to add new mocks, because failed to find buildTestContext',
    );
  }

  const context = templateService.use(TEMPLATE_BUILD_TEST_CONTEXT, unit, {
    parameters: missingMocks,
  });

  const forSplicing = new SplicableString(testContent);
  await updateImports(forSplicing, unit, testFile);
  forSplicing.splice(buildTestContext as Location, context);

  return forSplicing.result();
}

async function updateImports(
  testContent: SplicableString,
  unit: UnitTest,
  testFile: File,
): Promise<void> {
  const testFileImports = getImportsFromParameters(
    unit.parameters,
    getImports(testFile),
    unit.path,
  );
  const missingParameterImports = getMissingImports(
    testFileImports,
    unit.imports,
  );

  const namedImports = testFile.imports.filter(
    (namedImport) => namedImport instanceof NamedImport,
  ) as NamedImport[];

  const addImports = (imports: string[], library: string): void => {
    const namedImport = namedImports.find(
      (namedImport) => namedImport.libraryName === library,
    );
    const updatedImport = `import { ${imports.join(', ')} } from '${library}';`;
    if (
      namedImport &&
      namedImport.start !== undefined &&
      namedImport.end !== undefined
    ) {
      testContent.splice(namedImport as Location, updatedImport);
    } else {
      testContent.add(`${updatedImport}\n`);
    }
  };

  missingParameterImports.forEach(addImports);
}
