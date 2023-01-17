import { UnitTest } from '../entities';

export type IncludeFunction = (name: string, extra?: object) => string;
type TemplateFunction<T extends object = object> = (context: {
  extra?: T;
  include: IncludeFunction;
  test: UnitTest;
}) => string;

export class TemplateService {
  static templates = new Map<string, TemplateFunction>();
  private test: UnitTest | undefined;

  static register<T extends object = object>(
    name: string,
    template: TemplateFunction<T>,
  ): void {
    TemplateService.templates.set(name, template as TemplateFunction);
  }

  use(name: string, test: UnitTest, extra?: object): string {
    const fn = TemplateService.templates.get(name);
    if (!fn) {
      throw new Error(`Template with name: ${name} does not exist`);
    }
    this.test = test;
    return fn({ test, include: this.getTemplatesWithUnitContext(), extra });
  }

  private getTemplatesWithUnitContext(): IncludeFunction {
    return (name: string, extra: object = {}) => {
      if (this.test === undefined) {
        throw new Error(
          'template accessed sub-template without test being registered',
        );
      }
      return this.use(name, this.test, extra);
    };
  }
}
