'use strict';

/**
 * @fileoverview This file exports a function `getRequesterId` which extracts the requester ID
 * from the Express request object. The function checks for the presence of the `sessionUser`
 * and `currentUser` objects within the request and returns the `_id` of the current user.
 */

/**
 * getRequesterId - A function that extracts the requester ID from the Express request object.
 * It navigates through the `sessionUser` and `currentUser` objects within the request to retrieve
 * the `_id` of the current user.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @returns {string|undefined} - The `_id` of the current user if present, otherwise `undefined`.
 */

const getRequesterId = (req) => {
    return req?.sessionUser?.currentUser?._id;
};

export default getRequesterId;
