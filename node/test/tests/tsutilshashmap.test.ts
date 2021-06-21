import "mocha";

import { expect } from "chai";

import * as hm from "../../src/index";

describe("ts-utils-hashmaps tests", function() {

  it("excludeKeys", function() {

    const testString: { [ key: string ]: any } = {

      a: 0,
      b: 1,
      c: 2,
      d: 3,
      e: 4

    }

    expect(

      hm.excludeKeys(testString, "a", "d"),
      "excludeKeys"

    ).to.deep.equal(

      { b: 1, c: 2, e: 4 }

    );

    expect(

      hm.includeKeys(testString, "a", "d"),
      "includeKeys"

    ).to.deep.equal(

      { a: 0, d: 3 }

    );

  })

});
