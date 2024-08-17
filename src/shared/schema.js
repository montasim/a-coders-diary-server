'use strict';

/**
 * @fileoverview This module consolidates and exports shared schema definitions for various attributes commonly used across multiple models in the application.
 * Each schema component is defined using Mongoose's Schema types and includes detailed validations, constraints, and descriptions to ensure data integrity and provide clarity on their intended use.
 * The shared schemas encompass a wide range of user attributes, from basic personal information like usernames and dates of birth to more complex data like social media profiles and security settings.
 * This modular approach to schema management facilitates reusability, maintains consistency across different parts of the application, and simplifies the maintenance of the database model.
 */

import { Schema } from 'mongoose';

import constants from '../constant/constants.js';
import userConstants from '../modules/api/users/users.constants.js';
import patterns from '../constant/patterns.constants.js';

/**
 * @schema usernameSchema
 * Defines validation and formatting for usernames, ensuring they are unique, properly trimmed, and lowercase.
 * The username is also required to match a specific email pattern, with validations for minimum and maximum lengths.
 */
const usernameSchema = {
    type: String,
    trim: true,
    lowercase: true,
    sparse: true,
    unique: [
        true,
        'The username you chose is already in use. Please try a different one.',
    ],
    match: [
        userConstants.pattern.USERNAME,
        'Please enter a valid email address for your username.',
    ],
    minlength: [
        constants.lengths.USERNAME_MIN,
        `Username should be at least ${constants.lengths.USERNAME_MIN} characters.`,
    ],
    maxlength: [
        constants.lengths.USERNAME_MAX,
        `Username should not exceed ${constants.lengths.USERNAME_MAX} characters.`,
    ],
    description: 'Username, must be unique and formatted as an email address.',
};

/**
 * @schema dateOfBirthSchema
 * Captures the user's date of birth, required for age-based access control. It ensures the date is in the specified format (DD-MM-YYYY) and is a valid date.
 */
const dateOfBirthSchema = {
    type: Date,
    trim: true,
    required: [true, 'Your date of birth is required.'],
    match: [
        userConstants.pattern.DATE_OF_BIRTH,
        'Date of birth must be in the format DD-MM-YYYY and a valid date.',
    ],
    description:
        "The user's birth date, important for age-based access control.",
};

/**
 * @schema bioSchema
 * Stores a brief user biography. This field is trimmed for whitespace and has a maximum character length limit to ensure concise user descriptions.
 */
const bioSchema = {
    type: String,
    trim: true,
    maxlength: [
        userConstants.lengths.BIO_MAX,
        `Bio should not exceed ${userConstants.lengths.BIO_MAX} characters.`,
    ],
    description:
        'A short description about the user, limited to a specified maximum length.',
};

/**
 * @schema pronounsSchema
 * Links to an external Pronouns model, allowing the user to select pronouns from a predefined list. This schema helps in promoting inclusivity within the application.
 */
const pronounsSchema = {
    type: Schema.Types.ObjectId,
    trim: true,
    ref: 'Pronouns',
    default: undefined,
    description:
        'Reference to an external Pronouns model, ensuring pronouns are selected from a predefined list.',
};

/**
 * @schema numericIdSchema
 * Represents a unique numeric identifier for a user, which is sparse and unique. It is used for systems that require a numeric ID alongside traditional string-based identifiers.
 */
const numericIdSchema = {
    type: Number,
    trim: true,
    sparse: true,
    unique: [
        true,
        'The numeric ID must be unique. Duplicate IDs are not allowed.',
    ],
    // required: [true, 'A numeric ID is required for each user.'],
    description:
        'Numeric part of the unique identifier, incremented automatically.',
};

/**
 * @schema userIdSchema
 * Stores a unique user ID in a predefined format, ensuring uniqueness across the system. This ID is crucial for linking user activities and data securely.
 */
