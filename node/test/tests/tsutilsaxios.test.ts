import "mocha";

import { expect } from "chai";

import { rxMochaTests, axios } from "../../src/index";

/**
 *
 * Axios Observables tests.
 *
 */
describe("axios", function() {

  rxMochaTests({

    testCaseName: "axios",

    observables: [ axios({
      method: "get",
      url: "https://github.com/axios/axios",
      responseType: "text"
    }) ],

    assertions: [

      (o: any) => expect(o.status).to.be.equal(200)

    ],

    verbose: false

  })

});

describe("axios, domain not found", function() {

  rxMochaTests({

    testCaseName: "axios",

    observables: [ axios({
      method: "get",
      url: "https://githubeeff.com/axios/axios",
      responseType: "text"
    }) ],

    assertions: [

      (o: any) => expect(o.status).to.be.equal(-3008)

    ],

    verbose: false

  })

});

describe("axios, 404", function() {

  rxMochaTests({

    testCaseName: "axios",

    observables: [ axios({
      method: "get",
      url: "https://github.com/axios/axiosee",
      responseType: "text"
    }) ],

    assertions: [

      (o: any) => expect(o.status).to.be.equal(404)

    ],

    verbose: false

  })

});
