'use strict';

/**
 * @fileoverview This module provides a service for interfacing with Google Drive via the Google Drive API. It facilitates
 * uploading and deleting files in a specified Google Drive folder, leveraging the capabilities of the `@googleapis/drive`
 * library. The service utilizes OAuth2 authentication to securely access and modify resources on Google Drive based on
 * configurations defined in a separate module.
 *
 * The primary functionalities include:
 * - `uploadFile`: Handles the uploading of files to Google Drive, setting permissions to ensure that the files are
 *   shareable and retrievable via a public link. It uses a readable stream to handle file data, accommodating larger files
 *   by streaming them directly to Google Drive.
 * - `deleteFile`: Provides the capability to delete files from Google Drive by their file ID, supporting clean-up and
 *   management of files within the application's designated Google Drive folder.
 *
 * These functions are designed to encapsulate Google Drive operations in a reusable service that abstracts the
 * complexity of direct API interactions, promoting maintainability and scalability in applications that require
 * file storage and management functionalities.
 */

import google from '@googleapis/drive';
import { Readable } from 'stream';

import configuration from '../configuration/configuration.js';
import googleDriveConfiguration from '../configuration/googleDrive.configuration.js';

/**
 * Uploads a file to Google Drive and sets it to be publicly viewable via a shareable link. This function initializes
 * a Google Drive client using authenticated credentials, then streams the file directly to Google Drive to handle
 * potentially large files efficiently. It also sets the necessary permissions to allow anyone with the link to view
 * the file. Upon successful upload, the function retrieves and returns the Google Drive file ID, the web view link,
 * and a direct download link.
 *
 * The function handles file metadata and stream setup, ensuring that the uploaded file retains its original name
 * and type as specified in the incoming file object. Errors during the upload process are caught and returned,
 * allowing calling functions to handle them appropriately.
 *
 * @async
 * @function uploadFile
 * @param {Object} file - The file object to upload, which should include buffer, originalname, and mimetype properties.
 * @returns {Promise<Object>} A promise that resolves to an object containing file details such as ID and links,
 *                            or rejects with an error if the upload fails.
 * @example
 * try {
 *     const fileDetails = await GoogleDriveService.uploadFile(file);
 *     console.log('Uploaded file details:', fileDetails);
 * } catch (error) {
 *     console.error('Error uploading file:', error);
 * }
 */
const uploadFile = async (file) => {
    try {
        const authorizationClient = await googleDriveConfiguration();
        const drive = google.drive({
            version: 'v3',
            auth: authorizationClient,
        });
        const fileMetaData = {
            name: file?.originalname,
            parents: [configuration.googleDrive.folderKey],
        };
        const fileStream = new Readable();

        fileStream?.push(file.buffer);
        fileStream?.push(null);

        // Upload the file
        const { data: fileData } = await drive.files.create({
            requestBody: fileMetaData,
            media: {
                body: fileStream,
                mimeType: file?.mimetype,
            },
            fields: 'id',
        });

        // Set the file permissions to 'anyone with the link can view'
        await drive.permissions.create({
            fileId: fileData?.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Get the shareable link
        const { data: fileInfo } = await drive.files.get({
            fileId: fileData?.id,
            fields: 'webViewLink',
        });

        return {
            fileId: fileData?.id,
            shareableLink: fileInfo?.webViewLink,
            downloadLink: `https://drive.google.com/u/1/uc?id=${fileData?.id}&export=download`,
        };
    } catch (error) {
        return error;
    }
};

/**
 * Deletes a file from Google Drive using its file ID. This function initializes a Google Drive client with
 * authenticated credentials and sends a request to delete the specified file. It handles errors by catching
 * them and returning them to the caller, allowing for appropriate error handling in the application.
 *
 * This function is useful for managing file storage by removing unnecessary or obsolete files from Google Drive,
 * ensuring efficient use of storage space and adherence to data management policies.
 *
 * @async
 * @function deleteFile
 * @param {string} fileId - The ID of the file to delete from Google Drive.
 * @returns {Promise<void>} A promise that resolves if the file is successfully deleted,
 *                           or rejects with an error if the deletion fails.
 * @example
 * try {
 *     await GoogleDriveService.deleteFile('some-file-id');
 *     console.log('File deleted successfully.');
 * } catch (error) {
 *     console.error('Error deleting file:', error);
 * }
 */
const deleteFile = async (fileId) => {
    try {
        const authorizationClient = await googleDriveConfiguration();
        const drive = google.drive({
            version: 'v3',
            auth: authorizationClient,
        });

        return await drive.files.delete({ fileId });
    } catch (error) {
        return error;
    }
};

const GoogleDriveService = {
    uploadFile,
    deleteFile,
};

export default GoogleDriveService;
