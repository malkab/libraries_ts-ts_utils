import * as lodash from "lodash";

/**
 *
 * This class holds a collection of lists and implements several
 * methods to operate on them.
 *
 * This is a generic class where T represents the data type to be
 * added to the lists.
 *
 */
export class ListCollection<T> {

  /**
   *
   * This is the main list holder. It is a map where the key
   * is the name of the list.
   *
   */
  private _data: Map<string, T[]> = new Map<string, T[]>();

  /**
   *
   * Names of the lists.
   *
   */
  private _listNames: string[];

  /**
   *
   * Names of the lists.
   *
   */
  get listNames(): string[] {

    return this._listNames;

  }

  /**
   *
   * Constructor.
   *
   */
  constructor(listNames: string[]) {

    this._listNames = listNames;

    // Init lists
    this._listNames.map((x: string) => this._data.set(x, []));

  }

  /**
   *
   * Adds an item to the end of one list.
   *
   * @param listName    The list name to add the item to.
   * @param data        The item to add.
   * @returns           The list.
   *
   */
  public addToEnd(listName: string, item: T): T[] {

    const l: T[] | undefined = this._data.get(listName);

    if (l) {
      l.push(item);

      const n: T[] | undefined = this._data.get(listName);

      if (n) {

        return n;

      }

    }

    return [];

  }

  /**
   *
   * Pulls the first item from one list. If a filter is provided,
   * pulls the first item that complies with a filter function.
   *
   * @param listName        The name of the list to pull from.
   * @param filter          The filter to get the items to pull.
   * @returns               Returns the pulled item, if any. If no
   *                        pulled item, returns null.
   *
   */
  public pullFromStart(listName: string, filter: (x: T) => boolean): T | undefined {

    const list: T[] | undefined = this._data.get(listName);
    let i: T | undefined;

    if (list) {

      // Check if there is a filter
      if (filter !== null) {

        const f: T[] = list.filter(filter);
        i = f.length > 0 ? f[0] : undefined;

      } else {

        // Check list has elements
        i = list.length > 0 ? list[0]: undefined;

      }

      // Check there are results
      if (i !== undefined) {

        lodash.pull(list, i);

      }

      return i;

    }

    return undefined;

  }

  /**
   *
   * Moves the first item from one list to the end of another. If
   * a filter is provided, it moves the first item that matches
   * the filter. Returns the moved item.
   *
   * @param fromListName      The name of the list to move from.
   * @param toListName        The name of the list to move to.
   * @param filter            The boolean filter to be applied to
   *                          the items at the from list to look for
   *                          the first match.
   * @returns                 The moved item, if any. If no item was
   *                          moved, returns null.
   *
   */
  public moveFromStartToEnd(
    fromListName: string,
    toListName: string,
    filter: (x: T) => boolean
  ): T | undefined {

    let fromList: T[] | undefined = this._data.get(fromListName);
    let i: T | undefined;

    // Check for filter
    if (filter !== undefined) {

      i = this.pullFromStart(fromListName, filter);

    } else {

      if (fromList) {

        // No filter, check if there are items at from list
        i = fromList.length > 0 ? fromList.shift() : undefined;

      }

    }

    // Check there is an item
    if(i !== null) {

      if (i) {

        this.addToEnd(toListName, i);

      }

    }

    return i;

  }

  /**
   *
   * Get all elements found in all lists, with an optional
   * filter. The search will be made in the order of the
   * list names provided to the constructor.
   *
   * @param filter      The boolean filter controlling the search.
   * @returns           An ordered list of items matching the filter.
   *
   */
  public getAllItems(filter: (x: T) => boolean): T[] {

    let a: T[] = [];

    // Default filter
    const f: (x: T) => boolean = filter === null ?
      (x: T) => true : filter

    // Cycle lists and get items matching the filter
    this._listNames.map((x: string) => {

      const l: T[] | undefined = this._data.get(x);

      if (l) {

        a = a.concat(l.filter(f))

      }

    })

    return a;

  }

