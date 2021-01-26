const dotenv = require('dotenv');
const twiloConfig = require('twilio');

dotenv.config();

const twilioClient = twiloConfig(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = {
  friendlyName: 'sms notification',

  description: '',

  inputs: {
    body: {
      type: 'ref',
      friendlyName: 'Body of the sms',
      required: true,
    },
    to: {
      type: 'ref',
      friendlyName: 'User phone number',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ body, to }) {
    return new Promise((resolve) => {
      twilioClient.messages
        .create({
          body,
          from: '+14043414510',
          to,
        })
        .then((message) => resolve(message.sid))
        .catch((err) => sails.log(err));
    });
  },
};
