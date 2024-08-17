'use strict';

/**
 * @fileoverview This module defines the `prepareEmail` function, which is a utility to generate complete HTML email templates dynamically.
 * It constructs an HTML email with a customizable page title, preheader text, hero section, main content section, and footer content.
 * The function leverages inline styles to ensure compatibility across various email clients and ensures that fonts and other elements render as expected.
 * It is particularly useful for applications that need to send stylized email notifications or updates with a consistent look and feel across different platforms.

 * @description The `prepareEmail` function accepts parameters for different sections of an email, which it then uses to construct a full HTML document formatted for email use.
 * This includes setting meta tags for responsiveness and compatibility, defining web-safe fonts, and handling common email client quirks such as image scaling and link color behavior.
 * The result is a string that represents a complete, ready-to-send HTML email. This utility is ideal for use in backend systems where email content needs to be generated dynamically based on application data or user interactions.
 */

const prepareEmail = (
    pageTitle,
    preheaderText,
    heroSection,
    mainSection,
    footerContent
) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>${pageTitle}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                /**
                 * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
                 */
                @media screen {
                    @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                    }

                    @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                    }
                }

                /**
                 * Avoid browser level font resizing.
                 * 1. Windows Mobile
                 * 2. iOS / OSX
                 */
                body,
                table,
                td,
                a {
                    -ms-text-size-adjust: 100%; /* 1 */
                    -webkit-text-size-adjust: 100%; /* 2 */
                }

                /**
                 * Remove extra space added to tables and cells in Outlook.
                 */
                table,
                td {
                    mso-table-rspace: 0pt;
                    mso-table-lspace: 0pt;
                }

                /**
                 * Better fluid images in Internet Explorer.
                 */
                img {
                    -ms-interpolation-mode: bicubic;
                }

                /**
                 * Remove blue links for iOS devices.
                 */
                a[x-apple-data-detectors] {
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    color: inherit !important;
                    text-decoration: none !important;
                }

                /**
                 * Fix centering issues in Android 4.4.
                 */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }

                body {
                    width: 100% !important;
                    height: 100% !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                /**
                 * Collapse table borders to avoid space between cells.
                 */
                table {
                    border-collapse: collapse !important;
                }

                a {
                    color: black;
                }

                img {
                    height: auto;
                    line-height: 100%;
                    text-decoration: none;
                    border: 0;
                    outline: none;
                }
            </style>
        </head>

        <body style="background-color: #e9ecef;">
            <!-- start preheader -->
            <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                ${preheaderText || ''}
            </div>
            <!-- end preheader -->

            <!-- start body -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">

                <!-- start logo -->
                <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                            <tr>
                                <td align="center" valign="top" width="600">
                        <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 36px 24px;">
                                    <a href="https://github.com/montasim" target="_blank" rel="noopener noreferrer" style="display: inline-block;">
                                        <img src="https://avatars.githubusercontent.com/u/95298623?v=4" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                                    </a>
                                </td>
                            </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
                <!-- end logo -->

                <!-- start hero -->
                ${heroSection || ''}
                <!-- end hero -->

                <!-- start copy block -->
                ${mainSection || ''}
                <!-- end copy block -->

                <!-- start footer -->
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                        <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                            <tr>
                                <td align="center" valign="top" width="600">
                        <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                            <!-- start permission -->
                            ${footerContent || ''}
                            <!-- end permission -->

                            <!-- start unsubscribe -->
                            <tr>
                                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                    <p style="margin: 0;">Library Management System, Dhaka, Bangladesh</p>
                                </td>
                            </tr>
                            <!-- end unsubscribe -->

                            <!-- start do not reply -->
                            <tr>
                                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                    <p style="margin: 0;">This email was sent automatically. Please do not reply.</p>
                                </td>
                            </tr>
                            <!-- end do not reply -->

                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                </tr>
                <!-- end footer -->

            </table>
            <!-- end body -->
        </body>
        </html>
    `;
};

export default prepareEmail;
