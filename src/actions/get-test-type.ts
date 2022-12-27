import { File } from "typescript-parser";
import { FilePathService } from "../services/file-path-service";

export const TestTypes = {
  IT: "integration",
  UNIT: "unit",
} as const;

export function getTestType(file: File): string {
  return FilePathService.isIntegrationTest(file)
    ? TestTypes.IT
    : TestTypes.UNIT;
}
