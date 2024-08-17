'use strict';

/**
 * @fileoverview This module defines a utility function that extracts permission strings from a provided routes object.
 * Each route object may contain permissions relevant to different actions like 'read', 'write', 'delete', etc.
 * The function iterates over each route and compiles a list of these permission strings, which can be used to configure access controls
 * or roles within an application. This modular approach allows for a centralized management of route-based permissions,
 * facilitating easier updates and management of permissions throughout the application lifecycle.
 *
 * @description The `generatePermissions` function is designed to be a flexible utility that can handle various structures of route configurations,
 * extracting permission strings efficiently. It serves as a core component in managing role-based access control (RBAC) systems,
 * where permissions need to be dynamically assigned and managed based on route configurations.
 */

const generatePermissions = (routes) => {
    const permissions = [];

    // Iterate over each route in the routes object
    for (const key in routes) {
        const route = routes[key];

        // Extract specific permissions from each route
        if (route.permissions) {
            for (const action in route.permissions) {
                // Directly use the predefined permission strings
                permissions.push(route.permissions[action]);
            }
        }
    }

    return permissions;
};

export default generatePermissions;
