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


import { ChatDialog } from './chat-dialog';
import { FileInfo } from './file-info';
import { UserUser } from './user-user';

/**
 * 
 * @export
 * @interface ChatMessageBody
 */
export interface ChatMessageBody {
    /**
     * 
     * @type {Array<FileInfo>}
     * @memberof ChatMessageBody
     */
    attachments?: Array<FileInfo>;
    /**
     * 
     * @type {UserUser}
     * @memberof ChatMessageBody
     */
    author?: UserUser;
    /**
     * 
     * @type {string}
     * @memberof ChatMessageBody
     */
    body?: string;
    /**
     * 
     * @type {ChatDialog}
     * @memberof ChatMessageBody
     */
    dialog?: ChatDialog;
    /**
     * 
     * @type {string}
     * @memberof ChatMessageBody
     */
    dialog_id?: string;
    /**
     * 
     * @type {string}
     * @memberof ChatMessageBody
     */
    created_at?: string;
    /**
     * 
     * @type {number}
     * @memberof ChatMessageBody
     */
    id?: number;
}


