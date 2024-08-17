'use strict';

/**
 * @fileoverview Defines common Node.js system error codes for handling system-level errors.
 * These error codes are used by the Node.js API in response to operations like file access,
 * network requests, and subprocess management. This module centralizes error codes to improve
 * error handling practices across the application.
 *
 * @author Mohammad Montasim -Al- Mamun Shuvo
 * @date 2024-06-27
 */

/**
 * Error caused by attempting to access a file in a way that is not permitted.
 * @type {string}
 */
const EACCES = 'EACCES';

/**
 * Error caused by an attempt to bind to an address that is already in use.
 * @type {string}
 */
const EADDRINUSE = 'EADDRINUSE';

/**
 * Error indicating that a connection attempt was refused by the server.
 * @type {string}
 */
const ECONNREFUSED = 'ECONNREFUSED';

/**
 * Error where a connection was forcibly closed by a peer.
 * @type {string}
 */
const ECONNRESET = 'ECONNRESET';

/**
 * Error indicating that a file already exists in a location where it should not.
 * @type {string}
 */
const EEXIST = 'EEXIST';

/**
 * Error indicating that an operation expected a file, but the given path is a directory.
 * @type {string}
 */
const EISDIR = 'EISDIR';

/**
 * Error caused by too many files being open in the system.
 * @type {string}
 */
const EMFILE = 'EMFILE';

/**
 * Error when a file or directory is not found.
 * @type {string}
 */
const ENOENT = 'ENOENT';

/**
 * Error indicating that a path component that was expected to be a directory is not.
 * @type {string}
 */
const ENOTDIR = 'ENOTDIR';

/**
 * Error typically related to DNS lookup failures.
 * @type {string}
 */
const ENOTFOUND = 'ENOTFOUND';

/**
 * Error indicating that an operation was not permitted, typically due to security restrictions.
 * @type {string}
 */
const EPERM = 'EPERM';

/**
 * Error where a write operation is made to a network connection that has been closed.
 * @type {string}
 */
const EPIPE = 'EPIPE';

/**
 * Error indicating that a network operation timed out.
 * @type {string}
 */
const ETIMEDOUT = 'ETIMEDOUT';

/**
 * Error indicating that a resource temporarily unavailable, commonly encountered in non-blocking operations.
 * @type {string}
 */
const EAGAIN = 'EAGAIN';

/**
 * Error indicating that a block operation cannot proceed immediately.
 * @type {string}
 */
const EWOULDBLOCK = 'EWOULDBLOCK';

/**
 * Error indicating a protocol error.
 * @type {string}
 */
const EPROTO = 'EPROTO';

// Export the error codes as an object for easy access throughout the application
const errorCodes = {
    EACCES,
    EADDRINUSE,
    ECONNREFUSED,
    ECONNRESET,
    EEXIST,
    EISDIR,
    EMFILE,
    ENOENT,
    ENOTDIR,
    ENOTFOUND,
    EPERM,
    EPIPE,
    ETIMEDOUT,
    EAGAIN,
    EWOULDBLOCK,
    EPROTO,
};

export default errorCodes;
