import { rxMochaTests } from "../../src/index";

import * as rx from "rxjs";

import { expect } from "chai";

const o: rx.Observable<any>[] = [
  rx.of(0, 1, 2, "A"),
  rx.throwError(new Error("An error at the Observable stream")),
  rx.of(994)
];

/**
 *
 * Base test.
 *
 */
describe("rxMochaTests Test", function() {

  rxMochaTests({

    testCaseName: "rxMochaTests Test",

    observables: o,

    assertions: [

      (o: number) => {

        expect(o).to.be.equal(0);

      },

      // Skipping an assertion
      undefined,

      (o: number, stream: any[]) => {

        expect(o + stream[0] + stream[1]).to.be.equal(3);

      },

      (o: number, stream: any[]) => {

        expect(o + stream[0]).to.be.equal("A0");

      },

      (e: any) => {

        expect(e.message).to.be.equal("An error at the Observable stream");

      },

      (o: number) => {

        expect(o).to.be.equal(994);

      },

      // This is the assertion for the complete
      (o: any, stream: any[]) => {

        expect(stream[0] + stream[1] + stream[2] + stream[3]).to.be.equal("3A");

      }

    ],

    timeout: 5000,

    verbose: true

  });

})

/**
 *
 * Skipped test.
 *
 */
describe("Skipped test", function() {

  it("Skipped test", function() {

    rxMochaTests({

      testCaseName: "Skipped test",

      observables: [ rx.of(3) ],

      active: false

    })

  })

})

/**
 *
 * Test without assertions, resorting to raw console.log ones.
 *
 */
describe("Test without assertions", function() {

  rxMochaTests({

    testCaseName: "Test without assertions",

    observables: [ rx.of(3, 2, 1) ],

    verbose: true

  })

})
