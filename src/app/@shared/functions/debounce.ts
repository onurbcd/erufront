import { debounce } from 'lodash';

export function Debounce(wait: number) {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    let original = descriptor.value;
    original = debounce(original, wait);

    descriptor.value = function () {
      return original.apply(this, arguments);
    };

    return descriptor;
  };
}
