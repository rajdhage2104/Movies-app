// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock axios for all tests
jest.mock('axios');

// Set up global fetch mock
global.fetch = jest.fn();

// Suppress React 18 console errors related to act() warnings during testing
const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
