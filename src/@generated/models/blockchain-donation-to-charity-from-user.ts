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


import { UtilsMoneyJson } from './utils-money-json';

/**
 * 
 * @export
 * @interface BlockchainDonationToCharityFromUser
 */
export interface BlockchainDonationToCharityFromUser {
    /**
     * 
     * @type {UtilsMoneyJson}
     * @memberof BlockchainDonationToCharityFromUser
     */
    amount: UtilsMoneyJson;
    /**
     * 
     * @type {boolean}
     * @memberof BlockchainDonationToCharityFromUser
     */
    anonymous?: boolean;
    /**
     * 
     * @type {string}
     * @memberof BlockchainDonationToCharityFromUser
     */
    password: string;
}


