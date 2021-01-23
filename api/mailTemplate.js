class mailTemplate {
  static orderSubmitted({ firstName, orderId }) {
    return `<p style="text-transform: capitalize">Dear ${firstName.toLowerCase()},</p>
    <p>Thank you for shopping on Shoppers! Your order <strong>${orderId}</strong> has been successfully confirmed.</p>
    <p>It will be packaged and shipped as soon as possible. Once the item(s) is out for delivery or available for pick-up you will receive a notification from us.
    <br />Thank you for shopping on Shoppers.</p>
  `;
  }
  static orderDelivered({ firstName, orderId }) {
    return `<p style="text-transform: capitalize">Dear ${firstName.toLowerCase()}</p>
    <p>Thank you for shopping on Shoppers! Your order <strong>${orderId}</strong> has been successfully delivered.</p>
    <h2>Please note:</h2>
    <ul>
      <li>You can rate products</li>
      <li>In case you are not happy with your purchase, you may still be able to return it.</li>
    </ul>
    `;
  }
  static orderSubmittedSMS({ firstName, orderId }) {
    return `Dear ${firstName.toUpperCase()},
your order ${orderId} has been confirmed! Please check your email for the complete details.
-Shoppers`;
  }

  static orderDeliveredSMS({ firstName, orderId }) {
    return `Dear ${firstName.toUpperCase()},
your order ${orderId} has been delivered! Please check your email for the complete details.
-Shoppers`;
  }
}

module.exports = mailTemplate;
