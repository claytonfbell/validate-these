# validate-these

[![npm version](https://badge.fury.io/js/validate-these.svg)](https://badge.fury.io/js/validate-these) [![Build Status](https://travis-ci.org/claytonfbell/validate-these.svg?branch=master)](https://travis-ci.org/claytonfbell/validate-these)

Validate user input on your backend or frontend without having to compose tedious error messages.

- Chainable functions to perform multiple checks.
- An `ApiError` object is thrown with a helpful user message just using your camel-case vars converted to [sentence-case](https://www.npmjs.com/package/sentence-case).
- Hint: You can parse messages as markdown when displaying to users.

## Install

    npm i validate-these

## Usage

```Javascript
const validate = require("validate-these")

const emailAddress = "bad-email"
validate({ emailAddress }).email()
// **Email address** does not look valid.

const homePhoneNumber = "not-a-phone-number"
validate({ homePhoneNumber }).phone()
// Value for **Home phone number** does not look valid.

const firstName = "field is too long"
validate({ firstName }).notEmpty().max(12)
// Value for **First name** must be less than **12** characters.

const lastName = "a"
validate({ lastName }).min(2).max(32)
// Value for **Last name** must be at least **2** characters.

```

| function             | description                                                |
| -------------------- | ---------------------------------------------------------- |
| `notNull()`          | Invalid if value is `null` or `undefined`                  |
| `notEmpty()`         | Invalid if it is not a string with lengh greater than zero |
| `min(x)`             | Invalid if string length is less than `x`                  |
| `max(x)`             | Invalid if string length is greater than `x`               |
| `greaterThanZero()`  | Alias to `greaterThan(0)`                                  |
| `greaterThan(x)`     | Invalid if not greater than `x`                            |
| `email()`            | Invalid if not email address                               |
| `match(regex)`       | Invalid if does not pass your custom regular expression    |
| `phone(allowBlank)`  | Invalid if not a phone number                              |
| `numericString()`    | Invalid if not a string of integers                        |
| `boolean()`          | Invalid if not `true` or `false`                           |
| `strongPassword()`   | Invalid if password is weak                                |
| `oneOf(valuesArray)` | Invalid if it does not match one of the array values       |

## Thank you to these dependencies

- [owasp-password-strength-test](https://www.npmjs.com/package/owasp-password-strength-test)
- [sentence-case](https://www.npmjs.com/package/sentence-case)
- [validator](https://www.npmjs.com/package/validator)
