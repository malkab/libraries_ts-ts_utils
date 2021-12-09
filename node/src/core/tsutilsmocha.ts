import "mocha";

import * as rx from "rxjs";

import * as rxo from "rxjs/operators";

/**
 *
 * Function to handle Observable tests, encapsulating them into an **it** Mocha
 * test structure.
 *
 * If no assertions are provided, all tests will pass. Use **undefined** in
 * assertions to skip an assertion for a certain output in the Observable
 * stream. The last assertion is the assertion to be performed at stream
 * completion, take into account, however, that this assertion will only work
 * with the optional **stream** parameter of assertion functions, since no
 * stream value is available at this stage.
 *
 * Example code:
 *
 * ```TypeScript
 * const o: rx.Observable<any> = rx.concat(
 *   // If null is used, no assertion will be tested on the first output of the
 *   // Observable stream
 *   rx.of(0, 1, 2, "A"), // null,
 *   rx.throwError(new Error("An error at the Observable stream")),
 *   // This is unreachable due to the above error
 *   rx.of(994)
 * );
 *
 * rxMochaTests({
 *     testCaseName: "Dummy Test Case",
 *     observable: o,
 *     assertions: [
 *       (o: number) => {
 *
 *         expect(o).to.be.equal(0);
 *
 *       },
 *       (o: number, stream: any[]) => {
 *
 *         expect(o + stream[0]).to.be.equal(1);
 *
 *       },
 *       (o: number, stream: any[]) => {
 *
 *         expect(o + stream[0] + stream[1]).to.be.equal(3);
 *
 *       },
 *       // Skipping this assertion
 *       undefined,
 *       // (o: number, stream: any[]) => {
 *       //
 *       //   expect(o + stream[0]).to.be.equal("A0");
 *       //
 *       // },
 *       (e: any) => {
 *
 *         expect(e.message).to.be.equal("An error at the Observable stream");
 *
 *       },
 *       (o: number) => {
 *
 *         expect(o).to.be.equal(994);
 *
 *       },
 *       // This is the assertion for the complete
 *       (o: any, stream: any[]) => {
 *
 *         expect(stream[0] + stream[1] + stream[2] + stream[3]).to.be.equal("3A");
 *
 *       }
 *     ],
 *     timeout: 5000,
 *     verbose: true
 * });
 * ```
 *
 *
 * Assertion functions follow this prototype:
 *
 * ```TypeScript
 * (value: any, stream: any[]) => void
 * ```
 *
 * where **value** is the stream value or error output from the testing
 * observable and **stream** is the array containing all values and errors
 * previously outputted.
 *
 * @param __namedParameters
 * Tests options.
 *
 * @param testCaseName
 * The name of the test.
 *
 * @param observables
 * The observables to test.
 *
 * @param assertions
 * **Optional**. Assertions to test on each result of the observable and at the
 * complete step. It is expected to have one assertion for each observable
 * result, including errors. Errors will stop the stream of assertions. It is a
 * sequence of functions without return. These functions get the stream with all
 * the results from the observable so they are accesible to do modifications on
 * previous results.
 *
 * @param timeout
 * The allowed timeout for this test suite in milliseconds. Use a big value here
 * for long running observables.
 *
 * @param verbose
 * **Optional**. A boolean stating if verbose output is needed, for debugging.
 *
 */
export function rxMochaTests({
  testCaseName,
  observables,
  assertions,
  timeout = 20000,
  verbose = false,
  active = true
}: {
  testCaseName: string;
  observables: rx.Observable<any>[];
  assertions?: ((next: any, stream?: any[]) => void)[];
  timeout?: number;
  verbose?: boolean;
  active?: boolean;
}): void {

  // If active, do
  if(active) {

    it(testCaseName, function(done) {

      // Set the timeout
      this.timeout(timeout);

      // This counter let differentiate the different Observable outputs
      let i: number = 0;

      // This is to store results of Observable outputs so they are available to
      // latter results in the stream
      const stream: any[] = [];

      let verboseMessage: string | undefined = undefined;

      // Add to every observable a catchError pipe to detect and process errors
      rx.concat(

        ...observables.map((o: rx.Observable<any>) =>
          o.pipe(rxo.catchError((e: any) => {

            verboseMessage =
              `        Test Case ${testCaseName}, assertion ${i}, error: ${JSON.stringify(e)} ${e}`;
            return rx.of(e);

          }))

        )

      )
      .subscribe({

        next: (o: any) => {

          verboseMessage = verboseMessage ? verboseMessage :
            `        Test Case ${testCaseName}, assertion ${i}, stream: ${JSON.stringify(o)} ${o}`;

          if (verbose) console.log(verboseMessage);
          verboseMessage = undefined;

          // Apply the assertion to the test, if any
          if (assertions)
            if (assertions[i]) {

              assertions[i](o, stream);

            } else {

              if (verbose) console.log(`        No assertion available for assertion ${i}, skipping...`);

            }

          // Push the result into the stream cache
          stream.push(o);

          // Increase the counter to allow for testing each Observable outputs
          i += 1;

        },

        error: (e: Error) => {},

        complete: () => {

          verboseMessage =
            `        Test Case ${testCaseName}, assertion ${i}, completed`;

          if (verbose) console.log(verboseMessage);

          if (assertions)
            if (assertions[i]) {

              assertions[i](undefined, stream);

            } else {

              if (verbose) console.log("        No completed assertion available, skipping...");

            }

          // Signal Mocha the test is over
          done();

        }

      })

    })

  } else {

    console.log(`        Test ${testCaseName}: inactive, skipping...`);

  }

}
