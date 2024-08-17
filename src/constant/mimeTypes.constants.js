'use strict';

/**
 * @fileoverview Defines common MIME types for use in API responses.
 * These MIME types represent various types of content that can be served by the API.
 * Adjust these MIME types as needed to align with the APIs content requirements.
 *
 * @author Mohammad Montasim -Al- Mamun Shuvo
 * @date 2024-03-03
 */

/**
 * MIME Type for PDF files.
 * @type {string}
 */
const PDF = 'application/pdf';

/**
 * MIME Type for JPEG images.
 * @type {string}
 */
const JPG = 'image/jpeg';

/**
 * MIME Type for PNG images.
 * @type {string}
 */
const PNG = 'image/png';

/**
 * MIME Type for ICO images.
 * @type {string}
 */
const ICO = 'image/x-icon';

/**
 * MIME Type for MP4 videos.
 * @type {string}
 */
const MP4 = 'video/mp4';

/**
 * MIME Type for JSON data.
 * @type {string}
 */
const JSON = 'application/json';

/**
 * MIME Type for XML data.
 * @type {string}
 */
const XML = 'application/xml';

/**
 * MIME Type for JavaScript files.
 * @type {string}
 */
const JS = 'application/javascript';

/**
 * MIME Type for CSS files.
 * @type {string}
 */
const CSS = 'text/css';

/**
 * MIME Type for HTML files.
 * @type {string}
 */
const HTML = 'text/html';

/**
 * MIME Type for GIF images.
 * @type {string}
 */
const GIF = 'image/gif';

/**
 * MIME Type for BMP images.
 * @type {string}
 */
const BMP = 'image/bmp';

/**
 * MIME Type for TIFF images.
 * @type {string}
 */
const TIFF = 'image/tiff';

/**
 * MIME Type for SVG images.
 * @type {string}
 */
const SVG = 'image/svg+xml';

/**
 * MIME Type for MP3 audio files.
 * @type {string}
 */
const MP3 = 'audio/mpeg';

/**
 * MIME Type for WAV audio files.
 * @type {string}
 */
const WAV = 'audio/wav';

/**
 * MIME Type for ZIP archives.
 * @type {string}
 */
const ZIP = 'application/zip';

/**
 * MIME Type for RAR archives.
 * @type {string}
 */
const RAR = 'application/vnd.rar';

/**
 * MIME Type for Markdown files.
 * @type {string}
 */
const MD = 'text/markdown';

/**
 * MIME Type for Plain Text files.
 * @type {string}
 */
const TXT = 'text/plain';

/**
 * MIME Type for CSV files.
 * @type {string}
 */
const CSV = 'text/csv';

// Export the MIME types for use in other parts of the application
const mimeTypesConstants = {
    PDF,
    JPG,
    PNG,
    ICO,
    MP4,
    JSON,
    XML,
    JS,
    CSS,
    HTML,
    GIF,
    BMP,
    TIFF,
    SVG,
    MP3,
    WAV,
    ZIP,
    RAR,
    MD,
    TXT,
    CSV,
};

export default mimeTypesConstants;
