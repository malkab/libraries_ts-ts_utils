import "mocha";

import { expect } from "chai";

import { enumItemIndex, enumKeys } from "../../src";

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

})
