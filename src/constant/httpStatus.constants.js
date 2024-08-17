'use strict';

/**
 * @fileoverview Defines common HTTP status codes for use in API responses.
 * These status codes represent various states of HTTP responses and are
 * commonly used to communicate the result of API requests.
 * Adjust these codes as needed to align with the APIs response requirements.
 *
 * @author Mohammad Montasim -Al- Mamun Shuvo
 * @date 2024-03-03
 */

/**
 * Informational responses (100–199)
 */

/**
 * Continue - The initial part of a requestBooks has been received and has not yet been rejected by the server.
 * @type {number}
 */
const CONTINUE = 100;

/**
 * Switching Protocols - The server understands and is willing to comply with the client's requestBooks to switch protocols.
 * @type {number}
 */
const SWITCHING_PROTOCOLS = 101;

/**
 * Processing - The server has received and is processing the requestBooks, but no response is available yet.
 * @type {number}
 */
const PROCESSING = 102;

/**
 * Early Hints - Used to return some response headers before final HTTP message.
 * @type {number}
 */
const EARLY_HINTS = 103;

/**
 * Successful responses (200–299)
 */

/**
 * OK - The requestBooks has succeeded.
 * @type {number}
 */
const OK = 200;

/**
 * Created - The requestBooks has been fulfilled, resulting in the creation of a new resource.
 * @type {number}
 */
const CREATED = 201;

/**
 * Accepted - The requestBooks has been accepted for processing, but the processing has not been completed.
 * @type {number}
 */
const ACCEPTED = 202;

/**
 * Non-Authoritative Information - The requestBooks was successful but the enclosed payload has been modified by a transforming proxy from that of the origin server's 200 OK response.
 * @type {number}
 */
const NON_AUTHORITATIVE_INFORMATION = 203;

/**
 * No Content - The server successfully processed the requestBooks, but is not returning any content.
 * @type {number}
 */
const NO_CONTENT = 204;

/**
 * Reset Content - The server successfully processed the requestBooks, but is not returning any content and requires that the requester reset the document view.
 * @type {number}
 */
const RESET_CONTENT = 205;

/**
 * Partial Content - The server is delivering only part of the resource (byte serving) due to a range header sent by the client.
 * @type {number}
 */
const PARTIAL_CONTENT = 206;

/**
 * Multi-Status - The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.
 * @type {number}
 */
const MULTI_STATUS = 207;

/**
 * Already Reported - The members of a DAV binding have already been enumerated in a previous reply to this requestBooks, and are not being included again.
 * @type {number}
 */
const ALREADY_REPORTED = 208;

/**
 * IM Used - The server has fulfilled a requestBooks for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
 * @type {number}
 */
const IM_USED = 226;

/**
 * Redirection messages (300–399)
 */

/**
 * Multiple Choices - Indicates multiple options for the resource from which the client may choose.
 * @type {number}
 */
const MULTIPLE_CHOICES = 300;

/**
 * Moved Permanently - This and all future requests should be directed to the given URI.
 * @type {number}
 */
const MOVED_PERMANENTLY = 301;

/**
 * Found - Tells the client to look at another URL.
 * @type {number}
 */
const FOUND = 302;

/**
 * See Other - The response to the requestBooks can be found under another URI using the GET method.
 * @type {number}
 */
const SEE_OTHER = 303;

/**
 * Not Modified - Indicates that the resource has not been modified since the version specified by the requestBooks headers.
 * @type {number}
 */
const NOT_MODIFIED = 304;

/**
 * Use Proxy - The requested resource is available only through a proxy, the address for which is provided in the response.
 * @type {number}
 */
const USE_PROXY = 305;

/**
 * Temporary Redirect - The server is currently responding to the requestBooks with a URI for a different resource.
 * @type {number}
 */
const TEMPORARY_REDIRECT = 307;

/**
 * Permanent Redirect - The requestBooks and all future requests should be repeated using another URI.
 * @type {number}
 */
const PERMANENT_REDIRECT = 308;

/**
 * Client error responses (400–499)
 */

/**
 * Bad Request - The server cannot process the requestBooks due to a client error.
 * @type {number}
 */
const BAD_REQUEST = 400;

/**
 * Unauthorized - The client must authenticate itself to get the requested response.
 * @type {number}
 */
const UNAUTHORIZED = 401;

