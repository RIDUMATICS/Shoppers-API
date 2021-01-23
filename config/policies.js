/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,

  ProductController: {
    getProducts: true,
    getProductById: true,
    addProduct: ['isAuthenticated', 'isAdmin'],
    updateProduct: ['isAuthenticated', 'isAdmin'],
    addProductReview: ['isAuthenticated'],
    deleteProduct: ['isAuthenticated', 'isAdmin'],
  },

  OrderController: {
    addOrder: ['isAuthenticated'],
    getOrders: ['isAuthenticated'],
    getOrderById: ['isAuthenticated'],
    payOrder: ['isAuthenticated'],
    deliverOrder: ['isAuthenticated', 'isAdmin'],
    deleteOrder: ['isAuthenticated'],
  },
};
