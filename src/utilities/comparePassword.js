'use strict';

/**
 * @fileoverview This file exports an asynchronous function `comparePassword`
 * which utilizes the `bcrypt` library to compare a plaintext password
 * with a hashed password. This function is commonly used in authentication
 * processes to verify if a given password matches the stored hashed password.
 */

/**
 * comparePassword - An asynchronous function that compares a plaintext password
 * with a hashed password using the `bcrypt` library. It returns a boolean indicating
 * whether the passwords match.
 *
 * @function
 * @async
 * @param {string} password - The plaintext password to be compared.
 * @param {string} hash - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating
 * whether the passwords match.
 */

import bcrypt from 'bcrypt';

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

export default comparePassword;
