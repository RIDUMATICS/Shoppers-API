/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false,
    },
    orders: {
      collection: 'order',
      via: 'owner',
    },
  },

  beforeCreate: async (valuesToCreate, proceed) => {
    const hashedPassword = await sails.helpers.hashPassword(
      valuesToCreate.password
    );
    valuesToCreate.email = valuesToCreate.email.toLowerCase();
    valuesToCreate.password = hashedPassword;
    return proceed();
  },

  customToJSON: function () {
    // Return a user data of this record with the password removed.
    return _.omit(this, ['password']);
  },
};
