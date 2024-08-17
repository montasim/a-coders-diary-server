'use strict';

/**
 * @fileoverview Defines common file extension types for use in API responses.
 * These file extension types represent various types of files that can be served by the API.
 * Adjust these file extension types as needed to align with the API's content requirements.
 *
 * This structured approach using an object makes it easy to add, remove or access file types.
 *
 * @author Mohammad Montasim -Al- Mamun Shuvo
 * @date 2024-03-03
 */

// Object containing file extension types
const fileExtensions = {
    PDF: 'pdf',
    JPG: 'jpg',
    PNG: 'png',
    ICO: 'ico',
    GIF: 'gif', // Added GIF for images
    MP4: 'mp4',
    MP3: 'mp3', // Added MP3 for audio files
    JSON: 'json',
    XML: 'xml',
    JS: 'js',
    CSS: 'css',
    HTML: 'html',
    CSV: 'csv', // Added CSV for spreadsheet documents
    TXT: 'txt', // Added TXT for text files
};

export default fileExtensions;
