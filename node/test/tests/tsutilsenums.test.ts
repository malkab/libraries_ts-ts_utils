import "mocha";

import { expect } from "chai";

import { enumItemIndex, enumKeys, enumKeysN, enumGetIndex } from "../../src";

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

    expect(enumItemIndex(ESTRING, "B")).to.be.equal(1);
    expect(enumItemIndex(ENUMBER, "B")).to.be.equal(1);

  })

  it("enumKeys", function() {

    expect(enumKeys(ESTRING)).to.be.deep.equal([ "A", "B", "C" ]);
    expect(enumKeys(ENUMBER)).to.be.deep.equal([ "A", "B", "C" ]);

  })

  it("enumKeysN", function() {

    expect(enumKeysN(ESTRING)).to.be.equal(3);
    expect(enumKeysN(ENUMBER)).to.be.equal(3);

  })

  it("enumGetIndex", function() {

    expect(enumGetIndex(ESTRING, 1)).to.be.equal("B");
    expect(enumGetIndex(ENUMBER, 2)).to.be.equal(12);

  })

})