const userIdSchema = {
    type: String,
    trim: true,
    sparse: true,
    // required: [
    //     true,
    //     'A user ID is required and must be unique across all users.',
    // ],
    unique: [
        true,
        'The user ID must be unique. Duplicate user IDs are not allowed.',
    ],
    description:
        'User ID in the format user-X, where X is an auto-incremented number.',
};

/**
 * @schema imageSchema
 * Manages image data including file identifiers and URLs for sharing and downloading images, ensuring links do not exceed maximum length specifications.
 */
const imageSchema = new Schema({
    fileId: {
        type: String,
        trim: true,
        maxlength: [
            constants.lengths.IMAGE.FILE_ID_MAX,
            `File ID should not exceed ${constants.lengths.IMAGE.FILE_ID_MAX} characters.`,
        ],
        description:
            'Identifier for an image file stored in a file system or external service.',
    },
    shareableLink: {
        type: String,
        trim: true,
        maxlength: [
            constants.lengths.IMAGE.SHAREABLE_LINK,
            `Shareable link should not exceed ${constants.lengths.IMAGE.SHAREABLE_LINK} characters.`,
        ],
        description: "URL link that allows others to access the user's image.",
    },
    downloadLink: {
        type: String,
        trim: true,
        maxlength: [
            constants.lengths.IMAGE.DOWNLOAD_LINK,
            `Download link should not exceed ${constants.lengths.IMAGE.DOWNLOAD_LINK} characters.`,
        ],
        description: "URL link to directly download the user's image.",
    },
});

/**
 * @schema nameSchema
 * Handles storage of user names, broken down into first, middle, last, and nick names, each with specific formatting and length requirements to maintain data consistency.
 */
const nameSchema = new Schema({
    first: {
        type: String,
        trim: true,
        required: [true, 'Please enter your name to create your profile.'],
        match: [
            userConstants.pattern.NAME,
            'Invalid name format. Names should only contain alphabetic characters and appropriate separators like spaces. For example, "John", "Mary Anne".',
        ],
        minlength: [
            userConstants.lengths.NAME.FIRST_MIN,
            `Name should be at least ${userConstants.lengths.NAME.FIRST_MIN} characters.`,
        ],
        maxlength: [
            userConstants.lengths.NAME.FIRST_MAX,
            `Name should not exceed ${userConstants.lengths.NAME.FIRST_MAX} characters.`,
        ],
        description:
            "User's name; must meet minimum and maximum length requirements.",
    },
    middle: {
        type: String,
        trim: true,
        match: [
            userConstants.pattern.NAME,
            'Invalid middle name format. Names should only contain alphabetic characters and appropriate separators like spaces. For example, "John", "Mary Anne".',
        ],
        minlength: [
            userConstants.lengths.NAME.MIDDLE_MIN,
            `Name should be at least ${userConstants.lengths.NAME.MIDDLE_MIN} characters.`,
        ],
        maxlength: [
            userConstants.lengths.NAME.MIDDLE_MAX,
            `Name should not exceed ${userConstants.lengths.NAME.MIDDLE_MAX} characters.`,
        ],
        description:
            "User's middle name; must meet minimum and maximum length requirements.",
    },
    last: {
        type: String,
        trim: true,
        match: [
            userConstants.pattern.NAME,
            'Invalid last name format. Names should only contain alphabetic characters and appropriate separators like spaces. For example, "John", "Mary Anne".',
        ],
        minlength: [
            userConstants.lengths.NAME.LAST_MIN,
            `Name should be at least ${userConstants.lengths.NAME.LAST_MIN} characters.`,
        ],
        maxlength: [
            userConstants.lengths.NAME.LAST_MAX,
            `Name should not exceed ${userConstants.lengths.NAME.LAST_MAX} characters.`,
        ],
        description:
            "User's last name; must meet minimum and maximum length requirements.",
    },
    nick: {
        type: String,
        trim: true,
        match: [
            userConstants.pattern.NAME,
            'Invalid nick name format. Names should only contain alphabetic characters and appropriate separators like spaces. For example, "John", "Mary Anne".',
        ],
        minlength: [
            userConstants.lengths.NAME.NICK_MIN,
            `Name should be at least ${userConstants.lengths.NAME.NICK_MIN} characters.`,
        ],
        maxlength: [
            userConstants.lengths.NAME.NICK_MAX,
            `Name should not exceed ${userConstants.lengths.NAME.NICK_MAX} characters.`,
        ],
        description:
            "User's nickname; must meet minimum and maximum length requirements.",
    },
});

