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



/**
 * 
 * @export
 * @interface UserEditableInfo
 */
export interface UserEditableInfo {
    /**
     * 
     * @type {Array<string>}
     * @memberof UserEditableInfo
     */
    assigned_categories?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    birth_date?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    city?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    country?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    first_name?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    image_id?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    last_name?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    middle_name?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    phone?: string;
    /**
     * 
     * @type {string}
     * @memberof UserEditableInfo
     */
    role?: UserEditableInfoRoleEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum UserEditableInfoRoleEnum {
    User = 'User',
    Manager = 'Manager',
    SuperManager = 'SuperManager',
    ContentMaRolnager = 'ContentMaRolnager',
    Operator = 'Operator',
    Admin = 'Admin'
}



