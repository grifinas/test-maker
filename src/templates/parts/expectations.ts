import { TemplateService } from '../../services';

export const TEMPLATE_EXPECTATIONS = 'TEMPLATE_EXPECTATIONS';
TemplateService.register(TEMPLATE_EXPECTATIONS, ({ test }) => {
  const parameterExpectations = test.parameters.map(
    (parameter) => `expect(${parameter.name}).to.be.calledOnceWithExactly();`,
  );

  return ['expect(result).to.be.eql();', ...parameterExpectations].join('\n');
});
