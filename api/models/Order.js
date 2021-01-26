/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const short = require('short-uuid');

module.exports = {
  attributes: {
    owner: {
      model: 'user',
    },
    shipping: {
      model: 'shipping',
    },
    orderItems: {
      collection: 'orderitem',
      via: 'orderId',
    },
    orderRef: {
      type: 'string',
      defaultsTo: short.generate(),
    },
    itemsPrice: {
      type: 'number',
      // columnType: 'Number',
    },
    shippingPrice: {
      type: 'number',
      // columnType: 'Number',
    },
    totalPrice: {
      type: 'number',
      // columnType: 'Number',
    },
    isPaid: {
      type: 'boolean',
      defaultsTo: false,
    },
    paidAt: {
      type: 'string',
      // columnType: 'date',
    },
    isDelivered: {
      type: 'boolean',
      defaultsTo: false,
    },
    deliveredAt: {
      type: 'string',
      // columnType: 'date',
    },
  },

  updateOrder: async function ({ id, data }) {
    order = await Order.findOne({ id })
      .populate('owner')
      .populate('shipping')
      .populate('orderItems');

    if (order) {
      const updatedOrder = await Order.updateOne({ id }).set(data);
      const orderItems = await OrderItem.find({ orderId: order.id }).populate(
        'product'
      );
      updatedOrder.orderItems = orderItems;
      updatedOrder.owner = order.owner;
      updatedOrder.shipping = order.shipping;
      return updatedOrder;
    } else {
      return null;
    }
  },
};
