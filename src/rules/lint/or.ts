import { IOrRule } from 'spectral/types';
import { ensureRule } from 'spectral/rules';

import { AssertionError } from 'assert';

export const or = (r: IOrRule): ((object: any) => AssertionError[]) => {
  return (object: object): AssertionError[] => {
    const results: AssertionError[] = [];

    let found = false;
    for (const property of r.or) {
      if (typeof object[property] !== 'undefined') {
        found = true;
        break;
      }
    }
    const res = ensureRule(() => {
      found.should.be.exactly(true, r.description);
    });
    if (res) {
      results.push(res);
    }
    return results;
  };
};