/**
 * @schema addressSchema
 * Captures user address information, including country, state, and city, with each field stored as a trimmed string to ensure accurate geographic data capture.
 */
const addressSchema = new Schema({
    country: {
        type: String,
        trim: true,
        description:
            'The country where the user resides. This field stores the name of the country as a string.',
    },
    state: {
        type: String,
        trim: true,
        description:
            'The state or region within the country where the user is located. This field is used to store the state or regional name.',
    },
    city: {
        type: String,
        trim: true,
        description:
            'The city or locality within the state where the user lives. This field captures the city name.',
    },
});

/**
 * @schema passwordHashSchema
 * Stores a hashed version of the user's password, necessary for secure authentication and ensuring data privacy.
 */
const passwordHashSchema = {
    type: String,
    trim: true,
    required: [true, 'A password is necessary to secure your account.'],
    description: 'Stores the hashed password for secure authentication.',
};

/**
 * @schema roleSchema
 * References a RoleModel to apply role-based access control (RBAC) mechanisms, which restrict access based on the user's assigned role.
 */
const roleSchema = {
    type: Schema.Types.ObjectId,
    ref: 'Roles',
    default: undefined,
    description:
        "Defines the user's role within the application by referencing the RoleModel, restricting access based on the role defined in the RoleModel.",
};

/**
 * @schema twoFactorEnabledSchema
 * Indicates whether two-factor authentication is enabled for the user, providing an additional layer of security.
 */
const twoFactorEnabledSchema = {
    type: Boolean,
    trim: true,
    default: false,
    description:
        'Boolean flag to indicate if two-factor authentication is enabled for added security.',
};

/**
 * @schema twoFactorSecretSchema
 * Stores the secret key for two-factor authentication, crucial for generating and validating tokens used in the login process.
 */
const twoFactorSecretSchema = {
    type: String,
    trim: true,
    description:
        'Secret key for two-factor authentication, used to generate tokens.',
};

/**
 * @schema mustChangePasswordSchema
 * Flags whether the user is required to change their password at the next login, often used after administrative resets or potential security breaches.
 */
const mustChangePasswordSchema = {
    type: Boolean,
    trim: true,
    default: false,
    description:
        'Flag to indicate if the user must change their password at next login for security reasons.',
};

/**
 * @schema resetPasswordVerifyTokenSchema
 * Holds a token used to verify the user's identity during the password reset process, helping secure the process against unauthorized access.
 */
const resetPasswordVerifyTokenSchema = {
    type: String,
    trim: true,
    description:
        "Token used to verify the user's identity for password reset process.",
};

/**
 * @schema resetPasswordVerifyTokenExpiresSchema
 * Specifies when the reset password verification token expires, adding a time constraint to the token's validity to enhance security.
 */
const resetPasswordVerifyTokenExpiresSchema = {
    type: Date,
    trim: true,
    description:
        ' Expiration date and time for the reset password verification token.',
};

/**
 * @schema urlSchema
 * Validates URLs to ensure they are properly formatted, applying a maximum length restriction to accommodate database constraints.
 */
const urlSchema = {
    type: String,
    trim: true,
    match: [
        patterns.URL,
        'Invalid website format. Please enter a valid website.',
    ],
    maxlength: [
        constants.lengths.WEBSITE_URL_MAX,
        `Your URL must be less than ${constants.lengths.WEBSITE_URL_MAX} characters long.`,
    ],
    description:
        'A unique URL associated with the user, typically for a personal or professional website.',
};

/**
 * @schema emailSchema
 * Validates email addresses to ensure they are unique and properly formatted, crucial for user identification and communication.
 */
