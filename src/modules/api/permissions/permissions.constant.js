'use strict';

/**
 * @fileoverview This file defines constants for permissions-related operations.
 * These constants include validation criteria for permission names, such as length
 * constraints and regular expression patterns. It also provides custom error messages
 * for validation failures.
 */

const lengths = {
    NAME_MIN: 3,
    NAME_MAX: 100,
};

const pattern = {
    name: /^[a-z]+(-[a-z]+)+$/,
};

const message = {
    pattern: {
        name: 'Name must be in the format of "action-route" (e.g., "create-survey", "edit-survey"). No number is allowed.',
    },
};

const permissionsConstants = {
    lengths,
    pattern,
    message,
};

export default permissionsConstants;
