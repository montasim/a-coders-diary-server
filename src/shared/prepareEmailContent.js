'use strict';

/**
 * @fileoverview This module provides the `prepareEmailContent` function, designed to generate the various sections of an HTML email template based on a given subject.
 * It supports multiple email types, each with customized content including titles, preheaders, hero images, main body text, and footer information.
 * This function is essential for creating dynamic email content that responds to different user interactions or system events within an application,
 * such as account creation, password resets, and system alerts. It utilizes placeholders and template literals to dynamically insert data into predefined HTML structures.
 */

/**
 * Generates email content based on the specified subject. This function selects the appropriate content template based on the subject parameter and populates it with data from the emailData object.
 * Each email type has a specific layout and messaging designed to fit the context of the email, whether it's a welcome message, password reset, or system alert.
 *
 * @param {string} subject - The subject of the email, which determines the type of email content to generate.
 * @param {Object} emailData - An object containing data to be included in the email. This may include URLs, user names, passwords, error details, etc.
 * @returns {Object|null} An object containing the structured content for the email (pageTitle, preheaderText, heroSection, mainSection, footerContent) or null if the subject is not recognized.
 */
const prepareEmailContent = (subject, emailData) => {
    let pageTitle, preheaderText, heroSection, mainSection, footerContent;

    switch (subject) {
        case 'Confirm Your Email Address':
            pageTitle = 'Email Confirmation';
            preheaderText =
                'Activate your account by confirming your email address.';
            heroSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
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
            `;
            mainSection = `
                <!-- start copy block -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">Click the button below to confirm your email address. If you did not request an account with us, please ignore this message.</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                      <!-- start button -->
                      <tr>
                        <td align="left" bgcolor="#ffffff">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                      <a href="${emailData.emailVerificationLink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Confirm your email</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <tr>
                              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                      <a href="${emailData.resendEmailVerificationLink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Resend verification</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- end button -->

                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                          <p style="margin: 0;"><a href="${emailData.emailVerificationLink}" target="_blank">${emailData.emailVerificationLink}</a></p>
                        </td>
                      </tr>
                      <!-- end copy -->

                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                          <p style="margin: 0;">Cheers,<br> Library Management System</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end copy block -->
            `;
            footerContent = `
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                        <p style="margin: 0;">You received this email because we received a request for your account. If you didn't request your account you can safely delete this email.</p>
                    </td>
                </tr>
            `;

            break;
        case 'Welcome Admin':
            pageTitle = 'Welcome to Our Service!';
            preheaderText = 'You are now an admin!';
            heroSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td bgcolor="#ffffff" align="left">
                          <img src="https://drive.google.com/file/d/1vZhJhh8meVW4IvijH5jUm8_23ptX6R_n/view?usp=sharing" alt="Welcome" width="600" style="display: block; width: 100%; max-width: 100%;">
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
            `;
            mainSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                      <!-- start copy -->
                      <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <h1 style="margin: 0 0 12px; font-size: 32px; font-weight: 400; line-height: 48px;">Welcome, ${emailData?.userName}!</h1>
                          <p style="margin: 0;">We are thrilled to have you with us. Get ready to explore all our features.</p>
                          <p style="margin: 0;">Your temporary password is <strong>${emailData.tempPassword}</strong>.</p>
                          <p style="margin: 0;">Pleae use the below link to reset your password <a href="${emailData.emailVerificationLink}">Reset password</a>.</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                          <p style="margin: 0;">Cheers,<br> Library Management System</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
            `;
            footerContent = `
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">You received this email because we received a request for your account. If you didn't request your account you can safely delete this email.</p>
                    </td>
                </tr>
            `;

            break;
        case 'Welcome Email':
            pageTitle = 'Welcome to Our Service!';
            preheaderText = 'You are now a member!';
            heroSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td bgcolor="#ffffff" align="left">
                          <img src="https://drive.google.com/file/d/1vZhJhh8meVW4IvijH5jUm8_23ptX6R_n/view?usp=sharing" alt="Welcome" width="600" style="display: block; width: 100%; max-width: 100%;">
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
            `;
            mainSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                      <!-- start copy -->
                      <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <h1 style="margin: 0 0 12px; font-size: 32px; font-weight: 400; line-height: 48px;">Welcome, ${emailData?.userName}!</h1>
                          <p style="margin: 0;">We are thrilled to have you with us. Get ready to explore all our features.</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                          <p style="margin: 0;">Cheers,<br> Library Management System</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
            `;
            footerContent = `
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">You received this email because we received a request for your account. If you didn't request your account you can safely delete this email.</p>
                    </td>
                </tr>
            `;

            break;
        case 'Login Successfully':
            pageTitle = 'Security Alert: New Login Detected';
            preheaderText =
                'A new login to your account was detected. If this was not you, please secure your account immediately.';
            heroSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td bgcolor="#ffffff" align="left">
                          <img src="https://drive.google.com/file/d/1vZhJhh8meVW4IvijH5jUm8_23ptX6R_n/view?usp=sharing" alt="Welcome" width="600" style="display: block; width: 100%; max-width: 100%;">
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
            `;
            mainSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                      <!-- start copy -->
                      <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <h1 style="margin: 0 0 12px; font-size: 32px; font-weight: 400; line-height: 48px;">Welcome, ${emailData?.userName}!</h1>
                          <p style="margin: 0;">We noticed a new login to your account from a ${emailData?.deviceType} device. This login occurred at ${emailData?.loginTime}, from the IP address ${emailData?.ipAddress}.</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                          <p style="margin: 0;">Cheers,<br> Library Management System</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
            `;
            footerContent = `
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">If you did not initiate this login, please <a href="${emailData?.resetPasswordLink}" style="color: #007bff; text-decoration: underline;">change your password immediately</a> and review your account security.</p>
                    </td>
                </tr>

                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">You received this email because we received a request for your account. If you didn't request your account you can safely delete this email.</p>
                    </td>
                </tr>
            `;

            break;
        case 'Reset Your Password':
            pageTitle = 'Password Reset';
            preheaderText =
                'Tap the button below to reset your customer account password.';
            heroSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Your Password</h1>
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
            `;
            mainSection = `
                <!-- start copy block -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                      <!-- start button -->
                      <tr>
                        <td align="left" bgcolor="#ffffff">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                      <a href="${emailData.resetPasswordVerificationLink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset password</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- end button -->

                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                          <p style="margin: 0;"><a href="${emailData.resetPasswordVerificationLink}" target="_blank">${emailData.resetPasswordVerificationLink}</a></p>
                        </td>
                      </tr>
                      <!-- end copy -->
            `;
            footerContent = `
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">You received this email because we received a password reset request for your account. If you didn't request this you can safely delete this email.</p>
                    </td>
                </tr>
            `;

            break;
        case 'Reset Password Successful':
            pageTitle = 'Your Password Has Been Reset Successfully';
            preheaderText = 'Your account security is our top priority!';
            heroSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td bgcolor="#ffffff" align="left">
                          <img src="https://drive.google.com/file/d/1vZhJhh8meVW4IvijH5jUm8_23ptX6R_n/view?usp=sharing" alt="Welcome" width="600" style="display: block; width: 100%; max-width: 100%;">
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
            `;
            mainSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                      <!-- start copy -->
                      <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <h1 style="margin: 0 0 12px; font-size: 32px; font-weight: 400; line-height: 48px;">Hi, ${emailData?.userName}!</h1>
                          <p style="margin: 0;">Your password has been reset successfully. You can now log in to your account using your new password. We recommend keeping your password secure and updating it regularly.</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                          <p style="margin: 0;">Cheers,<br> Library Management System</p>
                        </td>
                      </tr>
                      <!-- end copy -->

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
            `;
            footerContent = `
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">If you did not request this change or if you need assistance, please contact our support team immediately.</p>
                    </td>
                </tr>

                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">You received this email as a security measure. Please do not reply directly to this email.</p>
                  </td>
                </tr>
            `;

            break;
        case 'System Error - Critical Issue Detected':
            pageTitle = 'Critical System Alert for Administrators';
            preheaderText =
                'Urgent: Critical issue detected in the system that requires your immediate attention.';
            heroSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Attention Required: Critical System Alert</h1>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
            `;
            mainSection = `
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">A critical issue has been detected within our system infrastructure that requires your immediate investigation. Details of the error are as follows:</p>
                          <ul>
                            <li>Reason: ${emailData.reason}</li>
                            <li>Error Code: ${emailData.errorCode}</li>
                            <li>Component: ${emailData.component}</li>
                            <li>Path: ${emailData.path}</li>
                            <li>Address: ${emailData.address}</li>
                            <li>Port: ${emailData.port}</li>
                            <li>Time Detected: ${emailData.timeDetected}</li>
                          </ul>
                          <p>Please assess the situation and initiate the necessary protocols to mitigate the issue.</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" bgcolor="#ffffff">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                      <a href="${emailData.dashboardLink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Go to Dashboard</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                          <p style="margin: 0;">For additional support or to report further issues, please contact our technical support team.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
            `;
            footerContent = `
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">You received this email because we received a password reset request for your account. If you didn't request this you can safely delete this email.</p>
                    </td>
                </tr>
            `;

            break;
        default:
            return null; // Return null if subject does not match known types
    }

    return {
        pageTitle,
        preheaderText,
        heroSection,
        mainSection,
        footerContent,
    };
};

export default prepareEmailContent;
