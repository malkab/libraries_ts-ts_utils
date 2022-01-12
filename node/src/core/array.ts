import * as _ from "lodash";

export module array {

/**
 *
 * Sorts discrete array by number of occurrences.
 *
 */
export function sortDiscreteArrayByOcurrences(
  arr: any[],
  reverse: boolean = false
): any[] {

  const a: Map<any, number> = new Map<any, number>();

  for (const i of arr) {

    const o: number | undefined = a.get(i);

    if (_.isUndefined(o)) {

      a.set(i, 1);

    } else {

      a.set(i, o + 1);

    }

  }

  const m: Array<[ any, number ]> = Array.from(a);

  const sorted: Array<[ any, number ]> =
    m.sort(
      (i0: [ any, number ], i1: [ any, number ]) => {

        if (!reverse) {

          return i1[1] - i0[1];

        } else {

          return i0[1] - i1[1];

        }

      }

    );

  return sorted;

}

/**
 *
 * Iterates through an array of arrays applying a function to each
 * element but keeping the nested structure.
 *
 * @param a         The nested object to loop.
 * @param f         The function to apply.
 *
 */
export function mapNested(
  a: any,
  f: (x: any) => any
): any {

  if (_.isArray(a)) {

    return a.map((i: any) => mapNested(i, f));

  } else {

    a = f(a);

    return a;

  }

}

/**
 *
 * Returns a deeply flatten, unique version of an array. If the
 * flatten array has only one element, returns that single element
 * without array.
 *
 * @param arr           The array to flatten.
 * @returns             Either a single element or a flatten array
 *                      of unique ones.
 *
 */
export function deepFlatten(arr: any): any {

  arr = _.uniq(_.flattenDeep(arr));

  if (arr.length === 1) {

    return arr[0];

  } else {

    return arr;

  }

}

/**
 *
 * Gets an array of objects and returns an array with the unique
 * objects presents as compared by Lodash **isEqual** function.
 *
 * @param x         The array to process.
 * @returns         An unique array.
 *
 */
export function deepUniqueArray(x: any[]): any[] {

  const res: any[] = [ x[0] ];

  for (const i of x) {

    let present: boolean = false;

    for (const y of res) {

      if (_.isEqual(i, y)) {

        present = true;

        break;

      }

    }

    if (!present) {

      res.push(i);

    }

  }

  return res;

}

/**
 *
 * Returns an array from the values of a Map<key, value>.
 *
 * @param map         The Map to construct the array from.
 * @param sort        **Optional**. A comparisson function to sort the
 *                    resulting array. As with any array comparisson function,
 *                    it has the prototype (x0: TValue, x1: TValue) => number
 *                    and must return a number that will sort the values in
 *                    terms of being positive or negative.
 * @returns           An array with the Map values, sorted or not.
 *
 */
export function fromMap<TValue>(
  map: Map<any, TValue>,
  sort: (x0: TValue, x1: TValue) => number
): TValue[] {

  const out: TValue[] = [];

  map.forEach((value, key, map) => {

    out.push(value);

  })

  if (sort) {

    return out.sort(sort);

  } else {

    return out;

  }

}

}
