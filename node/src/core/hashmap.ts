/**

  Some niceties concerning hashmaps.

  A hashmap is a { [ key: string ]: any } object.

*/

/**

  Excludes some keys from the hashmap.

  @param hashmap
  @param keysToExclude

*/
export function excludeKeys(

  hashmap: { [ key: string ]: any },
  ...keysToExclude: string[]

  ): { [ key: string ]: any } {

  const out: { [ key: string ]: any } =
    Object.keys(hashmap)
      .filter((x: string) => !keysToExclude.includes(<never>x))
      .reduce((obj, key) => {

        obj[key] = hashmap[key]

        return obj;

      }, <{ [ key: string ]: any }>{});

  return out;

}

/**

  Includes some keys of the hashmap.

  @param hashmap
  @param keysToExclude

*/
export function includeKeys(

  hashmap: { [ key: string ]: any },
  ...keysToExclude: string[]

): { [ key: string ]: any } {

  const out: { [ key: string ]: any } =
    Object.keys(hashmap)
      .filter((x: string) => keysToExclude.includes(<never>x))
      .reduce((obj, key) => {

        obj[key] = hashmap[key]

        return obj;

      }, <{ [ key: string ]: any }>{});

  return out;

}
