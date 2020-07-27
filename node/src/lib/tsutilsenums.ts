/**
 * 
 * Some functions concerning ENUMS.
 * 
 */

export namespace TsUtilsEnums {

  /**
   * 
   * Returns the index of a string ENUM item.
   * 
   */
  
  export function enumItemIndex(enumObject: any, item: string): number {

    return Object.keys(enumObject).indexOf(item);

  }

}
