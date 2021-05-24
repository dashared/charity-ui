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
import { UserSettings } from '../models';
/**
 * SettingsApi - axios parameter creator
 * @export
 */
export const SettingsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Retrieves user\'s settings
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserSettingsGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/user-settings`;
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
         * @summary Updates user settings
         * @param {UserSettings} [body] user settings input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserSettingsPatch: async (body?: UserSettings, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/user-settings`;
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
 * SettingsApi - functional programming interface
 * @export
 */
export const SettingsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Retrieves user\'s settings
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserSettingsGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserSettings>> {
            const localVarAxiosArgs = await SettingsApiAxiosParamCreator(configuration).apiUserSettingsGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Updates user settings
         * @param {UserSettings} [body] user settings input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiUserSettingsPatch(body?: UserSettings, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserSettings>> {
            const localVarAxiosArgs = await SettingsApiAxiosParamCreator(configuration).apiUserSettingsPatch(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * SettingsApi - factory interface
 * @export
 */
export const SettingsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Retrieves user\'s settings
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserSettingsGet(options?: any): AxiosPromise<UserSettings> {
            return SettingsApiFp(configuration).apiUserSettingsGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Updates user settings
         * @param {UserSettings} [body] user settings input
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiUserSettingsPatch(body?: UserSettings, options?: any): AxiosPromise<UserSettings> {
            return SettingsApiFp(configuration).apiUserSettingsPatch(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiUserSettingsPatch operation in SettingsApi.
 * @export
 * @interface SettingsApiApiUserSettingsPatchRequest
 */
export interface SettingsApiApiUserSettingsPatchRequest {
    /**
     * user settings input
     * @type {UserSettings}
     * @memberof SettingsApiApiUserSettingsPatch
     */
    readonly body?: UserSettings
}

/**
 * SettingsApi - object-oriented interface
 * @export
 * @class SettingsApi
 * @extends {BaseAPI}
 */
export class SettingsApi extends BaseAPI {
    /**
     * 
     * @summary Retrieves user\'s settings
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SettingsApi
     */
    public apiUserSettingsGet(options?: any) {
        return SettingsApiFp(this.configuration).apiUserSettingsGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Updates user settings
     * @param {SettingsApiApiUserSettingsPatchRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SettingsApi
     */
    public apiUserSettingsPatch(requestParameters: SettingsApiApiUserSettingsPatchRequest = {}, options?: any) {
        return SettingsApiFp(this.configuration).apiUserSettingsPatch(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }
}