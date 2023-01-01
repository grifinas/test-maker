export type SavePromisedContent = (
  contentPromise: Promise<string>,
  path: string,
) => void;
