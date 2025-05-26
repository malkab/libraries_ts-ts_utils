import * as papaparse from "papaparse";

/**

  Some helpers to work with CSV.

*/

/**

  Takes a string with a CSV, parse it with Papaparse and build an object with
  column names based on position.

  For example, if the next CSV is given as input:

  ```text
  a,b,c,d
  0,1,2,3
  4,5,6,7
  ```

  and the given fields are [ "x", "y" ] the output will be:

  ```json
  [
    { x: 0, y: 1 },
    { x: 4, y: 5 }
  ]
  ```

  with [ "x", "y", "z", "t" ]:

  ```json
  [
    { x: 0, y: 1, z: 2, t: 3 },
    { x: 4, y: 5, z: 6, t: 7 }
  ]
  ```

  with [ "x", "y", "z", "t", "u" ]:

  ```json
  [
    { x: 0, y: 1, z: 2, t: 3, "u": undefined },
    { x: 4, y: 5, z: 6, t: 7, "u": undefined }
  ]
  ```

  @param csv
  The CSV string to parse.

  @param fields
  The fields to be transformed to by position.

  @param __namedParameters
  Papaparse configs, some of the most used ones. All true by default. Optional.

  @param _namedParameters.dynamicTyping
  Perform dynamic typing on parsed objects. Defaults to true.

  @param _namedParameters.header
  Use first row as header. Defaults to true.

  @param _namedParameters.skipEmptyLines
  Skip empty lines in CSV. Defaults to true.

  @returns
  The transformed JSON object.

*/
export function positionalColumnsCsv(
  csv: string,
  fields: string[],
  {
    dynamicTyping = true,
    header = true,
    skipEmptyLines = true
  }: {
    dynamicTyping?: boolean,
    header?: boolean,
    skipEmptyLines?: boolean
  } = {
    dynamicTyping: true,
    header: true,
    skipEmptyLines: true
  }
): any[] {

  // Parse first to get the delimiter and the line break
  let parse: any = papaparse.parse(csv, {
    dynamicTyping: dynamicTyping,
    header: header,
    skipEmptyLines: skipEmptyLines
  });

  // To store the final, transformed result
  const outArray: any[] = [];

  // Check if there is a fields item in meta (header)
  if(parse.meta.fields) {

    // Fields available, assign by field name
    parse.data.map((item: any) => {

      const out: any = {};

      fields.map((f: string, i: number) =>
        out[f] = item[parse.meta.fields[i]])

      outArray.push(out);

    })

  } else {

    // Fields unavailable, assign by raw position
    parse.data.map((item: any) => {

      const out: any = {};

      fields.map((f: string, i: number) =>
        out[f] = item[i])

      outArray.push(out);

    })

  }

  // Return the transformed object
  return outArray;

}