/**
 * Payment Required - Reserved for future use.
 * @type {number}
 */
const PAYMENT_REQUIRED = 402;

/**
 * Forbidden - The client does not have access rights to the content.
 * @type {number}
 */
const FORBIDDEN = 403;

/**
 * Not Found - The server cannot find the requested resource.
 * @type {number}
 */
const NOT_FOUND = 404;

/**
 * Method Not Allowed - The requestBooks method is known by the server but is not supported by the target resource.
 * @type {number}
 */
const METHOD_NOT_ALLOWED = 405;

/**
 * Not Acceptable - The server cannot produce a response matching the list of acceptable values defined in the requestBooks's proactive content negotiation headers.
 * @type {number}
 */
const NOT_ACCEPTABLE = 406;

/**
 * Proxy Authentication Required - The client must first authenticate itself with the proxy.
 * @type {number}
 */
const PROXY_AUTHENTICATION_REQUIRED = 407;

/**
 * Request Timeout - The server would like to shut down this unused connection.
 * @type {number}
 */
const REQUEST_TIMEOUT = 408;

/**
 * Conflict - The requestBooks could not be completed due to a conflict with the current state of the target resource.
 * @type {number}
 */
const CONFLICT = 409;

/**
 * Gone - The content has been permanently deleted from server, with no forwarding address.
 * @type {number}
 */
const GONE = 410;

/**
 * Length Required - The server rejects the requestBooks because the Content-Length header field is not defined and the server requires it.
 * @type {number}
 */
const LENGTH_REQUIRED = 411;

/**
 * Precondition Failed - The server does not meet one of the preconditions that the requester put on the requestBooks header fields.
 * @type {number}
 */
const PRECONDITION_FAILED = 412;

/**
 * Payload Too Large - The requestBooks is larger than the server is willing or able to process.
 * @type {number}
 */
const PAYLOAD_TOO_LARGE = 413;

/**
 * URI Too Long - The URI provided was too long for the server to process.
 * @type {number}
 */
const URI_TOO_LONG = 414;

/**
 * Unsupported Media Type - The requestBooks entity has a media type which the server or resource does not support.
 * @type {number}
 */
const UNSUPPORTED_MEDIA_TYPE = 415;

/**
 * Range Not Satisfiable - The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
 * @type {number}
 */
const RANGE_NOT_SATISFIABLE = 416;

/**
 * Expectation Failed - The server cannot meet the requirements of the Expect requestBooks-header field.
 * @type {number}
 */
const EXPECTATION_FAILED = 417;

/**
 * I'm a teapot - Defined in 1998 as an April Fools' joke in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers.
 * @type {number}
 */
const IM_A_TEAPOT = 418;

/**
 * Misdirected Request - The requestBooks was directed at a server that is not able to produce a response.
 * @type {number}
 */
const MISDIRECTED_REQUEST = 421;

/**
 * Unprocessable Entity - The server understands the content type of the requestBooks entity,
 * and the syntax of the requestBooks entity is correct, but it was unable to process the contained instructions.
 * @type {number}
 */
const UNPROCESSABLE_ENTITY = 422;

/**
 * Locked - The resource that is being accessed is locked.
 * @type {number}
 */
const LOCKED = 423;

/**
 * Failed Dependency - The requestBooks failed due to failure of a previous requestBooks.
 * @type {number}
 */
const FAILED_DEPENDENCY = 424;

/**
 * Too Early - Indicates that the server is unwilling to risk processing a requestBooks that might be replayed.
 * @type {number}
 */
const TOO_EARLY = 425;

/**
 * Upgrade Required - The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
 * @type {number}
 */
const UPGRADE_REQUIRED = 426;

/**
 * Precondition Required - The origin server requires the requestBooks to be conditional.
 * @type {number}
 */
const PRECONDITION_REQUIRED = 428;

/**
 * Too Many Requests - The user has sent too many requests in a given amount of time ("rate limiting").
 * @type {number}
 */
const TOO_MANY_REQUESTS = 429;

/**
 * Request Header Fields Too Large - The server is unwilling to process the requestBooks because its header fields are too large.
 * @type {number}
 */
const REQUEST_HEADER_FIELDS_TOO_LARGE = 431;

/**
 * Unavailable For Legal Reasons - The user requests an illegal resource, such as a web page censored by a government.
 * @type {number}
 */