const emailSchema = {
    type: String,
    trim: true,
    lowercase: true,
    sparse: true,
    unique: [
        true,
        'This email address is already in use. Please use a different email address.',
    ],
    required: [true, 'An email address is required to register.'],
    match: [
        patterns.EMAIL,
        'Invalid email format. Please enter a valid email address.',
    ],
    minlength: [
        constants.lengths.EMAIL_MIN,
        `Email should be at least ${constants.lengths.EMAIL_MIN} characters long.`,
    ],
    maxlength: [
        constants.lengths.EMAIL_MAX,
        `Email should not exceed ${constants.lengths.EMAIL_MAX} characters long.`,
    ],
    description: 'Each email validated for uniqueness and proper format.',
};

/**
 * @schema isPrimaryEmailSchema
 * Indicates if the specified email is the primary email for the user, ensuring that only one email is marked as primary.
 */
const isPrimaryEmailSchema = {
    type: Boolean,
    default: false,
    description:
        'Indicates if this is the primary email for the user. Only one email should be set as primary at any time.',
};

/**
 * @schema isEmailVerifiedSchema
 * Checks if the user's email has been verified, an important step in confirming the authenticity of the user's contact information.
 */
const isEmailVerifiedSchema = {
    type: Boolean,
    default: false,
    description: "Flag to indicate whether the user's email has been verified.",
};

/**
 * @schema emailVerifyTokenSchema
 * Stores a token used during the email verification process, linked with actions like confirming an email change.
 */
const emailVerifyTokenSchema = {
    type: String,
    trim: true,
    description: 'Token used for email verification process.',
};

/**
 * @schema emailVerifyTokenExpiresSchema
 * Defines the expiration time for the email verification token, securing the process by limiting the time window in which the token is valid.
 */
const emailVerifyTokenExpiresSchema = {
    type: Date,
    trim: true,
    description: 'Expiration date and time for the email verification token.',
};

/**
 * @schema mobileSchema
 * Validates mobile phone numbers, ensuring they are unique and properly formatted. This is important for systems that use mobile numbers as an alternative form of user identification.
 */
const mobileSchema = {
    type: String,
    trim: true,
    sparse: true,
    unique: [
        true,
        'This mobile number is already registered. Please use a different mobile number.',
    ],
    match: [
        patterns.MOBILE,
        'Invalid mobile number format. Please enter a valid mobile number.',
    ],
    minlength: [
        constants.lengths.MOBILE_MIN,
        `Mobile number should have at least ${constants.lengths.MOBILE_MIN} digits.`,
    ],
    maxlength: [
        constants.lengths.MOBILE_MAX,
        `Mobile number should not exceed ${constants.lengths.MOBILE_MAX} digits.`,
    ],
    description: 'Mobile number, must be unique and properly formatted.',
};

/**
 * @schema isPrimaryMobileSchema
 * Identifies if the stored mobile number is the primary contact number for the user, used in systems that handle multiple contact numbers.
 */
const isPrimaryMobileSchema = {
    type: Boolean,
    default: false,
    description:
        'Indicates if this is the primary mobile for the user. Only one mobile should be set as primary at any time.',
};

/**
 * @schema isMobileVerifiedSchema
 * Indicates whether the user's mobile number has been verified, an important factor for systems relying on SMS or phone calls for authentication or notifications.
 */
const isMobileVerifiedSchema = {
    type: Boolean,
    default: false,
    description:
        "Flag to indicate whether the user's mobile number has been verified.",
};

/**
 * @schema mobileVerifyTokenSchema
 * Stores a token used to verify the mobile number, essential for confirming the user's control over the listed phone number.
 */
const mobileVerifyTokenSchema = {
    type: String,
    trim: true,
    description: 'Token used for mobile number verification process.',
};

/**
 * @schema mobileVerifyTokenExpiresSchema
 * Specifies the expiration date and time for the mobile verification token, ensuring the token is used within a designated timeframe.
 */
const mobileVerifyTokenExpiresSchema = {
    type: Date,
    trim: true,
    description: 'Expiration date and time for the mobile verification token.',
};

