// @ts-nocheck

import "mocha";

console.log(`

--------------------------

Mocha testing

--------------------------

`);

// Add test suites here
describe("ts-utils", () => {

  describe("\n\n  --- tsutilsarray.test ---\n",
   () => require("./tests/tsutilsarray.test"));

  describe("\n\n  --- tsutilstime.test ---\n",
    () => require("./tests/tsutilstime.test"));

  describe("\n\n  --- tsutilshashmap.test ---\n",
    () => require("./tests/tsutilshashmap.test"));

  describe("\n\n  --- tsutilenums.test ---\n",
    () => require("./tests/tsutilsenums.test"));

  describe("\n\n  --- tsutilsformattedoutput.test ---\n",
    () => require("./tests/tsutilsformattedoutput.test"));

  describe("\n\n  --- tsutilsmocha.test ---\n",
    () => require("./tests/tsutilsmocha.test"));

  describe("\n\n  --- tsutilsaxios.test ---\n",
    () => require("./tests/tsutilsaxios.test"));

});
