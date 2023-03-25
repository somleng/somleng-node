# somleng-node

[![NPM](https://nodei.co/npm/somleng.png?downloads=true&stars=true)](https://nodei.co/npm/somleng/)

[![Build](https://github.com/somleng/somleng-node/actions/workflows/build.yml/badge.svg)](https://github.com/somleng/somleng-node/actions/workflows/build.yml)

Node.js helper library for [Somleng](https://www.somleng.org/).

Note: This library wraps [Twilio Node](https://github.com/twilio/twilio-node) and adds support for Somleng.

## Installation

`npm install somleng` or `yarn add somleng`

## Sample Usage

Check out these [code examples](examples) in JavaScript and TypeScript to get up and running quickly.

### Environment Variables

`somleng-node` supports credential storage in environment variables. If no credentials are provided when instantiating the Somleng client (e.g., `const client = require('somleng')();`), the values in following env vars will be used: `SOMLENG_ACCOUNT_SID` and `SOMLENG_AUTH_TOKEN`. You can also set `SOMLENG_API_BASE_URL` to override the API endpoint.
