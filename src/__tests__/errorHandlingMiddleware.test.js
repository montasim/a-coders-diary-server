'use strict';

import request from 'supertest';
import express from 'express';

import httpStatus from '../constant/httpStatus.constants.js';
import errorHandlingService from '../service/errorHandling.service.js';

const app = express();

// Middleware to deliberately throw an error
app.get('/error', (req, res, next) => {
    const error = new Error('Deliberate Error');
    error.status = httpStatus.BAD_REQUEST;
    error.isOperational = true;
    next(error);
});

// Simulate a route not found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = httpStatus.NOT_FOUND;
    next(error);
});

app.use(errorHandlingService);

describe('Error Handling Middleware', () => {
    test('handles operational errors by sending proper status and message', async () => {
        const response = await request(app).get('/error');
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
        expect(response.body.message).toEqual('Deliberate Error');
        expect(response.body.success).toBeFalsy();
    });

    test('handles not found error', async () => {
        const response = await request(app).get('/nonexistent');
        expect(response.status).toBe(httpStatus.NOT_FOUND);
        expect(response.body.message).toContain('Not Found');
        expect(response.body.success).toBeFalsy();
    });
});