  /**
   *
   * Pull a certain item from any list it may be. If there are several
   * copies of it in several lists, it removes all of them and
   * return a list with all copies.
   *
   * @param item          The item to pull.
   * @returns             The
   *
   */
  public pullFromAnyList(item: T): T[] {

    const out: T[] = [];

    this._listNames.map((listName: string) => {

      const l: T[] | undefined = this._data.get(listName);

      if (l) {

        l.map((x: T) => {

          if (x === item) {

            out.push(x);

          }

        })

        const n: T[] | undefined = this._data.get(listName);

        if (n) {

          this._data.set(listName, lodash.pull(n, item));

        }

      }

    })

    return out;

  }

  /**
   *
   * Returns a serialization of the lists, with the following
   * structure:
   *
   * {
   *  listNameA: [ serializations of elements],
   *  listNameB: [ serializations of elements]
   * }
   *
   * @param serialFunction      The serialization function to apply
   *                            to items.
   * @returns                   The serialized object.
   *
   */
  public serial(serialFunction: (x: T) => any): any {

    const out: any = {};

    this._listNames.map((x: string) => {

      const l: T[] | undefined = this._data.get(x);

      if (l) { out[x] = l.map((x: T) => serialFunction(x)); }

    })

    return out;

  }

  /**
   *
   * Returns an object with the length of each list.
   *
   * @param filter            Apply a filter to the items to be
   *                          counted.
   * @returns                 An object with the name of the lists
   *                          and the number of filtered items in each
   *                          of them.
   *
   */
  public listLengths(filter: (x: T) => boolean):
  { [ listName: string ]: number } {

    const out: any = {};

    filter = filter === null ? (x: T) => true : filter;

    this._listNames.map((x: string) => {

      const l: T[] | undefined = this._data.get(x);

      if (l) { out[x] = l.filter(filter).length; }

    })

    return out;

  }

  /**
   *
   * Returns the first object of a list, without modifying it.
   *
   */
  public get(listName: string): T | undefined {

    const l: T[] | undefined = this._data.get(listName);

    if (l) { return l[0] };

  }

  /**
   *
   * Adds an item to the end of a list.
   *
   */
  public set(listName: string, item: T): T | undefined {

    const l: T[] | undefined = this._data.get(listName);

    if (l) {

      l.push(item);

      return item;

    }

  }

  /**
   *
   * Returns the total number of elements in all lists.
   *
   */
  public listTotalItems(): number {

    let a: number = 0;

    this._listNames.map((x: string) => {

      const l: T[] | undefined = this._data.get(x);

      if (l) {

        a += l.length;

      }

    })

    return a;

  }

  /**
   *
   * Returns the length of a list.
   *
   *
   * @param listName          The list name.
   * @returns                 Number of elements in it.
   *
   */
  public listLength(listName: string): number | undefined {

    const l: T[] | undefined = this._data.get(listName);

    if (l) { return l.length; }

  }

  /**
   *
   * Move all elements of a list to another.
   *
   * @param fromListName    The list to move elements from.
   * @param toListName      The list to move elements to.
   * @returns               Number of items moved.
   *
   */
  public moveAll(fromListName: string, toListName: string):
  number | undefined {

    const i: number | undefined = this.listLength(fromListName);

    const f: T[] | undefined = this._data.get(toListName);
    const t: T[] | undefined = this._data.get(fromListName);

    if (f && t) {

      this._data.set(toListName, f.concat(t));

      this.listClear(fromListName);

      return i;

    }

  }

  /**
   *
   * Clears a list.
   *
   * @param listName      The list to clear.
   * @returns             Number of items cleared.
   *
   */
  public listClear(listName: string): number | undefined {

    const l: T[] | undefined = this._data.get(listName);

    if (l) {

      const i: number = l.length;

      this._data.set(listName, []);

      return i;

    }

  }

  /**
   *
   * Returns one of the lists.
   *
   * @param listName        The list to retrieve.
   * @returns               The list.
   *
   */
  public getList(listName: string): T[] | undefined {

    const l: T[] | undefined = this._data.get(listName);

    if (l) { return l }

  }

  /**
   *
   * Moves all ocurrences of item from whatever the list they are to
   * the end of another one.
   *
   * @param item          The item to move.
   * @param listName      The list to move to.
   * @returns             The moved items.
   *
   */
  public moveAllToEnd(item: T, listName: string): T[] | undefined {

    const pulled: T[] = this.pullFromAnyList(item);
    const l: T[] | undefined = this._data.get(listName);

    if (l) {

      this._data.set(listName, l.concat(pulled));

      return pulled;

    }

  }

}
