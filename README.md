[//]: # 'NODE EXPRESS BOILERPLATE'

# <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=24&duration=1&pause=1&color=EB008B&center=true&vCenter=true&repeat=false&width=335&height=40&lines=NODE+EXPRESS+BOILERPLATE" alt="LIBRARY MANAGEMENT SYSTEM SERVER" />

<!-- repository summary badges start -->
<div>
    <img alt="Continuous Integration" src="https://github.com/montasim/node-express-boilerplate/actions/workflows/ci.yml/badge.svg?labelColor=EB008B&color=00B8B5">
    <img alt="Wakatime coding time badge" src="https://wakatime.com/badge/user/bb224c90-7cb7-4c45-953e-a9e26c1cb06c/project/018e21fa-6cc2-477a-be0c-b5e44ca67f1c.svg?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/montasim/node-express-boilerplate?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/w/montasim/node-express-boilerplate?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/montasim/node-express-boilerplate?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub repo file count" src="https://img.shields.io/github/directory-file-count/montasim/node-express-boilerplate?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/montasim/node-express-boilerplate?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub license" src="https://img.shields.io/github/license/montasim/node-express-boilerplate?labelColor=EB008B&color=00B8B5">
</div>
<!-- repository summary badges end -->

<br/>

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

[//]: # 'CONTENTS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=120&height=40&lines=CONTENTS:" alt="CONTENTS:" />

1. [FEATURES](#1-features)
2. [PREREQUISITES](#2-prerequisites)
3. [SETUP](#3-setup)
4. [RUNNING THE SCRIPT](#4-running-the-script)
5. [ERROR HANDLING](#5-error-handling)
6. [HOSTING](#6-hosting)
7. [USED PACKAGES](#7-used-packages)
8. [TOOLS](#8-tools)
9. [ARTICLES](#9-articles)
10. [DO NOT FORGET TO DO](#10-do-not-forget-to-do)
11. [TUTORIALS](#11-tutorials)
12. [INSPIRATIONS](#12-inspirations)
13. [CONTRIBUTE](#13-contribute)
14. [CONTRIBUTORS](#14-contributors)
15. [SPECIAL THANKS](#15-special-thanks)
16. [LICENSE](#16-license)
17. [CONTACT](#17-contact)

<br/>

[//]: # '1. FEATURES'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=120&height=40&lines=1.+FEATURES" alt="1. FEATURES" id="1-features" />

1. Authentication:

    - Handles user login, logout, password resets, and email verification processes.
    - Ensures secure access through bearer token authentication.

2. User Profile Management:

    - Facilitates fetching and updating user profile information based on username. Respects privacy settings and only returns allowed information.

3. Permission and Role Management:

    - Manages permissions and roles within the system, allowing for the creation of new roles, modification of existing ones, and deletion of roles based on IDs.

4. Error and Request Handling:

    - Includes comprehensive handling of unsupported methods and detailed error responses to ensure robustness and reliability of the API.

### APIs

1. User
    - Auth
        - Signup: `POST /api/{{VERSION}}/auth/signup`
        - Verify signup using email: `GET /api/{{VERSION}}/auth/verify/verification-token`
        - Login: `POST /api/{{VERSION}}/auth/login`
        - Request password reset email: `PUT /api/{{VERSION}}/auth/request-new-password`
        - Resend password reset email: `PUT /api/{{VERSION}}/auth/resend-verification/verification-token`
        - Reset password: `PUT /api/{{VERSION}}/auth/reset-password/verification-token`
        - Logout: `GET /api/{{VERSION}}/auth/logout`
    - Profile
        - Update personal information:
        - Reset password:
        - Delete account:
2. Admin
    - Admin
        - Create admin: `POST /api/{{VERSION}}/admin`
        - Verify admin request using email: `GET /api/{{VERSION}}/admin/verify/verification-token`
        - Admin Login: `/api/{{VERSION}}/admin/login`
        - Request password reset email: `PUT /api/{{VERSION}}/admin/request-new-password`
        - Resend password reset email: `GET /api/{{VERSION}}/admin/resend-verification/token-id`
        - Reset password: `PUT /api/{{VERSION}}/admin/reset-password/verification-token`
        - Logout: `GET /api/{{VERSION}}/admin/logout`
    - Permission
        - Create permission: `POST /api/{{VERSION}}/permissions`
        - Create default permission: `POST /api/{{VERSION}}/permissions/default`
        - Get all permissions: `GET /api/{{VERSION}}/permissions`
        - Get permission by ID: `GET /api/{{VERSION}}/permissions/permission-id`
        - Update permission by ID: `PUT /api/{{VERSION}}/permissions/permission-id`
        - Delete permission by ID: `DELETE /api/{{VERSION}}/permissions/permission-id`
        - Delete permission by list: `DELETE /api/{{VERSION}}/permissions?ids=permission-id1,permission-id2`
    - Role
        - Create role: `POST /api/{{VERSION}}/roles`
        - Create default role: `POST /api/{{VERSION}}/roles/default`
        - Get all roles: `GET /api/{{VERSION}}/roles`
        - Get role by ID: `GET /api/{{VERSION}}/roles/role-id`
        - Update role by ID: `PUT /api/{{VERSION}}/roles/role-id`
        - Delete role by ID: `DELETE /api/{{VERSION}}/roles/role-id`
        - Delete role by list: `DELETE /api/{{VERSION}}/roles?ids=role-id1,role-id2`
3. Public
    - Detect
        - User device detection

<br/>

[//]: # 'PREREQUISITES'
[//]: # '2. PREREQUISITES'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=168&height=40&lines=2.+PREREQUISITES" alt="2. PREREQUISITES" id="2-prerequisites" />

1. Node.js (v20.x or higher)
2. Yarn (v1.22.x or higher)

Ensure you have `Node.js` and `Yarn` installed by running `node -v` and `yarn -v` in your terminal. These commands will display the current version of each installed on your system. If these are not installed, follow the installation instructions on the [Node.js website](https://nodejs.org/) and the [Yarn website](https://classic.yarnpkg.com/en/).

<br/>

[//]: # '3. SETUP'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=80&height=40&lines=3.+SETUP" alt="3. SETUP" id="3-setup" />

1. **Clone the repository and navigate to the directory:**

    ```bash
    git clone https://github.com/montasim/node-express-boilerplate.git
    cd node-express-boilerplate
    ```

2. **Install the dependencies:**

    ```bash
    yarn install
    ```

3. **Configuring the Environment:**

    Create a `.env.development` or `.env.staging` or `.env.production` file in the root directory of the project and populate it with the necessary environment variables. See the [.env.example](.env.example) file for an example.

<br/>

[//]: # '4. RUNNING THE SCRIPT'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=230&height=40&lines=4.+RUNNING+THE+SCRIPT" alt="4. RUNNING THE SCRIPT" id="4-running-the-script" />

1. **Running the Application:**

    To start the application in development mode, use:

    ```bash
    yarn dev
    ```

    This will run the server with nodemon, automatically restarting when any changes are made.

2. **To build and run the application in production mode, use:**

    ```bash
    yarn start
    ```

    This will build the application and start the server using the built files.

    This script first builds the project by linting the code, fixing lint issues, running prettier, and then starts the application with pm2.

3. **Testing:**

    To run the tests configured with Jest, use:

    ```bash
    yarn test
    ```

    This will build the project and then run all the Jest tests.

4. **Linting and Code Formatting:**

    - To check for linting errors:

        ```bash
        yarn lint:check
        ```

    - To fix linting errors:

        ```bash
        yarn lint:fix
        ```

    - To check if files are formatted correctly:

        ```bash
        yarn prettier:check
        ```

    - To format files:

        ```bash
        yarn prettier:fix
        ```

5. **Generating Documentation:**

    To generate code documentation with JSDoc, run:

    ```bash
    yarn generate-docs
    ```

    This will create documentation based on your JSDoc comments.

6. **Release Management:**

    To create a new release, you can use:

    ```bash
    yarn release
    ```

    This will automatically bump the version, update the CHANGELOG, and create a commit and a tag.

    For minor or major releases:

    ```bash
    yarn release:minor
    yarn release:major
    ```

7. **Cleanup:**

    To clean up dependencies and rebuild the project:

    ```bash
    yarn clean
    ```

    This command initializes the auto cleanup process and then forces a rebuild.
    <br/>

### Docker

1. **Build the Docker Compose Services:**

    ```bash
    yarn docker:build-dev
    ```

2. **Run the Docker Compose Services:**

    ```bash
    yarn docker:run-dev
    ```

3. **Stop the Containers:**

    ```bash
    yarn docker:stop-dev
    ```

4. **Rebuild the Containers:**

    ```bash
    yarn docker:rebuild-dev
    ```

[//]: # '5. ERROR HANDLING'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=195&height=40&lines=5.+ERROR+HANDLING" alt="5. ERROR HANDLING" id="5-error-handling" />

<br/>

[//]: # '6. HOSTING'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=112&height=40&lines=6.+HOSTING" alt="6. HOSTING" id="6-hosting" />

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/montasim/node-express-boilerplate)

<details>
    <summary>
        Step-by-step guide on setting up your own Vercel instance:
    </summary>

Vercel is the recommended option for hosting the files since it is free and easy to set up.

1.  Go to [vercel.com](https://vercel.com/).
2.  Click on `Log in`.
    ![Login page](https://files.catbox.moe/qwqrjn.png)
3.  Sign in with GitHub by pressing `Continue with GitHub`.
    ![Sign in with GitHub](https://files.catbox.moe/18vwjq.png)
4.  Sign in to GitHub and allow access to all repositories if prompted.
5.  [Fork this repo.](https://github.com/montasim/node-express-boilerplate/fork)
6.  Go back to your [Vercel dashboard](https://vercel.com/dashboard).
7.  To import a project, click the `Add New...` button and select the `Project` option.
    ![Add new project](https://files.catbox.moe/h1a87z.png)
8.  Click the `Continue with GitHub` button, search for the required Git Repository and import it by clicking the `Import` button. Alternatively, you can import a Third-Party Git Repository using the `Import Third-Party Git Repository ->` link at the bottom of the page.
    ![Select GitHub project](https://files.catbox.moe/9ubkss.png)
9.  Create a personal access token (PAT) [here](https://github.com/settings/tokens/new) and enable the `repo` and `user` permissions (this allows access to see private repo and user stats).
10. Copy all the .env.development file as environment variables in the Vercel dashboard.
11. Click deploy, and you're good to go. See your domains to use the API!
</details>

<br/>

[//]: # '7. USED PACKAGES'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=185&height=40&lines=7.+USED+PACKAGES" alt="7. USED PACKAGES" id="7-used-packages" />

<details>
    <summary>
        List of used packages:
    </summary>

1. `Node.js (v20.x or higher)`: The runtime environment for executing JavaScript on the server side.
2. `Express.js (v4.19.x or higher)`: The web application framework for creating server-side logic.
3. `MongoDB (v6.8.x or higher)`: The NoSQL database for storing and retrieving data.
4. `@googleapis/drive (v8.11.0)`: A library for interacting with Google Drive API.
5. `bcrypt (v5.1.1)`: A library to help you hash passwords.
6. `compression (v1.7.4)`: Middleware to compress response bodies for all requests.
7. `cors (v2.8.5)`: Middleware to enable Cross-Origin Resource Sharing.
8. `dompurify (v3.1.5)`: A library to sanitize HTML to prevent XSS attacks.
9. `dotenv (v16.4.5)`: A module to load environment variables from a .env file.
10. `express-useragent (v1.0.15)`: A user agent middleware for Express.
11. `glob (v10.4.2)`: A library to match files using the patterns the shell uses.
12. `helmet (v7.1.0)`: Middleware to secure Express apps by setting various HTTP headers.
13. `hpp (v0.2.3)`: Middleware to protect against HTTP Parameter Pollution attacks.
14. `jest (v29.7.0)`: A testing framework for JavaScript.
15. `joi (v17.13.3)`: A library for data validation.
16. `jsdom (v24.1.0)`: A library to simulate a web browser environment in Node.js.
17. `jsonwebtoken (v9.0.2)`: A library to sign, verify, and decode JSON Web Tokens.
18. `moment (v2.30.1)`: A library for parsing, validating, manipulating, and formatting dates.
19. `mongodb (v6.8.0)`: MongoDB driver for Node.js.
20. `mongoose (v8.4.4)`: An ODM (Object Data Modeling) library for MongoDB and Node.js.
21. `morgan (v1.10.0)`: HTTP request logger middleware for Node.js.
22. `multer (v1.4.5-lts.1)`: Middleware for handling multipart/form-data, used for file uploads.
23. `node-cache (v5.1.2)`: A caching library for Node.js.
24. `nodemailer (v6.9.14)`: A module for sending emails.
25. `pm2 (v5.4.1)`: A production process manager for Node.js applications.
26. `request-ip (v3.3.0)`: A library to retrieve a request's IP address.
27. `supertest (v7.0.0)`: A library for testing HTTP assertions.
28. `terser (v5.31.1)`: A JavaScript parser, mangler, and compressor toolkit for ES6+.
29. `uuid (v10.0.0)`: A library to generate RFC4122 UUIDs.
30. `winston (v3.13.0)`: A logging library for Node.js.
31. `winston-daily-rotate-file (v5.0.0)`: Transport for winston to log to daily rotated files.
32. `winston-mongodb (v5.1.1)`: Transport for winston to log to a MongoDB collection.

### Development Dependencies

1. `@babel/core (v7.24.7)`: The core of Babel, a JavaScript compiler.
2. `@babel/preset-env (v7.24.7)`: A Babel preset to compile ES6+ down to ES5.
3. `eslint (v9.5.0)`: A tool for identifying and reporting on patterns in JavaScript.
4. `jsdoc (v4.0.3)`: A tool for generating documentation from JavaScript source code.
5. `nodemon (v3.1.4)`: A utility that will monitor for any changes in your source and automatically restart your server.
6. `prettier (v3.3.2)`: An opinionated code formatter.
7. `standard-version (v9.5.0)`: A utility for versioning and changelog management.
8. </details>

<br/>

[//]: # '8. TOOLS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=85&height=40&lines=8.+TOOLS" alt="8. TOOLS" id="8-tools" />

1. [WebStorm](https://www.jetbrains.com/webstorm/)
2. [Postman](https://www.postman.com/)
3. [Swagify.io](https://swagify.io/convert/)

<br/>

[//]: # '9. ARTICLES'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=115&height=40&lines=9.+ARTICLES" alt="9. ARTICLES" id="9-articles" />

1. [StackOverflow answer on file upload to Google Drive](https://stackoverflow.com/questions/65181932/how-i-can-upload-file-to-google-drive-with-google-drive-api).

<br/>

[//]: # '10. DO NOT FORGET TO DO'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=255&height=40&lines=10.+DO+NOT+FORGET+TO+DO" alt="10. DO NOT FORGET TO DO" id="10-do-not-forget-to-do" />

<br/>

[//]: # '11. TUTORIALS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=135&height=40&lines=11.+TUTORIALS" alt="11. TUTORIALS" id="11-tutorials" />

1. [Google Drive file upload tutorial](https://www.youtube.com/watch?v=bkaQTLCBBeo&t=600s).

<br/>

[//]: # '12. INSPIRATIONS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=170&height=40&lines=12.+INSPIRATIONS" alt="12. INSPIRATIONS" id="12-inspirations" />

<br/>

[//]: # '13. CONTRIBUTE'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=155&height=40&lines=13.+CONTRIBUTE" alt="13. CONTRIBUTE" id="13-contribute" />

Contributions are always welcome!
Please read the [contribution guidelines](CONTRIBUTION.md) and [contributor license agreement](CLA.md).

<br/>

[//]: # '14. CONTRIBUTORS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=185&height=40&lines=14.+CONTRIBUTORS" alt="14. CONTRIBUTORS" id="14-contributors" />

<img loading="lazy" src="https://badges.pufler.dev/contributors/montasim/node-express-boilerplate?size=50&padding=5&perRow=10&bots=true" alt="contributors" />

<br/>

[//]: # '15. SPECIAL THANKS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=195&height=40&lines=15.+SPECIAL+THANKS" alt="15. SPECIAL THANKS" id="15-special-thanks" />

<br/>

[//]: # '16. LICENSE'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=108&height=40&lines=16.+LICENSE" alt="16. LICENSE" id="16-license" />

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

<br/>

[//]: # '17. CONTACT'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=130&height=40&lines=17.+CONTACT" alt="17. CONTACT" id="17-contact" />

<!-- social media links start -->
<table align="center">
    <thead align="center">
        <tr>
            <th>
                <a href="https://www.linkedin.com/in/montasim" target="_blank" rel="noopener noreferrer" title="linkedin.com/in/montasim">
                    <img loading="lazy" alt="linkedin icon" src="https://cdn.simpleicons.org/linkedin/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://www.github.com/montasim" target="_blank" rel="noopener noreferrer" title="github.com/montasim">
                    <img loading="lazy" alt="github icon" src="https://cdn.simpleicons.org/github/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://stackoverflow.com/users/20348607/montasim" target="_blank" rel="noopener noreferrer" title="stackoverflow.com/users/20348607/montasim">
                    <img loading="lazy" alt="github icon" src="https://cdn.simpleicons.org/stackoverflow/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://montasim-dev.web.app/" target="_blank" rel="noopener noreferrer" title="montasim-dev.web.app">
                    <img loading="lazy" alt="web icon" src="https://cdn.simpleicons.org/googlechrome/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="mailto:montasimmamun@gmail.com" target="_blank" rel="noopener noreferrer" title="montasimmamun@gmail.com">
                    <img loading="lazy" alt="gmail icon" src="https://cdn.simpleicons.org/gmail/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://www.facebook.com/montasimmamun/" target="_blank" rel="noopener noreferrer" title="facebook.com/montasimmamun">
                    <img loading="lazy" alt="facebook icon" src="https://cdn.simpleicons.org/facebook/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://x.com/montasimmamun" target="_blank" rel="noopener noreferrer" title="https://x.com/montasimmamun">
                    <img loading="lazy" alt="x icon" src="https://cdn.simpleicons.org/x/EB008B" width="35px">
                </a>
            </th>
        </tr>
    </thead>
</table>
<!-- social media links end -->

<br/>
<br/>
<br/>
