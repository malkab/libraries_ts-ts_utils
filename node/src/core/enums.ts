export module enums {

/**

  Returns the index of a string ENUM item.

*/
export function enumItemIndex(enumObject: any, item: string): number {

  return Object.values(enumObject).filter((x: any) => typeof x === "string")
    .indexOf(item);

}

/**

  Returns the list of keys in the ENUM.

*/
export function enumKeys(enumObject: any): string[] {

  return <string[]>Object.values(enumObject)
    .filter((x: any) => typeof x === "string");

}

/**

  Number of items in the ENUM.

*/
export function enumKeysN(enumObject: any): number {

  return enumKeys(enumObject).length;

}

/**

  Get item by index.

*/
export function enumGetIndex(enumObject: any, index: number): any {

  return enumObject[enumKeys(enumObject)[index]];

}

}
