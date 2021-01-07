/* tslint:disable */
/* eslint-disable */
/**
 * Charity API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { DonationRequestBody } from '../models';
// @ts-ignore
import { DonationRequestDonationRequest } from '../models';
// @ts-ignore
import { DonationRequestInput } from '../models';
// @ts-ignore
import { DonationRequestResponse } from '../models';
// @ts-ignore
import { DonationRequestUpdateInput } from '../models';
/**
 * DonationRequestApi - axios parameter creator
 * @export
 */
export const DonationRequestApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Retrieves all donation requests
     * @param {number} [page] Page number
     * @param {number} [size] Page size
     * @param {string} [sort] sort
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestGet: async (page?: number, size?: number, sort?: string, options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/donation-request/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (page !== undefined) {
        localVarQueryParameter['page'] = page;
      }

      if (size !== undefined) {
        localVarQueryParameter['size'] = size;
      }

      if (sort !== undefined) {
        localVarQueryParameter['sort'] = sort;
      }



      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Retrieves donation request based on given ID
     * @param {number} id Donation request ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestIdGet: async (id: number, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id', 'Required parameter id was null or undefined when calling donationRequestIdGet.');
      }
      const localVarPath = `/donation-request/{id}`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;



      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary RollBacks status of donation request
     * @param {number} id donation request id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestIdStatusDelete: async (id: number, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id', 'Required parameter id was null or undefined when calling donationRequestIdStatusDelete.');
      }
      const localVarPath = `/donation-request/{id}/status`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;



      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Updates status of donation request
     * @param {number} id donation request id
     * @param {DonationRequestUpdateInput} [input] Status and message
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestIdStatusPatch: async (id: number, input?: DonationRequestUpdateInput, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id', 'Required parameter id was null or undefined when calling donationRequestIdStatusPatch.');
      }
      const localVarPath = `/donation-request/{id}/status`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;



      localVarHeaderParameter['Content-Type'] = 'application/json';

      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      const nonString = typeof input !== 'string';
      const needsSerialization = nonString && configuration && configuration.isJsonMime
        ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
        : nonString;
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(input !== undefined ? input : {})
        : (input || "");

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Creates donation request
     * @param {DonationRequestInput} request Donation request Input
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestPost: async (request: DonationRequestInput, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'request' is not null or undefined
      if (request === null || request === undefined) {
        throw new RequiredError('request', 'Required parameter request was null or undefined when calling donationRequestPost.');
      }
      const localVarPath = `/donation-request`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;



      localVarHeaderParameter['Content-Type'] = 'application/json';

      const queryParameters = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        queryParameters.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.query) {
        queryParameters.set(key, options.query[key]);
      }
      localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      const nonString = typeof request !== 'string';
      const needsSerialization = nonString && configuration && configuration.isJsonMime
        ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
        : nonString;
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(request !== undefined ? request : {})
        : (request || "");

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * DonationRequestApi - functional programming interface
 * @export
 */
export const DonationRequestApiFp = function (configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Retrieves all donation requests
     * @param {number} [page] Page number
     * @param {number} [size] Page size
     * @param {string} [sort] sort
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async donationRequestGet(page?: number, size?: number, sort?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DonationRequestResponse>> {
      const localVarAxiosArgs = await DonationRequestApiAxiosParamCreator(configuration).donationRequestGet(page, size, sort, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 
     * @summary Retrieves donation request based on given ID
     * @param {number} id Donation request ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async donationRequestIdGet(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DonationRequestBody>> {
      const localVarAxiosArgs = await DonationRequestApiAxiosParamCreator(configuration).donationRequestIdGet(id, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 
     * @summary RollBacks status of donation request
     * @param {number} id donation request id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async donationRequestIdStatusDelete(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DonationRequestDonationRequest>> {
      const localVarAxiosArgs = await DonationRequestApiAxiosParamCreator(configuration).donationRequestIdStatusDelete(id, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 
     * @summary Updates status of donation request
     * @param {number} id donation request id
     * @param {DonationRequestUpdateInput} [input] Status and message
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async donationRequestIdStatusPatch(id: number, input?: DonationRequestUpdateInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DonationRequestResponse>> {
      const localVarAxiosArgs = await DonationRequestApiAxiosParamCreator(configuration).donationRequestIdStatusPatch(id, input, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 
     * @summary Creates donation request
     * @param {DonationRequestInput} request Donation request Input
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async donationRequestPost(request: DonationRequestInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await DonationRequestApiAxiosParamCreator(configuration).donationRequestPost(request, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
        return axios.request(axiosRequestArgs);
      };
    },
  }
};

/**
 * DonationRequestApi - factory interface
 * @export
 */
export const DonationRequestApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
  return {
    /**
     * 
     * @summary Retrieves all donation requests
     * @param {number} [page] Page number
     * @param {number} [size] Page size
     * @param {string} [sort] sort
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestGet(page?: number, size?: number, sort?: string, options?: any): AxiosPromise<DonationRequestResponse> {
      return DonationRequestApiFp(configuration).donationRequestGet(page, size, sort, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Retrieves donation request based on given ID
     * @param {number} id Donation request ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestIdGet(id: number, options?: any): AxiosPromise<DonationRequestBody> {
      return DonationRequestApiFp(configuration).donationRequestIdGet(id, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary RollBacks status of donation request
     * @param {number} id donation request id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestIdStatusDelete(id: number, options?: any): AxiosPromise<DonationRequestDonationRequest> {
      return DonationRequestApiFp(configuration).donationRequestIdStatusDelete(id, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Updates status of donation request
     * @param {number} id donation request id
     * @param {DonationRequestUpdateInput} [input] Status and message
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestIdStatusPatch(id: number, input?: DonationRequestUpdateInput, options?: any): AxiosPromise<DonationRequestResponse> {
      return DonationRequestApiFp(configuration).donationRequestIdStatusPatch(id, input, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Creates donation request
     * @param {DonationRequestInput} request Donation request Input
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    donationRequestPost(request: DonationRequestInput, options?: any): AxiosPromise<void> {
      return DonationRequestApiFp(configuration).donationRequestPost(request, options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for donationRequestGet operation in DonationRequestApi.
 * @export
 * @interface DonationRequestApiDonationRequestGetRequest
 */
export interface DonationRequestApiDonationRequestGetRequest {
  /**
   * Page number
   * @type {number}
   * @memberof DonationRequestApiDonationRequestGet
   */
  readonly page?: number

  /**
   * Page size
   * @type {number}
   * @memberof DonationRequestApiDonationRequestGet
   */
  readonly size?: number

  /**
   * sort
   * @type {string}
   * @memberof DonationRequestApiDonationRequestGet
   */
  readonly sort?: string
}

/**
 * Request parameters for donationRequestIdGet operation in DonationRequestApi.
 * @export
 * @interface DonationRequestApiDonationRequestIdGetRequest
 */
export interface DonationRequestApiDonationRequestIdGetRequest {
  /**
   * Donation request ID
   * @type {number}
   * @memberof DonationRequestApiDonationRequestIdGet
   */
  readonly id: number
}

/**
 * Request parameters for donationRequestIdStatusDelete operation in DonationRequestApi.
 * @export
 * @interface DonationRequestApiDonationRequestIdStatusDeleteRequest
 */
export interface DonationRequestApiDonationRequestIdStatusDeleteRequest {
  /**
   * donation request id
   * @type {number}
   * @memberof DonationRequestApiDonationRequestIdStatusDelete
   */
  readonly id: number
}

/**
 * Request parameters for donationRequestIdStatusPatch operation in DonationRequestApi.
 * @export
 * @interface DonationRequestApiDonationRequestIdStatusPatchRequest
 */
export interface DonationRequestApiDonationRequestIdStatusPatchRequest {
  /**
   * donation request id
   * @type {number}
   * @memberof DonationRequestApiDonationRequestIdStatusPatch
   */
  readonly id: number

  /**
   * Status and message
   * @type {DonationRequestUpdateInput}
   * @memberof DonationRequestApiDonationRequestIdStatusPatch
   */
  readonly input?: DonationRequestUpdateInput
}

/**
 * Request parameters for donationRequestPost operation in DonationRequestApi.
 * @export
 * @interface DonationRequestApiDonationRequestPostRequest
 */
export interface DonationRequestApiDonationRequestPostRequest {
  /**
   * Donation request Input
   * @type {DonationRequestInput}
   * @memberof DonationRequestApiDonationRequestPost
   */
  readonly request: DonationRequestInput
}

/**
 * DonationRequestApi - object-oriented interface
 * @export
 * @class DonationRequestApi
 * @extends {BaseAPI}
 */
export class DonationRequestApi extends BaseAPI {
  /**
   * 
   * @summary Retrieves all donation requests
   * @param {DonationRequestApiDonationRequestGetRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DonationRequestApi
   */
  public donationRequestGet(requestParameters: DonationRequestApiDonationRequestGetRequest = {}, options?: any) {
    return DonationRequestApiFp(this.configuration).donationRequestGet(requestParameters.page, requestParameters.size, requestParameters.sort, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   * 
   * @summary Retrieves donation request based on given ID
   * @param {DonationRequestApiDonationRequestIdGetRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DonationRequestApi
   */
  public donationRequestIdGet(requestParameters: DonationRequestApiDonationRequestIdGetRequest, options?: any) {
    return DonationRequestApiFp(this.configuration).donationRequestIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   * 
   * @summary RollBacks status of donation request
   * @param {DonationRequestApiDonationRequestIdStatusDeleteRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DonationRequestApi
   */
  public donationRequestIdStatusDelete(requestParameters: DonationRequestApiDonationRequestIdStatusDeleteRequest, options?: any) {
    return DonationRequestApiFp(this.configuration).donationRequestIdStatusDelete(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   * 
   * @summary Updates status of donation request
   * @param {DonationRequestApiDonationRequestIdStatusPatchRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DonationRequestApi
   */
  public donationRequestIdStatusPatch(requestParameters: DonationRequestApiDonationRequestIdStatusPatchRequest, options?: any) {
    return DonationRequestApiFp(this.configuration).donationRequestIdStatusPatch(requestParameters.id, requestParameters.input, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   * 
   * @summary Creates donation request
   * @param {DonationRequestApiDonationRequestPostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DonationRequestApi
   */
  public donationRequestPost(requestParameters: DonationRequestApiDonationRequestPostRequest, options?: any) {
    return DonationRequestApiFp(this.configuration).donationRequestPost(requestParameters.request, options).then((request) => request(this.axios, this.basePath));
  }
}
