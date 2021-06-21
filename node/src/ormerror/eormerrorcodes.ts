/**
 *
 * Enumeration with error codes for ORM operations.
 *
 */
export enum EORMERRORCODES {
  DUPLICATED = "DUPLICATED",
  INVALID_OBJECT_PARAMETERS = "INVALID_OBJECT_PARAMETERS",
  NOT_FOUND = "NOT_FOUND",
  UNSPECIFIED_BACKEND_ERROR = "UNSPECIFIED_BACKEND_ERROR",
  /**
   *
   * An unmet dependency has arisen when trying to operate the object
   * persistance or recovery.
   *
   */
  UNMET_BACKEND_DEPENDENCY = "UNMET_BACKEND_DEPENDENCY",
  ERROR_INSTANTIATING_OBJECT = "ERROR_INSTANTIATING_OBJECT"
}
