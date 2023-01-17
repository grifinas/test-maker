import { TemplateService } from '../../services';

export const TEMPLATE_IMPORTS = 'TEMPLATE_IMPORTS';
TemplateService.register(TEMPLATE_IMPORTS, ({ test }) => {
  const importStrings: string[] = [];

  test.imports.forEach((importGroup, path) => {
    importStrings.push(`import { ${importGroup.join(', ')} } from '${path}';`);
  });

  return importStrings.join('\n');
});
