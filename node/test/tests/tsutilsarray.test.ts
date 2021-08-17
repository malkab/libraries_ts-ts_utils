// import "mocha";

// import { expect } from "chai";

// import { TsUtilsArray } from "../../src/index";

// import { A } from "./testclasses";

// describe("ts-utils-array tests", function() {

//     it("sortDiscreteArrayByOcurrences", function() {

//         expect(
//             TsUtilsArray.sortDiscreteArrayByOcurrences(
//                 [ "0", "2", "2", "0", "3", 1, "4", 4, 4, 4, 5 ]
//             )
//         ).to.deep.equal([

//             [ 4, 3 ],

//             [ "0", 2 ],

//             [ "2", 2 ],

//             [ "3", 1 ],

//             [ 1, 1 ],

//             [ "4", 1 ],

//             [ 5, 1 ]

//         ]);

//     });

//     it("mapNested", function() {

//         const arr: any = [ 1, 3, 2, [ 2, [ 2 ] ], 4, [ [ 2 ] ] ];

//         const res = TsUtilsArray.mapNested(arr, (x) => x * 2);

//         expect(res).to.deep.equal(
//             [ 2, 6, 4, [ 4, [ 4 ] ], 8, [ [ 4 ] ] ]
//         );

//     });

//     it("deepUniqueArray", function() {

//         const a0: A = new A("a", 0);

//         const a1: A = new A("a", 0);

//         const a2: A = new A("b", 0);

//         const a3: A = new A("b", 0);

//         const a4: A = new A("b", 0);

//         const a5: A = new A("b", 1);

//         const a6: A = new A("b", 0);

//         expect(TsUtilsArray.deepUniqueArray(
//             [ a0, a1, a2, a3, a4, a5, a6 ]
//         )).to.deep.equal([
//             new A("a", 0), new A("b", 0), new A("b", 1)
//         ]);

//     });

// });
