/**
 * Review.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    product: {
      model: 'product',
    },
    user: {
      model: 'user',
    },
    name: {
      type: 'string',
    },
    comment: {
      type: 'string',
      required: true,
    },
    rating: {
      type: 'number',
      required: true,
    },
  },

  afterCreate: async (review, cb) => {
    const reviews = await Review.find({ product: review.product });
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const rating = total / reviews.length;
    await Product.updateOne({ id: review.product }).set({
      rating,
      numReviews: reviews.length,
    });

    cb();
  },
};
