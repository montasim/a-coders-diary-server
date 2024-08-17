'use strict';

/**
 * @fileoverview This module defines and exports a structured collection of constants for routing and permissions
 * management in the application. It encapsulates route names and permission keys for various features within the system,
 * such as managing books, users, authentication, and more. This structured approach ensures that route and permission
 * identifiers are centralized, promoting consistency and reusability across the application.
 *
 * Each major feature or resource in the application has its own section within this constants object, detailing the base
 * route and any specific permissions related to actions that can be performed on that resource. This method simplifies
 * the maintenance of route and permission names, making it easier to update or reference them throughout the application's
 * authorization and routing logic.
 */

/**
 * Provides a comprehensive dictionary of route names and associated permissions for the application, facilitating a
 * standardized approach to defining and accessing these values. This setup not only aids in route management but also
 * integrates closely with the application's access control mechanisms, ensuring that permissions are correctly
 * associated with their respective routes and actions.
 *
 * @module routesConstants
 * @description Centralizes route names and permissions for easy and consistent access across the application.
 */

const routesConstants = {
    admin: {
        routes: 'admin',
        permissions: {
            create: 'create-admin',
        },
    },
    auth: {
        routes: 'auth',
    },
    detect: {
        routes: 'detect',
    },
    trending: {
        routes: 'trending',
    },
    user: {
        routes: 'user',
    },
    books: {
        routes: 'books',
        params: 'bookId',
        permissions: {
            create: 'create-book',
            getList: 'get-book-list',
            getById: 'get-book-by-id',
            updateById: 'update-book-by-id',
            deleteById: 'delete-book-by-id',
            deleteByList: 'delete-book-by-list',
        },
    },
    favouriteBooks: {
        routes: 'favourite',
        params: 'favouriteBookId',
    },
    desiredBooks: {
        routes: 'desired',
    },
    trendingBooks: {
        routes: 'books',
    },
    booksHistory: {
        routes: 'history',
        params: 'bookId',
    },
    lendBooks: {
        routes: 'lend',
        permissions: {
            create: 'create-lend',
            getList: 'get-favourite',
        },
    },
    requestBooks: {
        routes: 'request',
        params: 'requestedBookId',
        permissions: {
            create: 'create-request',
        },
    },
    returnBooks: {
        routes: 'return',
        params: 'favouriteBookId',
        permissions: {
            create: 'create-return',
        },
    },
    permissions: {
        routes: 'permissions',
        params: 'permissionId',
        permissions: {
            create: 'create-permission',
            getList: 'get-permission-list',
            getById: 'get-permission-by-id',
            updateById: 'update-permission-by-id',
            deleteById: 'delete-permission-by-id',
            deleteByList: 'delete-permission-by-list',
            createDefault: 'create-default-permission',
        },
    },
    pronouns: {
        routes: 'pronouns',
        params: 'pronounsId',
        permissions: {
            create: 'create-pronouns',
            getList: 'get-pronouns-list',
            getById: 'get-pronouns-by-id',
            updateById: 'update-pronouns-by-id',
            deleteById: 'delete-pronouns-by-id',
            deleteByList: 'delete-pronouns-by-list',
        },
    },
    publications: {
        routes: 'publications',
        params: 'publicationId',
        permissions: {
            create: 'create-publication',
            getList: 'get-publication-list',
            getById: 'get-publication-by-id',
            updateById: 'update-publication-by-id',
            deleteById: 'delete-publication-by-id',
            deleteByList: 'delete-publication-by-list',
        },
    },
    roles: {
        routes: 'roles',
        params: 'roleId',
        permissions: {
            create: 'create-role',
            getList: 'get-role-list',
            getById: 'get-role-by-id',
            updateById: 'update-role-by-id',
            deleteById: 'delete-role-by-id',
            deleteByList: 'delete-role-by-list',
            createDefault: 'create-default-role',
        },
    },
    subjects: {
        routes: 'subjects',
        params: 'subjectId',
        permissions: {
            create: 'create-subject',
            getList: 'get-subject-list',
            getById: 'get-subject-by-id',
            updateById: 'update-subject-by-id',
            deleteById: 'delete-subject-by-id',
            deleteByList: 'delete-subject-by-list',
        },
    },
    writers: {
        routes: 'writers',
        params: 'writerId',
        permissions: {
            create: 'create-writer',
            getList: 'get-writer-list',
            getById: 'get-writer-by-id',
            updateById: 'update-writer-by-id',
            deleteById: 'delete-writer-by-id',
            deleteByList: 'delete-writer-by-list',
        },
    },
};

export default routesConstants;
