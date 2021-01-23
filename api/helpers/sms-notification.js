const dotenv = require('dotenv');
const twiloConfig = require('twilio');

dotenv.config();

const twilioClient = twiloConfig(
  'AC344b544c9da44903b07a0cf198d7abdf',
  '673c88aa154e62a14196b849c334bf40'
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
