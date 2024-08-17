'use strict';

/**
 * @fileoverview This module defines a controller for testing uncaught exceptions.
 * It is used to simulate an uncaught exception for testing purposes.
 */

/**
 * Simulates an uncaught exception.
 *
 * This function throws a simulated uncaught exception. It is used to test the application's ability to handle uncaught exceptions.
 *
 * @function
 * @name testUncaughtExceptionController
 * @throws {Error} - Always throws an error with the message 'Simulated uncaught exception'.
 */

const testUncaughtExceptionController = () => {
    throw new Error('Simulated uncaught exception');
};

export default testUncaughtExceptionController;
