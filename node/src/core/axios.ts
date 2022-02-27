import * as rx from "rxjs";

import post from "axios";

import get from "axios";

import { URLSearchParams } from "url";


/**

  This module encapsulates Axios as Observables.

*/
export module axios {

/**

  Axios response.

*/
export interface IAxiosResponse {
  /**

    Request data.

  */
  data: any;
  /**

    HTTP status of the request.

  */
  status: number;
  /**

    Text of the HTTP status.

  */
  statusText: string;
  /**

    Set of headers.

  */
  headers: any;
  /**

    Method used in the request.

   */
  method: string;
}

/**

  Response type.

*/
export enum ERESPONSETYPE {
  stream = "stream",
  json = "json",
  document = "document",
  text = "text"
}

/**

  Performs an Axios POST.

  @param resource
  Resource to retrieve from the **baseUrl**, if any. Can be the full URL of
  the resource if there is no **baseUrl**.

  @param options
  Options for the request:

  - **baseUrl:** base URL. The **resource** fill be look for in this base URL.
  - **responseType:** type of response to ask for.
  - **xWwwFormUrlEncoded:** flag for a WWW form encoding.
  - **params:** additional params for the request.

  @returns
  An Observable with an IAxiosResponse with details of the request response.

*/
export function axiosPost$(
  resource: string,
  {
    baseUrl,
    responseType,
    xWwwFormUrlEncoded,
    params
  }: {
    baseUrl?: string;
    responseType?: ERESPONSETYPE;
    xWwwFormUrlEncoded?: boolean;
    params?: any;
  } = {
    baseUrl: undefined,
    responseType: ERESPONSETYPE.text,
    xWwwFormUrlEncoded: false,
    params: {}
  }
): rx.Observable<IAxiosResponse> {

  return new rx.Observable<IAxiosResponse>((obs: any) => {

    // Check params
    const paramsUrl: any = new URLSearchParams();

    if (params)
      Object.keys(params).map((x: string) => paramsUrl.append(x, params[x]));

    // Check x-www-form-urlencoded
    let headers: any = {};

    if (xWwwFormUrlEncoded) headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    post({
      baseURL: baseUrl,
      url: resource,
      responseType: responseType,
      headers: headers,
      params: paramsUrl
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

/**

  Performs an Axios GET.

  @param resource
  Resource to retrieve from the **baseUrl**, if any. Can be the full URL of
  the resource if there is no **baseUrl**.

  @param options
  Options for the request:

  - **baseUrl:** base URL. The **resource** fill be look for in this base URL.
  - **responseType:** type of response to ask for.
  - **xWwwFormUrlEncoded:** flag for a WWW form encoding.
  - **params:** additional params for the request.

  @returns
  An Observable with an IAxiosResponse with details of the request response.

*/
export function axiosGet$(
  resource: string,
  {
    baseUrl,
    responseType,
    xWwwFormUrlEncoded,
    params
  }: {
    baseUrl?: string;
    responseType?: ERESPONSETYPE;
    xWwwFormUrlEncoded?: boolean;
    params?: any;
  } = {
    baseUrl: undefined,
    responseType: ERESPONSETYPE.text,
    xWwwFormUrlEncoded: false,
    params: {}
  }
): rx.Observable<IAxiosResponse> {

  return new rx.Observable<IAxiosResponse>((obs: any) => {

    // Check params
    const paramsUrl: any = new URLSearchParams();

    if (params)
      Object.keys(params).map((x: string) => paramsUrl.append(x, params[x]));

    // Check x-www-form-urlencoded
    let headers: any = {};

    if (xWwwFormUrlEncoded) headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    get({
      baseURL: baseUrl,
      url: resource,
      responseType: responseType,
      headers: headers,
      params: paramsUrl
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

}
