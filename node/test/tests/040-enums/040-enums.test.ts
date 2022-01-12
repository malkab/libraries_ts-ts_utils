import "mocha";

import { expect } from "chai";

import { enums } from "../../../src/index";

describe("ts-utils-enums tests", function() {

  enum ESTRING {
    A = "A",
    B = "B",
    C = "C"
  }

  enum ENUMBER {
    A = 10,
    B,
    C
  }

  it("enumItemIndex", function() {

    expect(enums.enumItemIndex(ESTRING, "B")).to.be.equal(1);
    expect(enums.enumItemIndex(ENUMBER, "B")).to.be.equal(1);

  })

  it("enumKeys", function() {

    expect(enums.enumKeys(ESTRING)).to.be.deep.equal([ "A", "B", "C" ]);
    expect(enums.enumKeys(ENUMBER)).to.be.deep.equal([ "A", "B", "C" ]);

  })

  it("enumKeysN", function() {

    expect(enums.enumKeysN(ESTRING)).to.be.equal(3);
    expect(enums.enumKeysN(ENUMBER)).to.be.equal(3);

  })

  it("enumGetIndex", function() {

    expect(enums.enumGetIndex(ESTRING, 1)).to.be.equal("B");
    expect(enums.enumGetIndex(ENUMBER, 2)).to.be.equal(12);

  })

})
