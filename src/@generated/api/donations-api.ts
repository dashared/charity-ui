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
import { BlockchainDonation } from '../models';
// @ts-ignore
import { BlockchainDonationToApplicationFromFund } from '../models';
// @ts-ignore
import { BlockchainDonationToCharityFromUser } from '../models';
// @ts-ignore
import { BlockchainDonationsResponse } from '../models';
/**
 * DonationsApi - axios parameter creator
 * @export
 */
export const DonationsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Donate to application from charity
         * @param {BlockchainDonationToApplicationFromFund} request Donation Input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiDonateApplicationFromCharityPost: async (request: BlockchainDonationToApplicationFromFund, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling apiDonateApplicationFromCharityPost.');
            }
            const localVarPath = `/api/donate/application/from_charity`;
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
         * @summary Donate to charity from user
         * @param {BlockchainDonationToCharityFromUser} request Donation Input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiDonateCharityFromUserPost: async (request: BlockchainDonationToCharityFromUser, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling apiDonateCharityFromUserPost.');
            }
            const localVarPath = `/api/donate/charity/from_user`;
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
         * @summary Retrieves a list of donations
         * @param {number} [page] Page number
         * @param {number} [size] Page size
         * @param {string} [sort] Sort param
         * @param {string} [user] Only for manager
         * @param {string} [application] User can access only his donations
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiDonationsGet: async (page?: number, size?: number, sort?: string, user?: string, application?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/donations`;
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

            if (user !== undefined) {
                localVarQueryParameter['user'] = user;
            }

            if (application !== undefined) {
                localVarQueryParameter['application'] = application;
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
         * @summary Returns donation with a given id
         * @param {string} id Donation ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiDonationsIdGet: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiDonationsIdGet.');
            }
            const localVarPath = `/api/donations/{id}`
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
    }
};

/**
 * DonationsApi - functional programming interface
 * @export
 */
export const DonationsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Donate to application from charity
         * @param {BlockchainDonationToApplicationFromFund} request Donation Input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiDonateApplicationFromCharityPost(request: BlockchainDonationToApplicationFromFund, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BlockchainDonation>> {
            const localVarAxiosArgs = await DonationsApiAxiosParamCreator(configuration).apiDonateApplicationFromCharityPost(request, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Donate to charity from user
         * @param {BlockchainDonationToCharityFromUser} request Donation Input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiDonateCharityFromUserPost(request: BlockchainDonationToCharityFromUser, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DonationsApiAxiosParamCreator(configuration).apiDonateCharityFromUserPost(request, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Retrieves a list of donations
         * @param {number} [page] Page number
         * @param {number} [size] Page size
         * @param {string} [sort] Sort param
         * @param {string} [user] Only for manager
         * @param {string} [application] User can access only his donations
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiDonationsGet(page?: number, size?: number, sort?: string, user?: string, application?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BlockchainDonationsResponse>> {
            const localVarAxiosArgs = await DonationsApiAxiosParamCreator(configuration).apiDonationsGet(page, size, sort, user, application, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Returns donation with a given id
         * @param {string} id Donation ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiDonationsIdGet(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BlockchainDonation>> {
            const localVarAxiosArgs = await DonationsApiAxiosParamCreator(configuration).apiDonationsIdGet(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DonationsApi - factory interface
 * @export
 */
export const DonationsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Donate to application from charity
         * @param {BlockchainDonationToApplicationFromFund} request Donation Input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiDonateApplicationFromCharityPost(request: BlockchainDonationToApplicationFromFund, options?: any): AxiosPromise<BlockchainDonation> {
            return DonationsApiFp(configuration).apiDonateApplicationFromCharityPost(request, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Donate to charity from user
         * @param {BlockchainDonationToCharityFromUser} request Donation Input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiDonateCharityFromUserPost(request: BlockchainDonationToCharityFromUser, options?: any): AxiosPromise<void> {
            return DonationsApiFp(configuration).apiDonateCharityFromUserPost(request, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Retrieves a list of donations
         * @param {number} [page] Page number
         * @param {number} [size] Page size
         * @param {string} [sort] Sort param
         * @param {string} [user] Only for manager
         * @param {string} [application] User can access only his donations
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiDonationsGet(page?: number, size?: number, sort?: string, user?: string, application?: string, options?: any): AxiosPromise<BlockchainDonationsResponse> {
            return DonationsApiFp(configuration).apiDonationsGet(page, size, sort, user, application, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Returns donation with a given id
         * @param {string} id Donation ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiDonationsIdGet(id: string, options?: any): AxiosPromise<BlockchainDonation> {
            return DonationsApiFp(configuration).apiDonationsIdGet(id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiDonateApplicationFromCharityPost operation in DonationsApi.
 * @export
 * @interface DonationsApiApiDonateApplicationFromCharityPostRequest
 */
export interface DonationsApiApiDonateApplicationFromCharityPostRequest {
    /**
     * Donation Input
     * @type {BlockchainDonationToApplicationFromFund}
     * @memberof DonationsApiApiDonateApplicationFromCharityPost
     */
    readonly request: BlockchainDonationToApplicationFromFund
}

/**
 * Request parameters for apiDonateCharityFromUserPost operation in DonationsApi.
 * @export
 * @interface DonationsApiApiDonateCharityFromUserPostRequest
 */
export interface DonationsApiApiDonateCharityFromUserPostRequest {
    /**
     * Donation Input
     * @type {BlockchainDonationToCharityFromUser}
     * @memberof DonationsApiApiDonateCharityFromUserPost
     */
    readonly request: BlockchainDonationToCharityFromUser
}

/**
 * Request parameters for apiDonationsGet operation in DonationsApi.
 * @export
 * @interface DonationsApiApiDonationsGetRequest
 */
export interface DonationsApiApiDonationsGetRequest {
    /**
     * Page number
     * @type {number}
     * @memberof DonationsApiApiDonationsGet
     */
    readonly page?: number

    /**
     * Page size
     * @type {number}
     * @memberof DonationsApiApiDonationsGet
     */
    readonly size?: number

    /**
     * Sort param
     * @type {string}
     * @memberof DonationsApiApiDonationsGet
     */
    readonly sort?: string

    /**
     * Only for manager
     * @type {string}
     * @memberof DonationsApiApiDonationsGet
     */
    readonly user?: string

    /**
     * User can access only his donations
     * @type {string}
     * @memberof DonationsApiApiDonationsGet
     */
    readonly application?: string
}

/**
 * Request parameters for apiDonationsIdGet operation in DonationsApi.
 * @export
 * @interface DonationsApiApiDonationsIdGetRequest
 */
export interface DonationsApiApiDonationsIdGetRequest {
    /**
     * Donation ID
     * @type {string}
     * @memberof DonationsApiApiDonationsIdGet
     */
    readonly id: string
}

/**
 * DonationsApi - object-oriented interface
 * @export
 * @class DonationsApi
 * @extends {BaseAPI}
 */
export class DonationsApi extends BaseAPI {
    /**
     * 
     * @summary Donate to application from charity
     * @param {DonationsApiApiDonateApplicationFromCharityPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DonationsApi
     */
    public apiDonateApplicationFromCharityPost(requestParameters: DonationsApiApiDonateApplicationFromCharityPostRequest, options?: any) {
        return DonationsApiFp(this.configuration).apiDonateApplicationFromCharityPost(requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Donate to charity from user
     * @param {DonationsApiApiDonateCharityFromUserPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DonationsApi
     */
    public apiDonateCharityFromUserPost(requestParameters: DonationsApiApiDonateCharityFromUserPostRequest, options?: any) {
        return DonationsApiFp(this.configuration).apiDonateCharityFromUserPost(requestParameters.request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Retrieves a list of donations
     * @param {DonationsApiApiDonationsGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DonationsApi
     */
    public apiDonationsGet(requestParameters: DonationsApiApiDonationsGetRequest = {}, options?: any) {
        return DonationsApiFp(this.configuration).apiDonationsGet(requestParameters.page, requestParameters.size, requestParameters.sort, requestParameters.user, requestParameters.application, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Returns donation with a given id
     * @param {DonationsApiApiDonationsIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DonationsApi
     */
    public apiDonationsIdGet(requestParameters: DonationsApiApiDonationsIdGetRequest, options?: any) {
        return DonationsApiFp(this.configuration).apiDonationsIdGet(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }
}
