export function function1Factory() {
  return function () {
    return 'file1';
  };
}

export type Function1 = ReturnType<typeof function1Factory>;
