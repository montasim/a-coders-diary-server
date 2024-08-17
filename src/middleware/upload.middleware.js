'use strict';

/**
 * @fileoverview This module configures and exports a middleware for handling file uploads in an Express application
 * using the multer library. The configured middleware uses memory storage, which means that files are stored in
 * the Node.js process's memory temporarily during the lifecycle of the request, and not written to the filesystem.
 * This setup is particularly useful for handling small files that need to be processed immediately rather than
 * stored permanently. The middleware imposes a file size limit to prevent overly large files from being uploaded,
 * protecting the application from potential resource exhaustion attacks.
 *
 * This approach to file handling is efficient for scenarios where files are small and can be quickly processed or
 * transferred to more permanent storage solutions like cloud storage services or databases.
 */

import multer from 'multer';

const storage = multer.memoryStorage();

/**
 * Provides a multer middleware configured for memory storage with a specified file size limit. This middleware is
 * optimized for performance in environments where file uploads are expected to be part of the request processing but
 * do not need to be retained on the server's local file system. It's an ideal choice for handling image uploads,
 * small documents, or other media files that are intended for immediate processing or further uploading to external
 * storage services.
 *
 * @module uploadMiddleware
 * @description Configures multer for in-memory storage of uploads with a set file size limit.
 */
const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 1.1 * 1024 * 1024,
    },
});

export default uploadMiddleware;
