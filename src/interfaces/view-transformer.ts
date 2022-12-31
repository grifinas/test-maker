import { UnitTest } from '../entities/unit-test';

export type ViewTransformer = (test: UnitTest) => Promise<string>;
