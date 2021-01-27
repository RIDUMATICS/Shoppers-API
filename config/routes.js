/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'get /': {
    skipAssets: true,
    fn: function(req, res) {
      return res.json({
        name: 'Shoppers',
        description: 'This project is an implementation of an on-line store in Postgres and Sails.js which is similar to the existing online shopping websites like Amazon and ebay.',
        version: 1,
        UI: 'https://shoppers-ui.netlify.app/',
        API: 'https://github.com/RIDUMATICS/Shoppers-API',
        developer: 'Ridwan Onikoyi',
      });
    }
  },

  'post /auth/signup': 'UserController.register',
  'post /auth/login': 'UserController.login',
  'get /auth/createadmin': 'UserController.createAdmin',

  'get /products': 'ProductController.getProducts',
  'get /products/:productId': 'ProductController.getProductById',
  'post /products': 'ProductController.addProduct',
  'post /products/:productId/reviews': 'ProductController.addProductReview',
  'patch /products/:productId': 'ProductController.updateProduct',
  'delete /products/:productId': 'ProductController.deleteProduct',

  'post /orders': 'OrderController.addOrder',
  'get /orders': 'OrderController.getOrders',
  'get /orders/:orderId': 'OrderController.getOrderById',
  'patch /orders/:orderId/deliver': 'OrderController.deliverOrder',
  'patch /orders/:orderId/pay': 'OrderController.payOrder',
  'delete /orders/:orderId': 'OrderController.deleteOrder',
};
