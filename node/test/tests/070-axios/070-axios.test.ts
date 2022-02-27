import "mocha";

import { expect } from "chai";

import { mocha, axios } from "../../../src/index";

/**

  Axios Observables tests.

*/
describe("axios", function() {

  mocha.rxMochaTests({

    testCaseName: "axios",

    observables: [

      axios.axiosGet$("axios/axios", { baseUrl: "https://github.com" }),

      axios.axiosGet$("mhegazy/npm-dependency-test",
        { baseUrl: "https://github.com" }),

    ],

    assertions: [

      (o: axios.IAxiosResponse) => expect(o.status).to.be.equal(200),

      (o: axios.IAxiosResponse) => {

        expect(o.status).to.be.equal(200);

        expect(o.headers.server).to.be.equal("GitHub.com");

        expect(o.headers.connection).to.be.equal("close");

        expect(o.method).to.be.equal("get");

        expect(o.statusText).to.be.equal("OK");

      }

    ],

    verbose: false

  })

});

describe("axios, domain not found", function() {

  mocha.rxMochaTests({

    testCaseName: "axios",

    observables: [

      axios.axiosGet$("https://githubeeff.com/axios/axios")

    ],

    assertions: [

      (o: any) => expect(o.status).to.be.equal(-3008)

    ],

    verbose: false

  })

});

describe("axios, 404", function() {

  mocha.rxMochaTests({

    testCaseName: "axios",

    observables: [

      axios.axiosGet$("https://github.com/axios/axiosee")

    ],

    assertions: [

      (o: any) => expect(o.status).to.be.equal(404)

    ],

    verbose: false

  })

});
