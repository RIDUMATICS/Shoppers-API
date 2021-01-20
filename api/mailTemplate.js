class mailTemplate {
  static orderSubmited({firstName, orderId}) {
    return `<p>Dear ${firstName.toLowerCase()}</p>
    <p>Thank you for shopping on Shoppers! Your order ${orderId} has been successfully confirmed.</p>
    <p>It will be packaged and shipped as soon as possible. Once the item(s) is out for delivery or available for pick-up you will receive a notification from us.
    <br />Thank you for shopping on Shoppers.</p>
  `;
  }
}

module.exports = mailTemplate;
