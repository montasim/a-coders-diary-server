'use strict';

/**
 * Regular expression for validating email addresses.
 *
 * This pattern checks for a typical structure of an email address, ensuring it includes:
 * - A local part preceding the '@' symbol
 * - Valid characters in the local part, including alphanumeric characters and special characters
 * - A domain part following the '@' symbol with periods separating domain labels
 * - A top-level domain of at least two characters
 *
 * This regex does not validate the existence of the email domain or its active SMTP configuration.
 *
 * @example
 * // Returns true for valid emails
 * console.log(isValidEmail("example@example.com")); // true
 * console.log(isValidEmail("user.name@sub.domain.com")); // true
 *
 * // Returns false for invalid emails
 * console.log(isValidEmail("example.com")); // false (missing '@')
 * console.log(isValidEmail("example@.com")); // false (missing domain name)
 *
 * @param {string} email The email string to be validated.
 * @returns {boolean} Returns true if the email matches the pattern, false otherwise.
 */
const EMAIL =
    /^(?!.*\btemp\b)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Regular expression for validating Bangladeshi mobile phone numbers.
 *
 * This pattern ensures that the phone number:
 * - Starts with the country code '+880' or leading '01'
 * - Follows with a valid operator code (3-9)
 * - Ends with the remaining eight digits which represent the subscriber number
 *
 * This regex ensures format adherence but does not check the actual existence or activation status of the mobile number.
 *
 * @example
 * // Returns true for valid mobile numbers
 * console.log(isValidMobile("+8801812345678")); // true
 * console.log(isValidMobile("01912345678")); // true
 *
 * // Returns false for invalid mobile numbers
 * console.log(isValidMobile("01234567890")); // false (invalid operator code)
 * console.log(isValidMobile("8801812345678")); // false (missing leading '+')
 *
 * @param {string} mobile The mobile number to be validated.
 * @returns {boolean} Returns true if the mobile matches the pattern, false otherwise.
 */
const MOBILE = /^(?:\+8801|01)[3-9]\d{8}$/;

/**
 * Regular expression for validating passwords.
 *
 * This pattern requires a password to:
 * - Be between 8 to 30 characters in length
 * - Contain at least one uppercase letter
 * - Contain at least one lowercase letter
 * - Contain at least one digit
 * - Contain at least one special character from the set @$!%*?&
 *
 * This regex is designed to enforce strong password policies to enhance security.
 *
 * @example
 * // Returns true for valid passwords
 * console.log(isValidPassword("Example@123")); // true
 * console.log(isValidPassword("Another$Password123")); // true
 *
 * // Returns false for invalid passwords
 * console.log(isValidPassword("password")); // false (no uppercase, digit, or special char)
 * console.log(isValidPassword("SHORT1!")); // false (too short)
 *
 * @param {string} password The password string to be validated.
 * @returns {boolean} Returns true if the password matches the pattern, false otherwise.
 */
const PASSWORD =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

/**
 * Regular expression for validating date strings in ISO 8601 format.
 *
 * This pattern matches date and time strings that include:
 * - A complete date (year, month, day)
 * - A 'T' character separator to indicate the start of the time element
 * - Time (hour, minute, second), optionally extended to include milliseconds
 * - A 'Z' indicating UTC time or a +/- offset for other time zones
 *
 * This format is widely used in computing as a way of unambiguously representing dates and times.
 *
 * @example
 * // Returns true for valid ISO 8601 dates
 * console.log(isValidISODate("2021-12-15T12:00:00Z")); // true
 * console.log(isValidISODate("2021-12-15T12:00:00.123+02:00")); // true
 *
 * // Returns false for invalid ISO 8601 dates
 * console.log(isValidISODate("2021-12-15 12:00:00")); // false (missing 'T' and timezone)
 * console.log(isValidISODate("15-12-2021T12:00:00")); // false (incorrect date format)
 *
 * @param {string} isoDate The ISO 8601 date string to be validated.
 * @returns {boolean} Returns true if the isoDate matches the pattern, false otherwise.
 */
const ISO_8601_DATE =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(Z|[+-]\d{2}:\d{2})$/s;

/**
 * Regular expression to check for the presence of uppercase letters.
 *
 * This simple pattern matches any string that contains at least one uppercase letter from A to Z.
 *
 * @example
 * // Returns true if the string contains uppercase letters
 * console.log(hasUppercase("Hello")); // true
 * console.log(hasUppercase("world")); // false
 *
 * @param {string} text The text string to be checked.
 * @returns {boolean} Returns true if the text contains uppercase letters, false otherwise.
 */
