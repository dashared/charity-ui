/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { ModelsSimpleUser } from './models-simple-user';
import { ModelsUser } from './models-user';

/**
 * 
 * @export
 * @interface ModelsDonationRequestBody
 */
export interface ModelsDonationRequestBody {
    /**
     * 
     * @type {number}
     * @memberof ModelsDonationRequestBody
     */
    approved_amount?: number;
    /**
     * 
     * @type {ModelsUser}
     * @memberof ModelsDonationRequestBody
     */
    assignee?: ModelsUser;
    /**
     * 
     * @type {ModelsUser}
     * @memberof ModelsDonationRequestBody
     */
    author?: ModelsUser;
    /**
     * 
     * @type {string}
     * @memberof ModelsDonationRequestBody
     */
    created_at?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelsDonationRequestBody
     */
    description?: string;
    /**
     * 
     * @type {ModelsSimpleUser}
     * @memberof ModelsDonationRequestBody
     */
    donee?: ModelsSimpleUser;
    /**
     * 
     * @type {Array<string>}
     * @memberof ModelsDonationRequestBody
     */
    file_id?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ModelsDonationRequestBody
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelsDonationRequestBody
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelsDonationRequestBody
     */
    relationship?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelsDonationRequestBody
     */
    request_type?: string;
    /**
     * 
     * @type {number}
     * @memberof ModelsDonationRequestBody
     */
    requested_amount?: number;
    /**
     * 
     * @type {string}
     * @memberof ModelsDonationRequestBody
     */
    status?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelsDonationRequestBody
     */
    title?: string;
}

