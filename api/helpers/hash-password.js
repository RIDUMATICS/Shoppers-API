const bcrypt = require('bcryptjs');

module.exports = {
  friendlyName: 'Hash password',
  description: 'Hash user password before storing',


  inputs: {
    plainPassword: {
      type: 'ref',
      friendlyName: 'Plain Password',
      description: 'A reference to the user plain password.',
      required: true
    },
  },


  exits: {
  },


  fn: (inputs, exits) => {
    const plainPassword = inputs.plainPassword;

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(plainPassword, salt);

    return exits.success(hashPassword);
  }


};

