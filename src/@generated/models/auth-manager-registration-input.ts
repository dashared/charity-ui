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


import { AuthManagerRegistrationUser } from './auth-manager-registration-user';

/**
 * 
 * @export
 * @interface AuthManagerRegistrationInput
 */
export interface AuthManagerRegistrationInput {
  /**
   * 
   * @type {string}
   * @memberof AuthManagerRegistrationInput
   */
  role?: AuthManagerRegistrationInputRoleEnum;
  /**
   * 
   * @type {AuthManagerRegistrationUser}
   * @memberof AuthManagerRegistrationInput
   */
  user?: AuthManagerRegistrationUser;
}

/**
    * @export
    * @enum {string}
    */
export enum AuthManagerRegistrationInputRoleEnum {
  User = 'User',
  Manager = 'Manager',
  SuperManager = 'SuperManager',
  ContentManager = 'ContentManager',
  Operator = 'Operator',
  Administrator = 'Administrator'
}



