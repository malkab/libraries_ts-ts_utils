import { TsUtilsMaps, TsUtilsArray } from "../../src/index";

const testArray: any[] = [

  {
    name: "A00",
    data: "D00"
  },

  {
    name: "A01",
    data: "D01"
  },

  {
    name: "A02",
    data: "D02"
  }

]

const out: Map<string, any> =
  TsUtilsMaps.fromArray<string, any>(testArray, (x: any) => x.data);

class X {

  public name: string;

  public data: number;

  constructor(name: string, data: number) {

    this.name = name;
    this.data = data;

  }

}

const ta: X[] = [

  new X("A00", 0),
  new X("A01", 1),
  new X("A02", 2)

]

const o: Map<number, X> =
  TsUtilsMaps.fromArray<number, X>(ta, (x: X) => x.data);
