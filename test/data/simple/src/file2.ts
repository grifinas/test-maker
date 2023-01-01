export function function2Factory() {
  return function () {
    return 'file2';
  };
}

export type Function2 = ReturnType<typeof function2Factory>;
