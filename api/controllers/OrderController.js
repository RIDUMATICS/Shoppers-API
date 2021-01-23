/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const mailTemplate = require('../mailTemplate');

module.exports = {
  addOrder: async (req, res) => {
    try {
      const {
        shipping,
        orderItems,
        itemsPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
      console.log(orderItems);
      const createdShipping = await Shipping.create(shipping).fetch();

      const order = await Order.create({
        owner: req.user.id,
        shipping: createdShipping.id,
        itemsPrice,
        shippingPrice,
        totalPrice
      }).fetch();

      const _orderItems = orderItems.map(orderItem => ({ ...orderItem, orderId: order.id}));

      await OrderItem.createEach(_orderItems).fetch();

      res.status(201).send({ order });
    } catch (error) {
      sails.log(error);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const id = req.param('orderId');
      const burnedOrder = await Order.destroyOne({ id });
      if( burnedOrder ) {
        res.successResponse(204);
      }
      else {
        res.errorResponse(404, `The database does not contain a order with id=${id}`);
      }
    } catch (error) {
      sails.log(error);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

  getOrders: async (req, res) => {
    try {
      let orders;
      if( req.user.isAdmin ) {
        // admin get all orders
        orders = await Order.find({}).populate('owner').populate('shipping').populate('orderItems');
      } else {
        //user only get his/her own order
        orders = await Order.find({ owner: req.user.id }).populate('owner').populate('shipping').populate('orderItems');
      }
      res.successResponse(200, { orders });
    } catch (error) {
      sails.log(error);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

  getOrderById: async (req, res) => {
    try {
      const {user, params: { orderId } } = req;
      let order;
      if(user.isAdmin){
        order = await Order.findOne({ id: orderId }).populate('owner').populate('shipping').populate('orderItems');
      } else {
        // only show order if user is owner
        order = await Order.findOne({ id: orderId, owner: user.id }).populate('owner').populate('shipping').populate('orderItems');
      }

      if(order){
        const orderItems = await OrderItem.find({ orderId: order.id }).populate('product');
        order.orderItems = orderItems;
        res.successResponse(200, { order });
      } else {
        res.errorResponse(404, 'order not found');
      }

    } catch (error) {
      console.log(error);
    }
  },

  payOrder: async (req, res) => {
    try {
      const {orderId} = req.params;
      const order = await Order.updateOrder({
        id: orderId,
        data: { isPaid: true, paidAt: new Date() } });

      if(order){
        order.orderItems.forEach( async ({product, qty }) => {
          await Product.updateCountInStock({ id: product.id, qty });
        });

        await sails.helpers.sendMail(
          req.user.email,
          `Your Shoppers Order ${order.id} has been confirmed`,
          mailTemplate.orderSubmited({ firstName: req.user.firstName, orderId: order.id}));
        res.successResponse(200, {order });
      } else {
        res.errorResponse(400, `The database does not contain an order with id=${orderId}`);
      }
    } catch(err) {
      sails.log(err);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

  deliverOrder: async (req, res) => {
    try {
      const {orderId} = req.params;
      const order = await Order.updateOrder({
        id: orderId,
        data: { isDelivered: true, deliveredAt: new Date() }
      });

      if(order){
        await sails.helpers.sendMail(
          req.user.email,
          `Your Shoppers Order ${order.id} has been delivered`,
          mailTemplate.orderDelivered({ firstName: req.user.firstName, orderId: order.id}));
        res.successResponse(200, {order });
      } else {
        res.errorResponse(400, `The database does not contain an order with id=${orderId}`);
      }
    } catch(err) {
      sails.log(err);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  }
};