/**
 * @schema isActiveSchema
 * Flags whether the user's profile or account is active or has been deactivated, allowing for easy management of user status within the system.
 */
const isActiveSchema = {
    type: Boolean,
    default: true,
    description:
        'Flag to indicate whether the document is active or deactivated.',
};

/**
 * @schema facebookSchema
 * Stores and validates a Facebook profile URL, ensuring it is unique and correctly formatted. This is used for linking a user's social media profile.
 */
const facebookSchema = {
    type: String,
    trim: true,
    sparse: true,
    unique: [true, 'This Facebook URL is already linked to another account.'],
    match: [
        patterns.FACEBOOK_URL,
        'Invalid facebook url format. Please enter a valid facebook url.',
    ],
    maxlength: [
        constants.lengths.WEBSITE_URL_MAX,
        `Your Facebook URL must be less than ${constants.lengths.WEBSITE_URL_MAX} characters long.`,
    ],
    description:
        'The Facebook URL must be unique across all users and follow the predefined URL pattern.',
};

/**
 * @schema twitterSchema
 * Manages Twitter handles, ensuring each is unique and follows a specific format, which is crucial for integrating social media functionalities.
 */
const twitterSchema = {
    type: String,
    trim: true,
    sparse: true,
    unique: [true, 'This Twitter handle is already linked to another account.'],
    match: [
        patterns.TWITTER_URL,
        'Invalid twitter url format. Please enter a valid twitter url.',
    ],
    maxlength: [
        constants.lengths.WEBSITE_URL_MAX,
        `Your Twitter handle must be less than ${constants.lengths.WEBSITE_URL_MAX} characters long.`,
    ],
    description:
        'The Twitter handle must be unique and comply with a specific URL format.',
};

/**
 * @schema linkedInSchema
 * Handles LinkedIn profile URLs, ensuring each is unique and adheres to a specific format, facilitating professional networking integrations.
 */
const linkedInSchema = {
    type: String,
    trim: true,
    sparse: true,
    unique: [
        true,
        'This LinkedIn profile is already linked to another account.',
    ],
    match: [
        patterns.LINKEDIN_URL,
        'Invalid linkedIn url format. Please enter a valid linkedIn url.',
    ],
    maxlength: [
        constants.lengths.WEBSITE_URL_MAX,
        `Your LinkedIn URL must be less than ${constants.lengths.WEBSITE_URL_MAX} characters long.`,
    ],
    description:
        'LinkedIn URLs are unique to each user, adhering to the required LinkedIn format.',
};

/**
 * @schema githubSchema
 * Manages GitHub usernames, validating uniqueness and format to integrate coding community profiles for user accounts.
 */
const githubSchema = {
    type: String,
    trim: true,
    sparse: true,
    unique: [
        true,
        'This GitHub username is already linked to another account.',
    ],
    match: [
        patterns.GITHUB_URL,
        'Invalid github url format. Please enter a valid github url.',
    ],
    maxlength: [
        constants.lengths.WEBSITE_URL_MAX,
        `Your GitHub username must be less than ${constants.lengths.WEBSITE_URL_MAX} characters long.`,
    ],
    description:
        "GitHub's usernames need to follow a specific format and be unique among all system users.",
};

/**
 * @schema companySchema
 * Stores information about a user's employer, including name and contact details, providing context for professional relationships within the application.
 */
const companySchema = new Schema({
    // TODO: suggest company name when a user try to add company
    name: {
        type: String,
        trim: true,
        maxlength: [
            userConstants.lengths.COMPANY.NAME_MAX,
            `Company name should not exceed ${userConstants.lengths.COMPANY.NAME_MAX} characters.`,
        ],
        description:
            "Optional field for storing the name of the user's employer, with validation on length.",
    },
    address: addressSchema,
    website: urlSchema,
    facebook: facebookSchema,
    twitter: twitterSchema,
    linkedIn: linkedInSchema,
    github: githubSchema,
});

