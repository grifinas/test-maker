import { TemplateService } from '../../services';
import { TEMPLATE_LIBRARY_FUNCTION } from './library-function-test';
import { TEMPLATE_FUNCTION_TEST } from './function-test';
import { TEMPLATE_IT_SHOULD_UNIT } from './it-should-unit';

interface Params {
  functions: string[];
}

export const TEMPLATE_FUNCTION_TESTS = 'TEMPLATE_FUNCTION_TESTS';
TemplateService.register<Params>(
  TEMPLATE_FUNCTION_TESTS,
  ({ test, include, extra }) => {
    const template = test.isLibrary
      ? TEMPLATE_LIBRARY_FUNCTION
      : test.isClass
      ? TEMPLATE_FUNCTION_TEST
      : TEMPLATE_IT_SHOULD_UNIT;

    const { functions } = extra || {};
    const toMake = functions || test.functions;

    return toMake
      .map((functionName) => include(template, { functionName }))
      .join('\n');
  },
);
