'use strict';

/**
 * @fileoverview This file exports an asynchronous function `createHashedPassword`
 * which uses the `bcrypt` library to hash a plaintext password. This function
 * is typically used during user registration to securely store passwords by
 * hashing them before saving them to the database.
 */

import bcrypt from 'bcrypt';

/**
 * createHashedPassword - An asynchronous function that hashes a plaintext password
 * using the `bcrypt` library. It generates a salt and hashes the password with a
 * specified number of salt rounds (10 in this case), ensuring the password is securely
 * stored.
 *
 * @function
 * @async
 * @param {string} password - The plaintext password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
const createHashedPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
};

export default createHashedPassword;
