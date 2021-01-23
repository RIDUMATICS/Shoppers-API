/**
 * OrderItem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    orderId: {
      model: 'order',
    },
    qty: {
      type: 'number',
      required: true,
    },
    price: {
      type: 'string',
      required: true,
    },
    product: {
      model: 'product',
    },
  },
};
