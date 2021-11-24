import * as rx from "rxjs";

// const axiosLib = require("axios").default;

import post from "axios";

import get from "axios";

import { URLSearchParams } from "url";

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
 * Response type.
 *
 */
export enum ERESPONSETYPE {
  stream = "stream",
  json = "json",
  document = "document",
  text = "text"
}

/**
 *
 * Performs an Axios POST.
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
export function axiosPost$(
  url: string,
  {
    baseUrl,
    responseType,
    xWwwFormUrlEncoded,
    params
  }: {
    baseUrl: string | undefined;
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
      url: url,
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
 *
 * Performs an Axios GET.
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
 export function axiosGet$(
  url: string,
  {
    baseUrl,
    responseType,
    xWwwFormUrlEncoded,
    params
  }: {
    baseUrl: string | undefined;
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
      url: url,
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
