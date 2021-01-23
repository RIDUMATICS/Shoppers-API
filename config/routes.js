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
