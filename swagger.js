import swaggerJsdoc from 'swagger-jsdoc';
import configuration from './src/configuration/configuration.js';
import fs from 'fs'; // Import the fs module to write to a file

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Node Express Boilerplate',
        version: '1.0.0',
        description:
            'A boilerplate for building RESTful APIs using Node.js, Express, and MongoDB.',
    },
    servers: [
        {
            url: `http://localhost:${configuration.port}/api/${configuration.version}`,
            description: 'Development server',
            variables: {
                version: {
                    default: configuration.version,
                },
            },
        },
        {
            url: `http://stg.example.com/api/${configuration.version}`,
            description: 'Staging server',
            variables: {
                version: {
                    default: configuration.version,
                },
            },
        },
        {
            url: `http://production.example.com/api/${configuration.version}`,
            description: 'Production server',
            variables: {
                version: {
                    default: configuration.version,
                },
            },
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/**/*.routes.js', './src/**/routes.js'], // paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(options);

// Write the Swagger specification to a JSON file
fs.writeFileSync(
    './src/modules/api/documentation/api/swagger.json',
    JSON.stringify(swaggerSpec, null, 2),
    'utf8'
);

export default swaggerSpec;
