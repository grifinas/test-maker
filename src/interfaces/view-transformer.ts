import { UnitTest } from '../entities';
import { TemplateService } from '../services';

export type ViewTransformer = (
  templateService: TemplateService,
  test: UnitTest,
) => Promise<string>;
