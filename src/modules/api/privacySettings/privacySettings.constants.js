'use strict';

/**
 * @fileoverview This file defines the privacy settings for user profiles, including constants for
 * profile visibility levels. The available visibility levels determine who can view a user's profile.
 */

/**
 * PROFILE_VISIBILITY - An object containing constants for different levels of profile visibility.
 *
 * - PUBLIC: The user's profile is visible to everyone.
 * - FRIENDS: The user's profile is visible only to friends.
 * - PRIVATE: The user's profile is visible only to the user themselves.
 */
const PROFILE_VISIBILITY = {
    PUBLIC: 'public',
    FRIENDS: 'friends',
    PRIVATE: 'private',
};

/**
 * privacySettings - An object containing the privacy settings for user profiles. It includes the
 * PROFILE_VISIBILITY constants.
 *
 * - PROFILE_VISIBILITY: An object containing constants for different levels of profile visibility.
 */
const privacySettings = {
    PROFILE_VISIBILITY,
};

export default privacySettings;
