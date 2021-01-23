const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  friendlyName: 'Send mail',

  description: 'send user mail with sendGrid',

  inputs: {
    to: {
      type: 'ref',
      friendlyName: 'User email',
      required: true,
    },
    subject: {
      type: 'ref',
      friendlyName: 'Subject of the mail',
      required: true,
    },
    message: {
      type: 'ref',
      friendlyName: 'Message to send',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ to, subject, message }) {
    return new Promise((resolve, reject) => {
      const msg = {
        to,
        from: {
          email: 'Customer-service@shoppers.com',
          name: 'Shoppers Customer Service',
        },
        subject,
        html: message,
      };

      sgMail
        .send(msg)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  },
};
