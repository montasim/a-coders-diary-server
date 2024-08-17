'use strict';

/**
 * @fileoverview This file exports a function `getRequesterPermissions` which retrieves the
 * permissions of the current user from the Express request object. The function assumes
 * that the permissions are stored within the `sessionUser` and `currentUser` objects.
 */

/**
 * getRequesterPermissions - A function that retrieves the permissions of the current user
 * from the Express request object. It accesses the `sessionUser` and `currentUser` objects
 * within the request to return the user's permissions.
 *
 * @function
 * @param {Object} req - The Express request object.
 * @returns {Array|string|undefined} - The permissions of the current user if present, otherwise `undefined`.
 */

const getRequesterPermissions = (req) => {
    return req.sessionUser.currentUser.permissions;
};

export default getRequesterPermissions;
