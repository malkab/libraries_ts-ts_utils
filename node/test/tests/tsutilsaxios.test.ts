import "mocha";

import { expect } from "chai";

import { rxMochaTests, axiosPost$, axiosGet$, ERESPONSETYPE }
  from "../../src/index";

/**
 *
 * Axios Observables tests.
 *
 */
describe("axios", function() {

  rxMochaTests({

    testCaseName: "axios",

    observables: [

      axiosGet$("axios/axios", { baseUrl: "https://github.com" })

    ],

    assertions: [

      (o: any) => expect(o.status).to.be.equal(200)

    ],

    verbose: false

  })

});

describe("axios, domain not found", function() {

  rxMochaTests({

    testCaseName: "axios",

    observables: [

      axiosGet$("https://githubeeff.com/axios/axios")

    ],

    assertions: [

      (o: any) => expect(o.status).to.be.equal(-3008)

    ],

    verbose: false

  })

});

describe("axios, 404", function() {

  rxMochaTests({

    testCaseName: "axios",

    observables: [

      axiosGet$("https://github.com/axios/axiosee")

    ],

    assertions: [

      (o: any) => expect(o.status).to.be.equal(404)

    ],

    verbose: false

  })

});