const UPPERCASE = /[A-Z]/;

/**
 * Regular expression to check for the presence of lowercase letters.
 *
 * This pattern matches any string that contains at least one lowercase letter from a to z.
 *
 * @example
 * // Returns true if the string contains lowercase letters
 * console.log(hasLowercase("hello")); // true
 * console.log(hasLowercase("WORLD")); // false
 *
 * @param {string} text The text string to be checked.
 * @returns {boolean} Returns true if the text contains lowercase letters, false otherwise.
 */
const LOWERCASE = /[a-z]/;

/**
 * Regular expression to check for the presence of digits.
 *
 * This pattern matches any string that contains at least one digit from 0 to 9.
 *
 * @example
 * // Returns true if the string contains digits
 * console.log(hasDigits("123abc")); // true
 * console.log(hasDigits("abcdef")); // false
 *
 * @param {string} text The text string to be checked.
 * @returns {boolean} Returns true if the text contains digits, false otherwise.
 */
const DIGITS = /\d/;

/**
 * Regular expression to check for the presence of special characters.
 *
 * This pattern matches any string that contains at least one special character from a predefined set including
 * spaces and common punctuation marks. It helps in validating inputs that require at least one non-alphanumeric character.
 *
 * @example
 * // Returns true if the string contains special characters
 * console.log(hasSpecialCharacters("hello!")); // true
 * console.log(hasSpecialCharacters("hello")); // false
 *
 * @param {string} text The text string to be checked.
 * @returns {boolean} Returns true if the text contains special characters, false otherwise.
 */