/**
 * @schema externalOAuthSchema
 * Handles OAuth identifiers for external accounts like Google, Facebook, Twitter, LinkedIn, and GitHub, ensuring each identifier is unique and properly stored.
 */
const externalOAuthSchema = new Schema({
    googleId: {
        type: String,
        trim: true,
        sparse: true,
        unique: [true, 'This Google account is already registered.'],
        maxlength: [
            constants.lengths.EXTERNAL_AUTH_ID_MAX,
            `The Google ID must be less than ${constants.lengths.EXTERNAL_AUTH_ID_MAX} characters.`,
        ],
        description:
            "Google ID is used for identifying user's Google account for OAuth authentication purposes. Must be unique.",
    },
    facebookId: {
        type: String,
        trim: true,
        sparse: true,
        unique: [true, 'This Facebook account is already registered.'],
        maxlength: [
            constants.lengths.EXTERNAL_AUTH_ID_MAX,
            `The Facebook ID must be less than ${constants.lengths.EXTERNAL_AUTH_ID_MAX} characters.`,
        ],
        description:
            "Facebook ID is used for identifying user's Facebook account in OAuth integrations. Ensures uniqueness in the system.",
    },
    twitterId: {
        type: String,
        trim: true,
        sparse: true,
        unique: [true, 'This Twitter account is already registered.'],
        maxlength: [
            constants.lengths.EXTERNAL_AUTH_ID_MAX,
            `The Twitter ID must be less than ${constants.lengths.EXTERNAL_AUTH_ID_MAX} characters.`,
        ],
        description:
            "Twitter ID is used for OAuth authentication and to link the user's Twitter profile to their account on this system. It must be unique.",
    },
    linkedInId: {
        type: String,
        trim: true,
        sparse: true,
        unique: [true, 'This LinkedIn account is already registered.'],
        maxlength: [
            constants.lengths.EXTERNAL_AUTH_ID_MAX,
            `The LinkedIn ID must be less than ${constants.lengths.EXTERNAL_AUTH_ID_MAX} characters.`,
        ],
        description:
            "LinkedIn ID is uniquely associated with the user's LinkedIn account for authentication and profile linkage purposes.",
    },
    githubId: {
        type: String,
        trim: true,
        sparse: true,
        unique: [true, 'This GitHub account is already registered.'],
        maxlength: [
            constants.lengths.EXTERNAL_AUTH_ID_MAX,
            `The GitHub ID must be less than ${constants.lengths.EXTERNAL_AUTH_ID_MAX} characters.`,
        ],
        description:
            "GitHub ID is a unique identifier used to link and authenticate the user's GitHub profile within our application.",
    },
});

/**
 * @schema loginSchema
 * Tracks details of login attempts, both failed and successful, providing insights into user behavior and potential security incidents.
 */
const loginSchema = new Schema({
    failed: {
        device: [
            {
                details: {
                    type: String,
                    description:
                        'Detailed information about the device used during the failed attempt, such as device type, browser, and IP address.',
                },
                dateTime: {
                    type: Date,
                    description:
                        'The exact date and time when the failed login attempt occurred.',
                },
            },
        ],
    },
    successful: {
        device: [
            {
                details: {
                    type: String,
                    description:
                        'Detailed information about the device used during the successful login, such as device type, browser, and IP address.',
                },
                dateTime: {
                    type: Date,
                    description:
                        'The exact date and time when the successful login occurred.',
                },
            },
        ],
    },
});

/**
 * @schema sessionsSchema
 * Manages session information, including tokens and their expiration times, crucial for maintaining secure and valid user sessions within the application.
 */
const sessionsSchema = new Schema({
    token: {
        type: String,
        trim: true,
        required: [
            true,
            'A session token is required. This token is crucial for authenticating user sessions and ensuring secure interaction with the application.',
        ],
        description:
            'A unique session token that is used to authenticate user sessions. This token is generated upon successful login and is necessary to access secure parts of the application.',
    },
    expiresAt: {
        type: Date,
        trim: true,
        required: [
            true,
            'An expiration date for the session token is required. Setting an expiration date helps maintain security by invalidating the session token after a period of time.',
        ],
        description:
            'The date and time when the session token expires. This mechanism is used to ensure that sessions are automatically terminated after a certain period, enhancing the security by preventing old session tokens from being used indefinitely.',
    },
});

