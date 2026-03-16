export function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    get value() {
      return count;
    },
    increment() {
      count += 1;
    },
    decrement() {
      count -= 1;
    },
    reset() {
      count = initialValue;
    }
  };
}
