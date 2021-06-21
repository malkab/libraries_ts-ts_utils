/**
 *
 * Some functions to work with maps. A Map is an object Map<key, value>().
 *
 */

/**
 *
 * Takes an array of objects and, using a provided function applied to them to
 * extract a string key, returns a Map with the key coming from the function.
 *
 * @typeParam TKey          The type of the key for the Map.
 * @typeParam TValue        The type of the value for the Map.
 * @param array             The array of objects to process into a
 *                          Map<TKey, TValue>.
 * @param keyFunction       The function to get the keys, that must be unique.
 *                          The function has a prototype in the form (x:
 *                          TValue) => TKey.
 * @returns                 A Map<TKey, TValue> with the elements of the
 *                          array.
 */
export function fromArray<TKey, TValue>(
  array: any[],
  keyFunction: (x: TValue) => TKey
): Map<TKey, TValue> {

  const out: Map<TKey, TValue> = new Map<TKey, TValue>();

  array.map((x: TValue) => out.set(keyFunction(x), x));

  return out;

}