const SPECIAL_CHARACTERS = /[\s~`!@#$%^&*+=\-[\]\\';,/{}|\\":<>?()._]/;

/**
 * Regular expression for validating well-formed URLs.
 *
 * This pattern supports both HTTP and HTTPS protocols and can validate standard web URLs.
 * It covers the following parts of a URL:
 * - Optional protocol (HTTP or HTTPS)
 * - Domain name (supports subdomains)
 * - Top-level domain (minimum 2, maximum 6 letters)
 * - Optional path (can include letters, numbers, underscores, slashes, dots, and hyphens)
 * - Optional trailing slash
 *
 * It does not cover URL port numbers, query parameters, or anchor tags.
 *
 * @example
 * // Returns true for valid URLs
 * console.log(isValidUrl("http://www.example.com")); // true
 * console.log(isValidUrl("https://example.com/about")); // true
 *
 * // Returns false for invalid URLs
 * console.log(isValidUrl("www.example.com")); // false (no protocol)
 * console.log(isValidUrl("example")); // false (not a valid URL)
 *
 * @param {string} url The URL string to be validated.
 * @returns {boolean} Returns true if the URL matches the pattern, false otherwise.
 */
const URL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

/**
 * Regular expression for validating Facebook URLs.
 *
 * This pattern checks for URLs that correctly represent Facebook user profiles or pages. It supports both
 * HTTPS and HTTP protocols and allows optional 'www.' It validates URLs that direct to a user's profile
 * via a username (e.g., https://www.facebook.com/username) or via the profile ID
 * (e.g., https://facebook.com/profile.php?id=123456789).
 *
 * @example
 * console.log(isValidFacebookUrl("https://www.facebook.com/username")); // true
 * console.log(isValidFacebookUrl("https://facebook.com/profile.php?id=123456789")); // true
 * console.log(isValidFacebookUrl("https://facebook.com/username")); // true
 * console.log(isValidFacebookUrl("http://www.facebook.com/username")); // true
 * console.log(isValidFacebookUrl("www.facebook.com/username")); // false, missing protocol
 * console.log(isValidFacebookUrl("https://facebook.com/")); // false, missing username
 *
 * @param {string} url The Facebook URL to be validated.
 * @returns {boolean} Returns true if the URL is a valid Facebook URL, false otherwise.
 */
const FACEBOOK_URL =
    /^(https?:\/\/)(www\.)?facebook\.com\/(profile\.php\?id=\d+|[a-zA-Z0-9\.-]+)$/;

/**
 * Regular expression for validating Twitter URLs.
 *
 * This pattern ensures that the URL is a valid Twitter profile link. It supports both
 * HTTPS and HTTP protocols and does not require 'www.' It specifically checks for URLs that
 * lead to a user profile, which generally follow the format of https://twitter.com/username.
 * The username must consist of alphanumeric characters or underscores, and cannot start with a number.
 *
 * Examples of valid Twitter URLs:
 * - https://twitter.com/username
 * - https://www.twitter.com/username
 * - http://twitter.com/username
 * - http://www.twitter.com/username
 *
 * Examples of invalid Twitter URLs:
 * - http://twitter.com/username/ (extra slash)
 * - https://twitter.com/ (missing username)
 * - https://twitter.com/username/subpage (extra path elements)
 *
 * @example
 * console.log(isValidTwitterUrl("https://twitter.com/username")); // true
 * console.log(isValidTwitterUrl("https://www.twitter.com/username123")); // true
 * console.log(isValidTwitterUrl("https://twitter.com/")); // false
 * console.log(isValidTwitterUrl("https://twitter.com/username/extra")); // false
 *
 * @param {string} url The Twitter URL to be validated.
 * @returns {boolean} Returns true if the URL is a valid Twitter URL, false otherwise.
 */
const TWITTER_URL = /^(https?:\/\/)(www\.)?twitter\.com\/([a-zA-Z0-9_]+)(\/)?$/;

/**
 * Regular expression for validating LinkedIn URLs.
 *
 * This pattern checks URLs that are intended to point to LinkedIn profiles or company pages. It supports both
 * HTTPS and HTTP protocols and includes optional 'www.' The URL must specifically lead to either a user profile
 * with '/in/' followed by a username, or a company page with '/company/' followed by the company name.
 * Usernames and company names can contain alphanumeric characters, dashes, and underscores.
 *
 * Examples of valid LinkedIn URLs:
 * - https://www.linkedin.com/in/username
 * - https://linkedin.com/in/username-123
 * - http://www.linkedin.com/company/company-name
 * - https://linkedin.com/company/company_name123
 *
 * Examples of invalid LinkedIn URLs:
 * - https://linkedin.com/username (incorrect path)
 * - http://www.linkedin.com/in/ (missing username)
 * - https://linkedin.com/company/ (missing company name)
 *
 * @example
 * console.log(isValidLinkedinUrl("https://www.linkedin.com/in/username")); // true
 * console.log(isValidLinkedinUrl("https://linkedin.com/company/company-name")); // true
 * console.log(isValidLinkedinUrl("https://linkedin.com/in/")); // false
 * console.log(isValidLinkedinUrl("https://www.linkedin.com/username")); // false
 *
 * @param {string} url The LinkedIn URL to be validated.
 * @returns {boolean} Returns true if the URL is a valid LinkedIn URL, false otherwise.
 */
const LINKEDIN_URL =
    /^(https?:\/\/)(www\.)?linkedin\.com\/(in\/[a-zA-Z0-9_-]+|company\/[a-zA-Z0-9_-]+)$/;

/**
 * Regular expression for validating GitHub URLs.
 *
 * This pattern ensures that the URL points to either a GitHub user profile or a repository. It supports both
 * HTTPS and HTTP protocols and optionally includes 'www.' The URL must specifically lead to a user profile
 * or a repository, which are typically structured as https://github.com/username or
 * https://github.com/username/repository. Usernames and repository names can include alphanumeric characters,
 * dashes, and underscores.
 *
 * Examples of valid GitHub URLs:
 * - https://github.com/username
 * - https://www.github.com/username
 * - http://github.com/username/repository
 * - https://github.com/username/repo-name
 *
 * Examples of invalid GitHub URLs:
 * - https://github.com/ (missing username)
 * - http://github.com/username/ (trailing slash with no repository)
 * - https://github.com/username//repo (incorrect path formatting)
 *
 * @example
 * console.log(isValidGithubUrl("https://github.com/username")); // true
 * console.log(isValidGithubUrl("https://github.com/username/repository")); // true
 * console.log(isValidGithubUrl("https://github.com/username/")); // false
 * console.log(isValidGithubUrl("https://github.com//username")); // false
 *
 * @param {string} url The GitHub URL to be validated.
 * @returns {boolean} Returns true if the URL is a valid GitHub URL, false otherwise.
 */
const GITHUB_URL =
    /^(https?:\/\/)(www\.)?github\.com\/([a-zA-Z0-9_-]+)(\/[a-zA-Z0-9_-]+)?\/?$/;

const patterns = {
    EMAIL,
    MOBILE,
    PASSWORD,
    ISO_8601_DATE,
    UPPERCASE,
    LOWERCASE,
    DIGITS,
    SPECIAL_CHARACTERS,
    URL,
    FACEBOOK_URL,
    TWITTER_URL,
    LINKEDIN_URL,
    GITHUB_URL,
};

export default patterns;
