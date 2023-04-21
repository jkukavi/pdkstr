type FunctionType = (...args: any[]) => any;

export const resolve = <
  T extends Parameters<S[number]>[0],
  S extends FunctionType[]
>(
  arr1: T,
  arr2: S
) => {
  for (const fn of arr2) {
    try {
      const resolvedVal = fn(arr1);

      if (resolvedVal === undefined) {
        throw new Error();
      }

      return resolvedVal;
    } catch (error) {
      1;
    }
  }
};
