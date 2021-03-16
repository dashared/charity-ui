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
 * @interface AuthUnregisteredUser
 */
export interface AuthUnregisteredUser {
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    birth_date?: string;
    /**
     * 
     * @type {boolean}
     * @memberof AuthUnregisteredUser
     */
    blocked?: boolean;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    city?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    country?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    created_at?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    first_name?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    image?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    last_name?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    middle_name?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    phone?: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUnregisteredUser
     */
    role?: AuthUnregisteredUserRoleEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum AuthUnregisteredUserRoleEnum {
    User = 'User',
    Manager = 'Manager',
    SuperManager = 'SuperManager',
    ContentManager = 'ContentManager',
    Operator = 'Operator',
    Admin = 'Admin'
}



