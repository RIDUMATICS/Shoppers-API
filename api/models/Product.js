/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { v4: uuidv4 } = require('uuid');

module.exports = {
  attributes: {
    productId: {
      type: 'string',
      defaultsTo: uuidv4()
    },
    name: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
      required: true,
    },
    brand: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      isIn: ['clothing', 'bags', 'shoes', 'accessories'],
      required: true,
    },
    productFor: {
      type: 'json',
    },
    description: {
      type: 'string',
      required: true,
    },
    price: {
      type: 'number',
      required: true,
    },
    discount: {
      type: 'number',
      defaultsTo: 0,
    },
    countInStock: {
      type: 'number',
      required: true,
    },
    rating: {
      type: 'number',
      defaultsTo: 0.0,
    },
    numReviews: {
      type: 'number',
      defaultsTo: 0,
    },
    reviews: {
      collection: 'review',
      via: 'product',
    },
  },

  updateCountInStock: async function ({ id, qty }) {
    const product = await Product.findOne({ id });

    if (!product) {
      throw require('flaverr')({
        message: `Cannot find product with the id=${opts.id}.`,
        code: 'E_UNKNOWN_PRODUCT',
      });
    }

    const newCountInStock = product.countInStock - qty;
    if (newCountInStock < 0) {
      throw require('flaverr')({
        message: `Count in stock is not enough.`,
        code: 'E_INVALID_COUNT_IN_STOCK',
      });
    }
    await Product.updateOne({ id }).set({ countInStock: newCountInStock });
  },
};
