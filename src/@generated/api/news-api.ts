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
import { NewsInput } from '../models';
// @ts-ignore
import { NewsResponse } from '../models';
// @ts-ignore
import { NewsView } from '../models';
/**
 * NewsApi - axios parameter creator
 * @export
 */
export const NewsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get all news with pagination
         * @param {number} [page] Page number
         * @param {number} [size] Page size
         * @param {string} [sort] Sort param
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsGet: async (page?: number, size?: number, sort?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/news`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
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
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Deletes one news entity
         * @param {string} id News entity id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsIdDelete: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiNewsIdDelete.');
            }
            const localVarPath = `/api/news/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * @summary Get one news entity
         * @param {string} id News entity id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsIdGet: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiNewsIdGet.');
            }
            const localVarPath = `/api/news/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
         * @summary Edit one news entity
         * @param {string} id News id
         * @param {NewsInput} [body] News input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsIdPatch: async (id: string, body?: NewsInput, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiNewsIdPatch.');
            }
            const localVarPath = `/api/news/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
         * @summary Creates news entity
         * @param {NewsInput} [body] News input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsPost: async (body?: NewsInput, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/news`;
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
 * NewsApi - functional programming interface
 * @export
 */
export const NewsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get all news with pagination
         * @param {number} [page] Page number
         * @param {number} [size] Page size
         * @param {string} [sort] Sort param
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiNewsGet(page?: number, size?: number, sort?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NewsResponse>> {
            const localVarAxiosArgs = await NewsApiAxiosParamCreator(configuration).apiNewsGet(page, size, sort, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Deletes one news entity
         * @param {string} id News entity id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiNewsIdDelete(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NewsView>> {
            const localVarAxiosArgs = await NewsApiAxiosParamCreator(configuration).apiNewsIdDelete(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Get one news entity
         * @param {string} id News entity id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiNewsIdGet(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NewsView>> {
            const localVarAxiosArgs = await NewsApiAxiosParamCreator(configuration).apiNewsIdGet(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Edit one news entity
         * @param {string} id News id
         * @param {NewsInput} [body] News input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiNewsIdPatch(id: string, body?: NewsInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NewsView>> {
            const localVarAxiosArgs = await NewsApiAxiosParamCreator(configuration).apiNewsIdPatch(id, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Creates news entity
         * @param {NewsInput} [body] News input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiNewsPost(body?: NewsInput, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<NewsView>> {
            const localVarAxiosArgs = await NewsApiAxiosParamCreator(configuration).apiNewsPost(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * NewsApi - factory interface
 * @export
 */
export const NewsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Get all news with pagination
         * @param {number} [page] Page number
         * @param {number} [size] Page size
         * @param {string} [sort] Sort param
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsGet(page?: number, size?: number, sort?: string, options?: any): AxiosPromise<NewsResponse> {
            return NewsApiFp(configuration).apiNewsGet(page, size, sort, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Deletes one news entity
         * @param {string} id News entity id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsIdDelete(id: string, options?: any): AxiosPromise<NewsView> {
            return NewsApiFp(configuration).apiNewsIdDelete(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get one news entity
         * @param {string} id News entity id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsIdGet(id: string, options?: any): AxiosPromise<NewsView> {
            return NewsApiFp(configuration).apiNewsIdGet(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Edit one news entity
         * @param {string} id News id
         * @param {NewsInput} [body] News input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsIdPatch(id: string, body?: NewsInput, options?: any): AxiosPromise<NewsView> {
            return NewsApiFp(configuration).apiNewsIdPatch(id, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Creates news entity
         * @param {NewsInput} [body] News input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiNewsPost(body?: NewsInput, options?: any): AxiosPromise<NewsView> {
            return NewsApiFp(configuration).apiNewsPost(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiNewsGet operation in NewsApi.
 * @export
 * @interface NewsApiApiNewsGetRequest
 */
export interface NewsApiApiNewsGetRequest {
    /**
     * Page number
     * @type {number}
     * @memberof NewsApiApiNewsGet
     */
    readonly page?: number

    /**
     * Page size
     * @type {number}
     * @memberof NewsApiApiNewsGet
     */
    readonly size?: number

    /**
     * Sort param
     * @type {string}
     * @memberof NewsApiApiNewsGet
     */
    readonly sort?: string
}

/**
 * Request parameters for apiNewsIdDelete operation in NewsApi.
 * @export
 * @interface NewsApiApiNewsIdDeleteRequest
 */
export interface NewsApiApiNewsIdDeleteRequest {
    /**
     * News entity id
     * @type {string}
     * @memberof NewsApiApiNewsIdDelete
     */
    readonly id: string
}

/**
 * Request parameters for apiNewsIdGet operation in NewsApi.
 * @export
 * @interface NewsApiApiNewsIdGetRequest
 */
export interface NewsApiApiNewsIdGetRequest {
    /**
     * News entity id
     * @type {string}
     * @memberof NewsApiApiNewsIdGet
     */
    readonly id: string
}

/**
 * Request parameters for apiNewsIdPatch operation in NewsApi.
 * @export
 * @interface NewsApiApiNewsIdPatchRequest
 */
export interface NewsApiApiNewsIdPatchRequest {
    /**
     * News id
     * @type {string}
     * @memberof NewsApiApiNewsIdPatch
     */
    readonly id: string

    /**
     * News input
     * @type {NewsInput}
     * @memberof NewsApiApiNewsIdPatch
     */
    readonly body?: NewsInput
}

/**
 * Request parameters for apiNewsPost operation in NewsApi.
 * @export
 * @interface NewsApiApiNewsPostRequest
 */
export interface NewsApiApiNewsPostRequest {
    /**
     * News input
     * @type {NewsInput}
     * @memberof NewsApiApiNewsPost
     */
    readonly body?: NewsInput
}

/**
 * NewsApi - object-oriented interface
 * @export
 * @class NewsApi
 * @extends {BaseAPI}
 */
export class NewsApi extends BaseAPI {
    /**
     * 
     * @summary Get all news with pagination
     * @param {NewsApiApiNewsGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public apiNewsGet(requestParameters: NewsApiApiNewsGetRequest = {}, options?: any) {
        return NewsApiFp(this.configuration).apiNewsGet(requestParameters.page, requestParameters.size, requestParameters.sort, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Deletes one news entity
     * @param {NewsApiApiNewsIdDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public apiNewsIdDelete(requestParameters: NewsApiApiNewsIdDeleteRequest, options?: any) {
        return NewsApiFp(this.configuration).apiNewsIdDelete(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get one news entity
     * @param {NewsApiApiNewsIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public apiNewsIdGet(requestParameters: NewsApiApiNewsIdGetRequest, options?: any) {
        return NewsApiFp(this.configuration).apiNewsIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Edit one news entity
     * @param {NewsApiApiNewsIdPatchRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public apiNewsIdPatch(requestParameters: NewsApiApiNewsIdPatchRequest, options?: any) {
        return NewsApiFp(this.configuration).apiNewsIdPatch(requestParameters.id, requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Creates news entity
     * @param {NewsApiApiNewsPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NewsApi
     */
    public apiNewsPost(requestParameters: NewsApiApiNewsPostRequest = {}, options?: any) {
        return NewsApiFp(this.configuration).apiNewsPost(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }
}