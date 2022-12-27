import { bar } from '../../lib/not-constructable';

export function usefulActionFactory() {
  return function () {
    bar();
  }
}

export type UsefulAction = ReturnType<typeof usefulActionFactory>;
