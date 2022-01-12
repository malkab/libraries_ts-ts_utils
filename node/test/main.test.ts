import "mocha";

console.log(`

--------------------------

Mocha testing

--------------------------

`);

// Add test suites here
describe("ts-utils", () => {

  describe("\n\n  --- 010-array.test ---\n",
   () => require("./tests/010-array/010-array.test"));

  describe("\n\n  --- 020-time.test ---\n",
    () => require("./tests/020-time/020-time.test"));

  describe("\n\n  --- 030-hashmap.test ---\n",
    () => require("./tests/030-hashmap/030-hashmap.test"));

  describe("\n\n  --- 040-enums.test ---\n",
    () => require("./tests/040-enums/040-enums.test"));

  describe("\n\n  --- 050-formattedoutput.test ---\n",
    () => require("./tests/050-formattedoutput/050-formattedoutput.test"));

  describe("\n\n  --- 060-mocha.test ---\n",
    () => require("./tests/060-mocha/060-mocha.test"));

  describe("\n\n  --- 070-axios.test ---\n",
    () => require("./tests/070-axios/070-axios.test"));

  describe("\n\n  --- 080-csv.test ---\n",
    () => require("./tests/080-csv/080-csv.test"));

});
