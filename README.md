# somleng-node

[![NPM](https://nodei.co/npm/somleng.png?downloads=true&stars=true)](https://nodei.co/npm/somleng/)

[![Build](https://github.com/somleng/somleng-node/actions/workflows/build.yml/badge.svg)](https://github.com/somleng/somleng-node/actions/workflows/build.yml)

Node.js helper library for [Somleng's](https://www.somleng.org/) [REST API](https://www.somleng.org/docs/twilio_api).

Note: This library wraps [Twilio Node](https://github.com/twilio/twilio-node) and adds support for Somleng.

## Versioning

`somleng-node` follows [Twilio Node](https://github.com/twilio/twilio-node) versioning.

## Installation

`npm install somleng` or `yarn add somleng`

## Sample Usage

```js
// Client Initialization
const accountSid = process.env.SOMLENG_ACCOUNT_SID;
const authToken = process.env.SOMLENG_AUTH_TOKEN;
const client = require('somleng')(accountSid, authToken);

// Create a call
client.calls
  .create({
      twiml: '<Response><Say>Ahoy, World!</Say></Response>',
      to: '+14155551212',
      from: '+15017122661'
    })
  .then(call => console.log(call.sid));

  // List calls
client.calls.list({limit: 20})
            .then(calls => calls.forEach(c => console.log(c.sid)));
```

## Environment Variables

`somleng-node` supports credential storage in environment variables. If no credentials are provided when instantiating the Somleng client (e.g., `const client = require('somleng')();`), the values in following env vars will be used: `SOMLENG_ACCOUNT_SID` and `SOMLENG_AUTH_TOKEN`.

## License

The software is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
