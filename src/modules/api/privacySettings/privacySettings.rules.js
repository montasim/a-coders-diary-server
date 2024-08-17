'use strict';

/**
 * @fileoverview This file defines the rules for privacy settings based on the user's profile visibility
 * level. The rules determine which fields are visible to different types of users, such as the public,
 * friends, the user themselves, and administrators.
 */

/**
 * privacySettingsRules - An object containing the privacy settings rules for user profiles. Each key
 * corresponds to a visibility level, and the value is an array of fields that are visible at that level.
 *
 * - PUBLIC: Array of fields visible to everyone (e.g., 'name', 'username', 'bio').
 * - FRIENDS: Array of fields visible to friends (e.g., 'name', 'username', 'dateOfBirth', 'bio').
 * - PRIVATE: Array of fields visible to no one.
 * - ITSELF: Array of fields visible only to the user themselves (e.g., 'name', 'username', 'image').
 * - ADMIN: Array of fields visible to administrators (e.g., '*', representing all fields).
 */
const privacySettingsRules = {
    PUBLIC: ['name', 'username', 'bio'],
    FRIENDS: [
        'name',
        'username',
        'dateOfBirth',
        'bio',
        'pronouns',
        'company',
        'socialAccounts',
        'url',
    ],
    PRIVATE: [],
    ITSELF: [
        'name',
        'username',
        'image',
        'dateOfBirth',
        'bio',
        'pronouns',
        'emails',
        'mobiles',
        'address',
        'twoFactorEnabled',
        'company',
        'url',
        'socialAccounts',
        'privacySettings',
    ],
    ADMIN: ['*'],
};

export default privacySettingsRules;
