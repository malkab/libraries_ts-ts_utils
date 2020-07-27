import { TsUtilsTime as tsTime } from "./ts-utils-time";

import { TsUtilsHashMaps } from "./ts-utils-hashmaps";





/**
 * 
 * This class configures a formatted output system.
 * 
 */

export class TsUtilsFormattedOutput {

  /**
   * 
   * Local vars
   * 
   */

  private _dateSeparator: string;
  private _errorPrefix: string;
  private _errorSeparator: string;


  constructor({

    dateSeparator = ": ",
    errorPrefix = "ERROR: ",
    errorSeparator = ": ",

  }: {

    dateSeparator?: string;
    errorPrefix?: string;
    errorSeparator?: string;

  }) {

    this._dateSeparator = dateSeparator;
    this._errorPrefix = errorPrefix;
    this._errorSeparator = errorSeparator;

  }





  /**
   * 
   * Log error format with timestamp.
   * 
   */

  public logError(
    message: string, 
    error: any = ""
  ): string {

    if (error) {

      return this.log(`${this._errorPrefix}${message}${this._errorSeparator}${error}`);

    } else {

      return this.log(`ERROR: ${message}`);

    }

  }





  /**
   * 
   * Log message format with timestamp.
   * 
   */

  public log(
    message: string = null
  ): string {

    return message ? `${tsTime.machineTs()}${this._dateSeparator}${message}` : "\n";
    
  }




  /**
   * 
   * Pretty-prints a hashmap with string keys.
   * 
   */

  public hashmapPrettyPrint({

    hashmap,
    gap = 0,
    separator = " : ",
    exclude = null,
    include = null,
    reverse = false

  }: {

    hashmap: { [ key: string ]: any };
    gap?: number;
    separator?: string;
    exclude?: string[];
    include?: string[];
    reverse?: boolean;

  }): string {

    let out: string = "";

    // Apply include / exclude to hashmap

    hashmap = include !== null ? 
      TsUtilsHashMaps.includeKeys(hashmap, ...include) :
      hashmap;

    hashmap = exclude !== null ? 
      TsUtilsHashMaps.excludeKeys(hashmap, ...exclude) :
      hashmap;


    // Sort keys

    let keys: string[];

    if (reverse) {

      keys = Object.keys(hashmap).sort((a, b) => {

        return a > b ? -1 : 1

      })

    } else {

      keys = Object.keys(hashmap).sort((a: string, b: string) => {

        return a < b ? -1 : 1

      })

    }


    // Get max length of keys

    let maxLength = 0;

    keys.map((x) => {

      maxLength = x.length > maxLength ?
        x.length :
        maxLength;

    });


    // Process hashmap
    
    keys.map((x) => {

      const spaces: number = maxLength - x.length;

      out = `${out}${x}${" ".repeat(spaces)}${separator}${" ".repeat(gap)}${hashmap[x]}\n`;

    });

    return out.replace(/\n$/, "");

  }

}
