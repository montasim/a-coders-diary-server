'use strict';

/**
 * @fileoverview This file exports a function `toSentenceCase` which converts a single word
 * to sentence case. The function ensures that the first letter of the word is capitalized
 * and the remaining letters are in lowercase.
 */

/**
 * toSentenceCase - A function that converts a single word to sentence case. It capitalizes
 * the first letter of the word and converts the rest of the letters to lowercase. If no word
 * is provided, it returns an empty string.
 *
 * @function
 * @param {string} word - The word to convert.
 * @returns {string} - The word converted to sentence case.
 */
const toSentenceCase = (word) => {
    if (!word) return ''; // Return an empty string if no word is provided

    return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export default toSentenceCase;
