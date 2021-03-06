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
import { CharityFaq } from '../models';
// @ts-ignore
import { CharityFaqInput } from '../models';
// @ts-ignore
import { CharityFundInfo } from '../models';
// @ts-ignore
import { CharityFundInfoResponse } from '../models';
// @ts-ignore
import { CharityFundInput } from '../models';
// @ts-ignore
import { UtilsMoneyJson } from '../models';
/**
 * CharityApi - axios parameter creator
 * @export
 */
export const CharityApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get balance of charity
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityBalanceGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/charity/balance`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
         * @summary Get fund\'s faq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityFaqGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/charity/faq`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
         * @summary Update fund\'s faq
         * @param {CharityFaqInput} [body] faq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityFaqPatch: async (body?: CharityFaqInput, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/charity/faq`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
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
            const nonString = typeof body !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(body !== undefined ? body : {})
                : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get info about fund
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/charity`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
         * @summary Update info about fund
         * @param {CharityFundInput} [body] input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityPatch: async (body?: CharityFundInput, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/charity`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
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
            const nonString = typeof body !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
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
 * CharityApi - functional programming interface
 * @export
 */
export const CharityApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get balance of charity
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCharityBalanceGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UtilsMoneyJson>> {
            const localVarAxiosArgs = await CharityApiAxiosParamCreator(configuration).apiCharityBalanceGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Get fund\'s faq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCharityFaqGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CharityFaq>> {
            const localVarAxiosArgs = await CharityApiAxiosParamCreator(configuration).apiCharityFaqGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Update fund\'s faq
         * @param {CharityFaqInput} [body] faq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCharityFaqPatch(body?: CharityFaqInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CharityFaq>> {
            const localVarAxiosArgs = await CharityApiAxiosParamCreator(configuration).apiCharityFaqPatch(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Get info about fund
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCharityGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CharityFundInfoResponse>> {
            const localVarAxiosArgs = await CharityApiAxiosParamCreator(configuration).apiCharityGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Update info about fund
         * @param {CharityFundInput} [body] input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCharityPatch(body?: CharityFundInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CharityFundInfo>> {
            const localVarAxiosArgs = await CharityApiAxiosParamCreator(configuration).apiCharityPatch(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * CharityApi - factory interface
 * @export
 */
export const CharityApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Get balance of charity
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityBalanceGet(options?: any): AxiosPromise<UtilsMoneyJson> {
            return CharityApiFp(configuration).apiCharityBalanceGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get fund\'s faq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityFaqGet(options?: any): AxiosPromise<CharityFaq> {
            return CharityApiFp(configuration).apiCharityFaqGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update fund\'s faq
         * @param {CharityFaqInput} [body] faq
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityFaqPatch(body?: CharityFaqInput, options?: any): AxiosPromise<CharityFaq> {
            return CharityApiFp(configuration).apiCharityFaqPatch(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get info about fund
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityGet(options?: any): AxiosPromise<CharityFundInfoResponse> {
            return CharityApiFp(configuration).apiCharityGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update info about fund
         * @param {CharityFundInput} [body] input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCharityPatch(body?: CharityFundInput, options?: any): AxiosPromise<CharityFundInfo> {
            return CharityApiFp(configuration).apiCharityPatch(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiCharityFaqPatch operation in CharityApi.
 * @export
 * @interface CharityApiApiCharityFaqPatchRequest
 */
export interface CharityApiApiCharityFaqPatchRequest {
    /**
     * faq
     * @type {CharityFaqInput}
     * @memberof CharityApiApiCharityFaqPatch
     */
    readonly body?: CharityFaqInput
}

/**
 * Request parameters for apiCharityPatch operation in CharityApi.
 * @export
 * @interface CharityApiApiCharityPatchRequest
 */
export interface CharityApiApiCharityPatchRequest {
    /**
     * input
     * @type {CharityFundInput}
     * @memberof CharityApiApiCharityPatch
     */
    readonly body?: CharityFundInput
}

/**
 * CharityApi - object-oriented interface
 * @export
 * @class CharityApi
 * @extends {BaseAPI}
 */
export class CharityApi extends BaseAPI {
    /**
     * 
     * @summary Get balance of charity
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CharityApi
     */
    public apiCharityBalanceGet(options?: any) {
        return CharityApiFp(this.configuration).apiCharityBalanceGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get fund\'s faq
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CharityApi
     */
    public apiCharityFaqGet(options?: any) {
        return CharityApiFp(this.configuration).apiCharityFaqGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update fund\'s faq
     * @param {CharityApiApiCharityFaqPatchRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CharityApi
     */
    public apiCharityFaqPatch(requestParameters: CharityApiApiCharityFaqPatchRequest = {}, options?: any) {
        return CharityApiFp(this.configuration).apiCharityFaqPatch(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get info about fund
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CharityApi
     */
    public apiCharityGet(options?: any) {
        return CharityApiFp(this.configuration).apiCharityGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update info about fund
     * @param {CharityApiApiCharityPatchRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CharityApi
     */
    public apiCharityPatch(requestParameters: CharityApiApiCharityPatchRequest = {}, options?: any) {
        return CharityApiFp(this.configuration).apiCharityPatch(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }
}