/**
 * @schema activitiesSchema
 * Captures user activities within the application, detailing the type of action, associated metadata, and the exact time it occurred, facilitating audits and behavior analysis.
 */
const activitiesSchema = new Schema({
    category: {
        type: String,
        enum: Object.values(userConstants.activityType),
        description:
            'Describes the category of activity performed by the user, such as security, appearance.',
    },
    action: {
        type: String,
        required: [
            true,
            'Recording the type of action is necessary to track user activities accurately.',
        ],
        description:
            'Describes the type of activity performed by the user, such as login, logout, data entry, etc.',
    },
    details: {
        type: String,
        required: [
            true,
            'Action details is necessary to track user activities accurately.',
        ],
        description:
            'Details activity performed by the user, such as login, logout, data entry, etc.',
    },
    date: {
        type: Date,
        default: Date.now,
        description:
            'The exact date and time when the activity occurred. Automatically set to the current date and time by default.',
    },
    metadata: {
        type: Schema.Types.Mixed,
        description:
            'Additional details associated with the activity, stored in a flexible schema-less format. This can include specifics like IP address, device used, location, or other context-specific data.',
    },
});

/**
 * @schema appearanceSchema
 * Stores user preferences for application themes, allowing for a customized look and feel of the user interface based on individual preferences.
 */
const appearanceSchema = new Schema({
    theme: {
        name: {
            type: String,
            trim: true,
            description:
                'The name of the theme chosen by the user. This setting determines the overall look and feel of the application, enabling a personalized user experience.',
        },
    },
});

/**
 * @schema profileVisibilitySchema
 * Controls the visibility of user profiles to others within the application, allowing users to manage privacy settings according to their preferences.
 */
const profileVisibilitySchema = {
    type: String,
    trim: true,
    enum: ['public', 'private', 'friends'],
    default: 'public',
    description: 'Controls the visibility of the user profile to other users.',
};

/**
 * @schema createdByAdminSchema
 * References the admin who created the record, used for tracking which administrator has made changes to user data or profiles.
 */
const createdByAdminSchema = {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    description:
        'Reference to the admin who created this record, used for tracking record ownership.',
};

/**
 * @schema updatedByAdminSchema
 * Tracks the last admin to update the record, ensuring accountability and providing a trace of administrative actions on user data.
 */
const updatedByAdminSchema = {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    description:
        'Reference to the admin who last updated this record, used for tracking changes and record ownership.',
};

const sharedSchema = {
    usernameSchema,
    dateOfBirthSchema,
    bioSchema,
    pronounsSchema,
    numericIdSchema,
    userIdSchema,
    imageSchema,
    nameSchema,
    addressSchema,
    passwordHashSchema,
    roleSchema,
    twoFactorEnabledSchema,
    twoFactorSecretSchema,
    mustChangePasswordSchema,
    companySchema,
    resetPasswordVerifyTokenSchema,
    resetPasswordVerifyTokenExpiresSchema,
    urlSchema,
    emailSchema,
    isPrimaryEmailSchema,
    isEmailVerifiedSchema,
    emailVerifyTokenSchema,
    emailVerifyTokenExpiresSchema,
    mobileSchema,
    isPrimaryMobileSchema,
    isMobileVerifiedSchema,
    mobileVerifyTokenSchema,
    mobileVerifyTokenExpiresSchema,
    isActiveSchema,
    facebookSchema,
    twitterSchema,
    linkedInSchema,
    githubSchema,
    externalOAuthSchema,
    loginSchema,
    sessionsSchema,
    activitiesSchema,
    appearanceSchema,
    profileVisibilitySchema,
    createdByAdminSchema,
    updatedByAdminSchema,
};

export default sharedSchema;
