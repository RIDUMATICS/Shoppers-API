/**
 * Shipping.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    address: {
      type: 'string',
      required: true
    },
    city: {
      type: 'string',
      required: true
    },
    postalCode: {
      type: 'string',
      required: true,
    },
    state: {
      type: 'string',
      required: true
    }
  },

};

