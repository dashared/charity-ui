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
import { AuthEmailConfirmationInput } from '../models';
// @ts-ignore
import { AuthManagerRegistrationInput } from '../models';
// @ts-ignore
import { AuthRegistrationInput } from '../models';
/**
 * RegistrationApi - axios parameter creator
 * @export
 */
export const RegistrationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Confirms email with code from email
         * @summary Confirm email
         * @param {AuthEmailConfirmationInput} request Email confirmation input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRegisterConfirmPost: async (request: AuthEmailConfirmationInput, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling apiRegisterConfirmPost.');
            }
            const localVarPath = `/api/register/confirm`;
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
         * Register another user
         * @summary Register another user from manager
         * @param {AuthManagerRegistrationInput} request Registration input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRegisterManagerPost: async (request: AuthManagerRegistrationInput, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling apiRegisterManagerPost.');
            }
            const localVarPath = `/api/register/manager`;
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
         * Register with this route
         * @summary Register
         * @param {AuthRegistrationInput} request Email registration input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRegisterPost: async (request: AuthRegistrationInput, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling apiRegisterPost.');
            }
            const localVarPath = `/api/register`;
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
    }
};

/**
 * RegistrationApi - functional programming interface
 * @export
 */
export const RegistrationApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Confirms email with code from email
         * @summary Confirm email
         * @param {AuthEmailConfirmationInput} request Email confirmation input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiRegisterConfirmPost(request: AuthEmailConfirmationInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await RegistrationApiAxiosParamCreator(configuration).apiRegisterConfirmPost(request, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Register another user
         * @summary Register another user from manager
         * @param {AuthManagerRegistrationInput} request Registration input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiRegisterManagerPost(request: AuthManagerRegistrationInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await RegistrationApiAxiosParamCreator(configuration).apiRegisterManagerPost(request, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Register with this route
         * @summary Register
         * @param {AuthRegistrationInput} request Email registration input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiRegisterPost(request: AuthRegistrationInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await RegistrationApiAxiosParamCreator(configuration).apiRegisterPost(request, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * RegistrationApi - factory interface
 * @export
 */
export const RegistrationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Confirms email with code from email
         * @summary Confirm email
         * @param {AuthEmailConfirmationInput} request Email confirmation input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRegisterConfirmPost(request: AuthEmailConfirmationInput, options?: any): AxiosPromise<void> {
            return RegistrationApiFp(configuration).apiRegisterConfirmPost(request, options).then((request) => request(axios, basePath));
        },
        /**
         * Register another user
         * @summary Register another user from manager
         * @param {AuthManagerRegistrationInput} request Registration input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRegisterManagerPost(request: AuthManagerRegistrationInput, options?: any): AxiosPromise<void> {
            return RegistrationApiFp(configuration).apiRegisterManagerPost(request, options).then((request) => request(axios, basePath));
        },
        /**
         * Register with this route
         * @summary Register
         * @param {AuthRegistrationInput} request Email registration input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiRegisterPost(request: AuthRegistrationInput, options?: any): AxiosPromise<void> {
            return RegistrationApiFp(configuration).apiRegisterPost(request, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiRegisterConfirmPost operation in RegistrationApi.
 * @export
 * @interface RegistrationApiApiRegisterConfirmPostRequest
 */
export interface RegistrationApiApiRegisterConfirmPostRequest {
    /**
     * Email confirmation input
     * @type {AuthEmailConfirmationInput}
     * @memberof RegistrationApiApiRegisterConfirmPost
     */
    readonly request: AuthEmailConfirmationInput
}

/**
 * Request parameters for apiRegisterManagerPost operation in RegistrationApi.
 * @export
 * @interface RegistrationApiApiRegisterManagerPostRequest
 */
export interface RegistrationApiApiRegisterManagerPostRequest {
    /**
     * Registration input
     * @type {AuthManagerRegistrationInput}
     * @memberof RegistrationApiApiRegisterManagerPost
     */
    readonly request: AuthManagerRegistrationInput
}

/**
 * Request parameters for apiRegisterPost operation in RegistrationApi.
 * @export
 * @interface RegistrationApiApiRegisterPostRequest
 */
export interface RegistrationApiApiRegisterPostRequest {
    /**
     * Email registration input
     * @type {AuthRegistrationInput}
     * @memberof RegistrationApiApiRegisterPost
     */
    readonly request: AuthRegistrationInput
}

/**
 * RegistrationApi - object-oriented interface
 * @export
 * @class RegistrationApi
 * @extends {BaseAPI}
 */
export class RegistrationApi extends BaseAPI {
    /**
     * Confirms email with code from email
     * @summary Confirm email
     * @param {RegistrationApiApiRegisterConfirmPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistrationApi
     */
    public apiRegisterConfirmPost(requestParameters: RegistrationApiApiRegisterConfirmPostRequest, options?: any) {
        return RegistrationApiFp(this.configuration).apiRegisterConfirmPost(requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Register another user
     * @summary Register another user from manager
     * @param {RegistrationApiApiRegisterManagerPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistrationApi
     */
    public apiRegisterManagerPost(requestParameters: RegistrationApiApiRegisterManagerPostRequest, options?: any) {
        return RegistrationApiFp(this.configuration).apiRegisterManagerPost(requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Register with this route
     * @summary Register
     * @param {RegistrationApiApiRegisterPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RegistrationApi
     */
    public apiRegisterPost(requestParameters: RegistrationApiApiRegisterPostRequest, options?: any) {
        return RegistrationApiFp(this.configuration).apiRegisterPost(requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }
}
