import "mocha";

import { expect } from "chai";

import { TsUtilsFormattedOutput } from "../../lib/index";



describe("TsUtilsFormattedOutput", function() {

  const fo: TsUtilsFormattedOutput = new TsUtilsFormattedOutput({});

  it("log", function() { 

    expect(

      fo.log(),
      "log without params"

    ).to.deep.equal("\n");


    expect(

      fo.log("message").length,
      "log with message"

    ).to.equal(33);

  });





  it("logError", function() { 

    expect(

      fo.logError("message").length,
      "with message"

    ).to.equal(40);


    expect(

      fo.logError(
        "message", 
        new Error("this is a terrible mistake")
      ).length,
      "with message and error"

    ).to.equal(75);

  });





  it("hashmapPrettyPrint", function() { 

    const obj: { [ key: string ]: any } = {

      averyveryveryverylenghtlykey: "a very lenghtly value",
      somewhatshorter: "shorter, indeed",
      a: 0

    }



    expect(

      fo.hashmapPrettyPrint({ hashmap: obj }),
      "no options"

    ).to.equal(`a                            : 0
averyveryveryverylenghtlykey : a very lenghtly value
somewhatshorter              : shorter, indeed`);



    expect(

      fo.hashmapPrettyPrint({
        hashmap: obj,  
        gap: 5, 
        separator: " >", 
        exclude: [ "a" ] 
      }),
      "with options, adding exclude"

    ).to.equal(`averyveryveryverylenghtlykey >     a very lenghtly value
somewhatshorter              >     shorter, indeed`);



    expect(

      fo.hashmapPrettyPrint({
        hashmap: obj, 
        gap: 1, 
        separator: " >", 
        include: [ "a", "somewhatshorter" ]
      }),
      "with options, adding include"

    ).to.equal(`a               > 0
somewhatshorter > shorter, indeed`);


    expect(

      fo.hashmapPrettyPrint({
        hashmap: obj, 
        gap: 1, 
        separator: " >",
        reverse: true
      }),
      "with options, reverse sort"

    ).to.equal(`somewhatshorter              > shorter, indeed
averyveryveryverylenghtlykey > a very lenghtly value
a                            > 0`);

  });

})