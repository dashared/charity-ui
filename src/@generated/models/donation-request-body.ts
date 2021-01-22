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


import { UserSimpleUser } from './user-simple-user';
import { UserUser } from './user-user';

/**
 * 
 * @export
 * @interface DonationRequestBody
 */
export interface DonationRequestBody {
    /**
     * 
     * @type {boolean}
     * @memberof DonationRequestBody
     */
    anonymous?: boolean;
    /**
     * 
     * @type {number}
     * @memberof DonationRequestBody
     */
    approved_amount?: number;
    /**
     * 
     * @type {UserUser}
     * @memberof DonationRequestBody
     */
    assignee?: UserUser;
    /**
     * 
     * @type {UserUser}
     * @memberof DonationRequestBody
     */
    author?: UserUser;
    /**
     * 
     * @type {Array<string>}
     * @memberof DonationRequestBody
     */
    available_statuses?: Array<DonationRequestBodyAvailableStatusesEnum>;
    /**
     * 
     * @type {string}
     * @memberof DonationRequestBody
     */
    created_at?: string;
    /**
     * 
     * @type {string}
     * @memberof DonationRequestBody
     */
    description?: string;
    /**
     * 
     * @type {UserSimpleUser}
     * @memberof DonationRequestBody
     */
    donee?: UserSimpleUser;
    /**
     * 
     * @type {Array<string>}
     * @memberof DonationRequestBody
     */
    file_id?: Array<string>;
    /**
     * 
     * @type {number}
     * @memberof DonationRequestBody
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof DonationRequestBody
     */
    message?: string;
    /**
     * 
     * @type {string}
     * @memberof DonationRequestBody
     */
    relationship?: string;
    /**
     * 
     * @type {string}
     * @memberof DonationRequestBody
     */
    request_type?: string;
    /**
     * 
     * @type {number}
     * @memberof DonationRequestBody
     */
    requested_amount?: number;
    /**
     * 
     * @type {string}
     * @memberof DonationRequestBody
     */
    started_at?: string;
    /**
     * 
     * @type {string}
     * @memberof DonationRequestBody
     */
    status?: DonationRequestBodyStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof DonationRequestBody
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof DonationRequestBody
     */
    until?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum DonationRequestBodyAvailableStatusesEnum {
    New = 'New',
    InProcessing = 'InProcessing',
    Refused = 'Refused',
    NeedsImprovement = 'NeedsImprovement',
    Archived = 'Archived',
    SuperManagerConfirmation = 'SuperManagerConfirmation',
    UserConfirmation = 'UserConfirmation',
    Active = 'Active',
    Spam = 'Spam',
    Deleted = 'Deleted'
}
/**
    * @export
    * @enum {string}
    */
export enum DonationRequestBodyStatusEnum {
    New = 'New',
    InProcessing = 'InProcessing',
    Refused = 'Refused',
    NeedsImprovement = 'NeedsImprovement',
    Archived = 'Archived',
    SuperManagerConfirmation = 'SuperManagerConfirmation',
    UserConfirmation = 'UserConfirmation',
    Active = 'Active',
    Spam = 'Spam',
    Deleted = 'Deleted'
}



