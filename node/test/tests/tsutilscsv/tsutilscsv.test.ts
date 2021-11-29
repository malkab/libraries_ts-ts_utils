import "mocha";

import { expect } from "chai";

import { csv } from "../../../src/index";

describe("tsutilscsv tests", function() {

  it("positionalColumnsCsv same number of columns", function() {

    expect(csv.positionalColumnsCsv(
      "a,b,c,d\n0,1,2,3\n4,5,6,7\n\n",
      [ "c0", "c1", "c2", "c3" ]
    )).to.deep.equal([
      { c0: 0, c1: 1, c2: 2, c3: 3 },
      { c0: 4, c1: 5, c2: 6, c3: 7 }
    ]);

  })

  it("positionalColumnsCsv fewer number of columns", function() {

    expect(csv.positionalColumnsCsv(
      "a,b,c,d\n0,1,2,3\n4,5,6,7\n\n",
      [ "c0", "c1" ]
    )).to.deep.equal([
      { c0: 0, c1: 1 },
      { c0: 4, c1: 5 }
    ]);

  })

  it("positionalColumnsCsv more number of columns", function() {

    expect(csv.positionalColumnsCsv(
      "a,b,c,d\n0,1,2,3\n4,5,6,7\n\n",
      [ "c0", "c1", "c2", "c3", "c4" ]
    )).to.deep.equal([
      { c0: 0, c1: 1, c2: 2, c3: 3, c4: undefined },
      { c0: 4, c1: 5, c2: 6, c3: 7, c4: undefined }
    ]);

  })

  it("positionalColumnsCsv with no header", function() {

    expect(csv.positionalColumnsCsv(
      "0,1,2,3\n4,5,6,7\n\n",
      [ "c0", "c1", "c2", "c3" ],
      { header: false }
    )).to.deep.equal([
      { c0: 0, c1: 1, c2: 2, c3: 3 },
      { c0: 4, c1: 5, c2: 6, c3: 7 }
    ]);

  })

})
