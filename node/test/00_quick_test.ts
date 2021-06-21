// This is a quick-and-dirty test file

// Proper testing must be done with Mocha

console.log(`

---------------------------

Quick Test

---------------------------

`);

// import { TsUtilsMaps } from "../src/index";

// const a = TsUtilsMaps.fromArray<number, number>([ 1, 2, 3, 4 ], (x) => x);

import { OrmError } from "../src/index";

const e: Error = new Error("normal error");

(<any>e)["ttt"] = 77;

const o: OrmError.OrmError = new OrmError.OrmError(e,
  OrmError.EORMERRORCODES.DUPLICATED);
