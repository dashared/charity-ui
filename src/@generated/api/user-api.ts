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
import { UserEditableInfo } from '../models';
// @ts-ignore
import { UserResponse } from '../models';
// @ts-ignore
import { UserUser } from '../models';
/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * 
     * @summary GetAllUsers
     * @param {number} [page] Page number
     * @param {number} [size] Page size
     * @param {string} [sort] sort
     * @param {Array<string>} [role] User role
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiUserGet: async (page?: number, size?: number, sort?: string, role?: Array<string>, options: any = {}): Promise<RequestArgs> => {
      const localVarPath = `/api/user`;
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
      // role=a&role=b
      if (role) {
        for (const index in role) {
          queryParameters.append('role', role[index]);
        }
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
     * @summary Block or unblock user
     * @param {string} id User id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiUserIdBlockPatch: async (id: string, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id', 'Required parameter id was null or undefined when calling apiUserIdBlockPatch.');
      }
      const localVarPath = `/api/user/{id}/block`
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
     * @summary Retrieves user based on given ID
     * @param {string} id User ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiUserIdGet: async (id: string, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id', 'Required parameter id was null or undefined when calling apiUserIdGet.');
      }
      const localVarPath = `/api/user/{id}`
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
     * @summary Update user info
     * @param {string} id User id
     * @param {UserEditableInfo} [body] Input
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiUserIdPatch: async (id: string, body?: UserEditableInfo, options: any = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id', 'Required parameter id was null or undefined when calling apiUserIdPatch.');
      }
      const localVarPath = `/api/user/{id}`
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
      const nonString = typeof body !== 'string';
      const needsSerialization = nonString && configuration && configuration.isJsonMime
        ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
        : nonString;
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : (body || "");

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function (configuration?: Configuration) {
  return {
    /**
     * 
     * @summary GetAllUsers
     * @param {number} [page] Page number
     * @param {number} [size] Page size
     * @param {string} [sort] sort
     * @param {Array<string>} [role] User role
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiUserGet(page?: number, size?: number, sort?: string, role?: Array<string>, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserResponse>> {
      const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).apiUserGet(page, size, sort, role, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 
     * @summary Block or unblock user
     * @param {string} id User id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiUserIdBlockPatch(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserUser>> {
      const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).apiUserIdBlockPatch(id, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 
     * @summary Retrieves user based on given ID
     * @param {string} id User ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiUserIdGet(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserUser>> {
      const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).apiUserIdGet(id, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * 
     * @summary Update user info
     * @param {string} id User id
     * @param {UserEditableInfo} [body] Input
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiUserIdPatch(id: string, body?: UserEditableInfo, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserUser>> {
      const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).apiUserIdPatch(id, body, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs = { ...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url };
        return axios.request(axiosRequestArgs);
      };
    },
  }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
  return {
    /**
     * 
     * @summary GetAllUsers
     * @param {number} [page] Page number
     * @param {number} [size] Page size
     * @param {string} [sort] sort
     * @param {Array<string>} [role] User role
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiUserGet(page?: number, size?: number, sort?: string, role?: Array<string>, options?: any): AxiosPromise<UserResponse> {
      return UserApiFp(configuration).apiUserGet(page, size, sort, role, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Block or unblock user
     * @param {string} id User id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiUserIdBlockPatch(id: string, options?: any): AxiosPromise<UserUser> {
      return UserApiFp(configuration).apiUserIdBlockPatch(id, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Retrieves user based on given ID
     * @param {string} id User ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiUserIdGet(id: string, options?: any): AxiosPromise<UserUser> {
      return UserApiFp(configuration).apiUserIdGet(id, options).then((request) => request(axios, basePath));
    },
    /**
     * 
     * @summary Update user info
     * @param {string} id User id
     * @param {UserEditableInfo} [body] Input
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiUserIdPatch(id: string, body?: UserEditableInfo, options?: any): AxiosPromise<UserUser> {
      return UserApiFp(configuration).apiUserIdPatch(id, body, options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for apiUserGet operation in UserApi.
 * @export
 * @interface UserApiApiUserGetRequest
 */
export interface UserApiApiUserGetRequest {
  /**
   * Page number
   * @type {number}
   * @memberof UserApiApiUserGet
   */
  readonly page?: number

  /**
   * Page size
   * @type {number}
   * @memberof UserApiApiUserGet
   */
  readonly size?: number

  /**
   * sort
   * @type {string}
   * @memberof UserApiApiUserGet
   */
  readonly sort?: string

  /**
   * User role
   * @type {Array<string>}
   * @memberof UserApiApiUserGet
   */
  readonly role?: Array<string>
}

/**
 * Request parameters for apiUserIdBlockPatch operation in UserApi.
 * @export
 * @interface UserApiApiUserIdBlockPatchRequest
 */
export interface UserApiApiUserIdBlockPatchRequest {
  /**
   * User id
   * @type {string}
   * @memberof UserApiApiUserIdBlockPatch
   */
  readonly id: string
}

/**
 * Request parameters for apiUserIdGet operation in UserApi.
 * @export
 * @interface UserApiApiUserIdGetRequest
 */
export interface UserApiApiUserIdGetRequest {
  /**
   * User ID
   * @type {string}
   * @memberof UserApiApiUserIdGet
   */
  readonly id: string
}

/**
 * Request parameters for apiUserIdPatch operation in UserApi.
 * @export
 * @interface UserApiApiUserIdPatchRequest
 */
export interface UserApiApiUserIdPatchRequest {
  /**
   * User id
   * @type {string}
   * @memberof UserApiApiUserIdPatch
   */
  readonly id: string

  /**
   * Input
   * @type {UserEditableInfo}
   * @memberof UserApiApiUserIdPatch
   */
  readonly body?: UserEditableInfo
}

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
  /**
   * 
   * @summary GetAllUsers
   * @param {UserApiApiUserGetRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public apiUserGet(requestParameters: UserApiApiUserGetRequest = {}, options?: any) {
    return UserApiFp(this.configuration).apiUserGet(requestParameters.page, requestParameters.size, requestParameters.sort, requestParameters.role, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   * 
   * @summary Block or unblock user
   * @param {UserApiApiUserIdBlockPatchRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public apiUserIdBlockPatch(requestParameters: UserApiApiUserIdBlockPatchRequest, options?: any) {
    return UserApiFp(this.configuration).apiUserIdBlockPatch(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   * 
   * @summary Retrieves user based on given ID
   * @param {UserApiApiUserIdGetRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public apiUserIdGet(requestParameters: UserApiApiUserIdGetRequest, options?: any) {
    return UserApiFp(this.configuration).apiUserIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
  }

  /**
   * 
   * @summary Update user info
   * @param {UserApiApiUserIdPatchRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public apiUserIdPatch(requestParameters: UserApiApiUserIdPatchRequest, options?: any) {
    return UserApiFp(this.configuration).apiUserIdPatch(requestParameters.id, requestParameters.body, options).then((request) => request(this.axios, this.basePath));
  }
}
