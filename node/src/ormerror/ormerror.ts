import { EORMERRORCODES } from "./eormerrorcodes";

/**
 *
 * Error for ORM operations.
 *
 */
export class OrmError extends Error {

  /**
   *
   * The ORM error code.
   *
   */
  get OrmErrorCode(): EORMERRORCODES { return this._OrmErrorCode }
  private _OrmErrorCode: EORMERRORCODES;

  /**
   *
   * Constructor.
   *
   */
  constructor(error: Error, OrmErrorCode: EORMERRORCODES,
    messagePrefix: string = "") {

    super(`${messagePrefix}${error.message}`);

    Object.assign(this, error);

    this._OrmErrorCode = OrmErrorCode;

  }

}
