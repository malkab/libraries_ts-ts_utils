import * as rx from "rxjs";

const axiosLib = require("axios").default;

/**
 *
 * This module encapsulates Axios as Observables.
 *
 */

/**
 *
 * Axios response.
 *
 */
export interface IAxiosResponse {
  /** Request data. */
  data: any;
  /** HTTP status of the request. */
  status: number;
  /** Text of the HTTP status. */
  statusText: string;
  /** Set of headers. */
  headers: any;
  /** Method used in the request. */
  method: string;
}

/**
 *
 * Perform an Axios request.
 *
 * @param method
 * Method to use in the request (GET / POST).
 *
 * @param url
 * URL to throw the request at.
 *
 * @param responseType
 * Type of response: stream, json, document, text.
 *
 * @returns
 * An IAxiosResponse with details of the request response.
 *
 */
export function axios({
    method,
    url,
    responseType
  }: {
    method: "get" | "post";
    url: string;
    responseType?: "stream" | "json" | "document" | "text";
}): rx.Observable<IAxiosResponse> {

  return new rx.Observable<IAxiosResponse>((obs: any) => {

    axiosLib({
      method: method,
      url: url,
      responseType: responseType
    })
    .then((o: any) => {

      obs.next(<IAxiosResponse>{
        data: o.data,
        headers: o.headers,
        method: o.config.method,
        status: o.status,
        statusText: o.statusText
      });

      obs.complete();

    })
    .catch((o: any) => {

      if (o.errno) {

        obs.error(<IAxiosResponse>{
          headers: o.config.headers,
          method: o.config.method,
          status: o.errno,
          statusText: o.code,
          data: o.config.data
        });

      } else {

        obs.error(<IAxiosResponse>{
          headers: o.response.headers,
          method: o.response.config.method,
          status: o.response.status,
          statusText: o.response.statusText,
          data: o.response.data
        });

      }

      obs.complete();

    })

  })

}
