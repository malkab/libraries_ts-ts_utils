import "mocha";

import "webpack";

console.log(`

--------------------------

Mocha testing

--------------------------

`);

// Add test suites here
describe("ts-utils", () => {

  describe("\n\n  --- ts-utils-array.test ---\n", () => require("./tests/tsutilsarray.test"));
  describe("\n\n  --- ts-utils-time.test ---\n", () => require("./tests/tsutilstime.test"));
  describe("\n\n  --- ts-utils-hashmap.test ---\n", () => require("./tests/tsutilshashmap.test"));
  describe("\n\n  --- ts-utils-formattedoutput.test ---\n", () => require("./tests/tsutilsformattedoutput.test"));
  describe("\n\n  --- tsutilsmocha.test ---\n", () => require("./tests/tsutilsmocha.test"));
  describe("\n\n  --- tsutilsaxios.test ---\n", () => require("./tests/tsutilsaxios.test"));

});
