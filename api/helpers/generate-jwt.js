const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = {
  friendlyName: 'Generate jwt',

  description: 'Verify a JWT token.',

  inputs: {
    email: {
      type: 'ref',
      friendlyName: 'user email',
      description: 'A reference to the user email address.',
      required: true
    }
  },


  exits: {
  },


  fn: async function ({ email }, exits) {
    const token = jwt.sign({ email: email.toLowerCase() }, process.env.TOKEN_SECRET, { expiresIn: '1day' });
    console.log('new token');
    exits.success(token);
  }


};

