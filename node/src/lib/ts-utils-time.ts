import * as m from "moment";





export namespace TsUtilsTime {

  /**
   * 
   * Human readable time deltas
   * 
   * @param delta 
   * 
   */

  export function humanTd(
    start: number,
    end: number = null
  ): string {

    return end === null ? m(start).fromNow() : m(start).from(end); 

  }





  /**
   * 
   * Function to get a human readable timestamp
   * 
   */

  export function machineTs(
    date: number = null,
    format: string = "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"  
  ): string {

    return date === null ?
      m().format(format) :
      m(date).format(format);

  }



  /**
   * 
   * This function returns a TS suitable to be inserted as part
   * of file paths.
   * 
   */

  export function filePathTs(): string {

    return machineTs()
      .replace(/-/g, "_")
      .replace(/\s/g, "_")
      .replace(/:/g, "_");

  }

}
