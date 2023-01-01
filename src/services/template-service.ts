type TemplateFunction = <T extends object>(params: T) => string;

export class TemplateService {
  static templates = new Map<string, TemplateFunction>();

  static register(name: string, template: TemplateFunction): void {
    TemplateService.templates.set(name, template);
  }

  use<T extends object>(name: string, params: T): string {
    const fn = TemplateService.templates.get(name);
    if (!fn) {
      throw new Error(`Template with name: ${name} does not exist`);
    }
    return fn(params);
  }
}
