import "mocha";

import { expect } from "chai";

import * as time from "../../src/index";

describe("humanTd", function() {

  it("without end", function() {

    expect(time.humanTd(Date.now()), "from now()")
      .is.equal("a few seconds ago");

    expect(time.humanTd(Date.parse("01/01/1980")),
      "from 01/01/1980")
      .is.equal("41 years ago");

  })

  it("with end", function() {

    expect(
      time.humanTd(
        Date.parse("01/01/1980"),
        Date.parse("01/01/1990")
      ),
      "from 01/01/1980 to 01/01/1990"
    )
      .is.equal("10 years ago");

  })

});

describe("machineIsoTs", function() {

  it("without parameter", function() {

    expect(time.machineTs().length)
      .is.be.equal(24);

  })

  it("with parameter", function() {

    expect(time.machineTs(Date.parse("1980-12-24 23:34:10")), "with parameter")
      .is.be.equal("1980-12-24T23:34:10.000Z");

  })

  it("with parameter and format", function() {

    expect(time.machineTs(
      Date.parse("01/01/1980"),
      "DD/MM/YY HH:mm"
    ), "with parameter and format")
      .is.be.equal("01/01/80 00:00");

  })

});

describe("filePathTs", function() {

  it("with delta", function() {

    expect(time.filePathTs())
      .is.not.null;

  })

});
