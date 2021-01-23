const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify JWT',
  description: 'Verify a JWT token.',

  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true,
    },
    res: {
      type: 'ref',
      friendlyName: 'Response',
      description: 'A reference to the response object (res).',
      required: false,
    },
  },

  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.',
    },
  },

  fn: async function (inputs, exits) {
    const req = inputs.req;
    if (req.header('authorization')) {
      // if one exists, attempt to get the header data
      const token = req.header('authorization').split('Bearer ')[1];
      // if there's nothing after "Bearer", no go
      if (!token) {
        return exits.invalid();
      }

      return jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        async (err, payload) => {
          if (err || !payload.email) {
            return exits.invalid();
          }

          const user = await User.findOne({ email: payload.email });
          if (!user) {
            return exits.invalid();
          }

          // if it got this far, everything checks out, success
          req.user = user;
          return exits.success(user);
        }
      );
    }

    return exits.invalid();
  },
};