const UNAVAILABLE_FOR_LEGAL_REASONS = 451;

/**
 * Server error responses (500–599)
 */

/**
 * Internal Server Error - A generic error message, given when an unexpected condition
 * was encountered and no more specific message is suitable.
 * @type {number}
 */
const INTERNAL_SERVER_ERROR = 500;

/**
 * Not Implemented - The server either does not recognize the requestBooks method, or it lacks the ability to fulfil the requestBooks.
 * @type {number}
 */
const NOT_IMPLEMENTED = 501;

/**
 * Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.
 * @type {number}
 */
const BAD_GATEWAY = 502;

/**
 * Service Unavailable - The server is not ready to handle the requestBooks.
 * @type {number}
 */
const SERVICE_UNAVAILABLE = 503;

/**
 * Gateway Timeout - The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
 * @type {number}
 */
const GATEWAY_TIMEOUT = 504;

/**
 * HTTP Version Not Supported - The HTTP version used in the requestBooks is not supported by the server.
 * @type {number}
 */
const HTTP_VERSION_NOT_SUPPORTED = 505;

/**
 * Variant Also Negotiates - The server has an internal configuration error: transparent content negotiation for the requestBooks results in a circular reference.
 * @type {number}
 */
const VARIANT_ALSO_NEGOTIATES = 506;

/**
 * Insufficient Storage - The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the requestBooks.
 * @type {number}
 */
const INSUFFICIENT_STORAGE = 507;

/**
 * Loop Detected - The server detected an infinite loop while processing a requestBooks.
 * @type {number}
 */
const LOOP_DETECTED = 508;

/**
 * Not Extended - Further extensions to the requestBooks are required for the server to fulfil it.
 * @type {number}
 */
const NOT_EXTENDED = 510;

/**
 * Network Authentication Required - The client needs to authenticate to gain network access.
 * @type {number}
 */
const NETWORK_AUTHENTICATION_REQUIRED = 511;

// Export the status codes for use in other parts of the application
const httpStatus = {
    CONTINUE,
    SWITCHING_PROTOCOLS,
    PROCESSING,
    EARLY_HINTS,
    OK,
    CREATED,
    ACCEPTED,
    NON_AUTHORITATIVE_INFORMATION,
    NO_CONTENT,
    RESET_CONTENT,
    PARTIAL_CONTENT,
    MULTI_STATUS,
    ALREADY_REPORTED,
    IM_USED,
    MULTIPLE_CHOICES,
    MOVED_PERMANENTLY,
    FOUND,
    SEE_OTHER,
    NOT_MODIFIED,
    USE_PROXY,
    TEMPORARY_REDIRECT,
    PERMANENT_REDIRECT,
    BAD_REQUEST,
    UNAUTHORIZED,
    PAYMENT_REQUIRED,
    FORBIDDEN,
    NOT_FOUND,
    METHOD_NOT_ALLOWED,
    NOT_ACCEPTABLE,
    PROXY_AUTHENTICATION_REQUIRED,
    REQUEST_TIMEOUT,
    CONFLICT,
    GONE,
    LENGTH_REQUIRED,
    PRECONDITION_FAILED,
    PAYLOAD_TOO_LARGE,
    URI_TOO_LONG,
    UNSUPPORTED_MEDIA_TYPE,
    RANGE_NOT_SATISFIABLE,
    EXPECTATION_FAILED,
    IM_A_TEAPOT,
    MISDIRECTED_REQUEST,
    UNPROCESSABLE_ENTITY,
    LOCKED,
    FAILED_DEPENDENCY,
    TOO_EARLY,
    UPGRADE_REQUIRED,
    PRECONDITION_REQUIRED,
    TOO_MANY_REQUESTS,
    REQUEST_HEADER_FIELDS_TOO_LARGE,
    UNAVAILABLE_FOR_LEGAL_REASONS,
    INTERNAL_SERVER_ERROR,
    NOT_IMPLEMENTED,
    BAD_GATEWAY,
    SERVICE_UNAVAILABLE,
    GATEWAY_TIMEOUT,
    HTTP_VERSION_NOT_SUPPORTED,
    VARIANT_ALSO_NEGOTIATES,
    INSUFFICIENT_STORAGE,
    LOOP_DETECTED,
    NOT_EXTENDED,
    NETWORK_AUTHENTICATION_REQUIRED,
};

export default httpStatus;
