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
import { AuthCredentials } from '../models';
/**
 * LoginApi - axios parameter creator
 * @export
 */
export const LoginApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Sets token on success
         * @summary Route for signing in
         * @param {AuthCredentials} request User credentials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLoginPost: async (request: AuthCredentials, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling apiLoginPost.');
            }
            const localVarPath = `/api/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
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
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof request !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(request !== undefined ? request : {})
                : (request || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Route for refreshing
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLoginRefreshPost: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/login/refresh`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
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
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Destroys user session
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLogoutPost: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/logout`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
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
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LoginApi - functional programming interface
 * @export
 */
export const LoginApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Sets token on success
         * @summary Route for signing in
         * @param {AuthCredentials} request User credentials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiLoginPost(request: AuthCredentials, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await LoginApiAxiosParamCreator(configuration).apiLoginPost(request, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Route for refreshing
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiLoginRefreshPost(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await LoginApiAxiosParamCreator(configuration).apiLoginRefreshPost(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Destroys user session
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiLogoutPost(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await LoginApiAxiosParamCreator(configuration).apiLogoutPost(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * LoginApi - factory interface
 * @export
 */
export const LoginApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Sets token on success
         * @summary Route for signing in
         * @param {AuthCredentials} request User credentials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLoginPost(request: AuthCredentials, options?: any): AxiosPromise<void> {
            return LoginApiFp(configuration).apiLoginPost(request, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Route for refreshing
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLoginRefreshPost(options?: any): AxiosPromise<void> {
            return LoginApiFp(configuration).apiLoginRefreshPost(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Destroys user session
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiLogoutPost(options?: any): AxiosPromise<void> {
            return LoginApiFp(configuration).apiLogoutPost(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiLoginPost operation in LoginApi.
 * @export
 * @interface LoginApiApiLoginPostRequest
 */
export interface LoginApiApiLoginPostRequest {
    /**
     * User credentials
     * @type {AuthCredentials}
     * @memberof LoginApiApiLoginPost
     */
    readonly request: AuthCredentials
}

/**
 * LoginApi - object-oriented interface
 * @export
 * @class LoginApi
 * @extends {BaseAPI}
 */
export class LoginApi extends BaseAPI {
    /**
     * Sets token on success
     * @summary Route for signing in
     * @param {LoginApiApiLoginPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginApi
     */
    public apiLoginPost(requestParameters: LoginApiApiLoginPostRequest, options?: any) {
        return LoginApiFp(this.configuration).apiLoginPost(requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Route for refreshing
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginApi
     */
    public apiLoginRefreshPost(options?: any) {
        return LoginApiFp(this.configuration).apiLoginRefreshPost(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Destroys user session
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginApi
     */
    public apiLogoutPost(options?: any) {
        return LoginApiFp(this.configuration).apiLogoutPost(options).then((request) => request(this.axios, this.basePath));
    }
}
