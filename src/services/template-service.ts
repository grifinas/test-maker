type TemplateFunction<T extends object> = (params: T) => string;

export class TemplateService {
  static templates = new Map<string, TemplateFunction<object>>();

  static register<T extends object>(
    name: string,
    template: (params: T) => string,
  ): void {
    TemplateService.templates.set(name, template as TemplateFunction<object>);
  }

  use<T extends object>(name: string, params: T): string {
    const fn = TemplateService.templates.get(name);
    if (!fn) {
      throw new Error(`Template with name: ${name} does not exist`);
    }
    return fn(params);
  }
}
