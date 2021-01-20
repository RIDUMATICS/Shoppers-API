/* eslint-disable camelcase */
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret
});

module.exports = {


  friendlyName: 'Upload to cloudinary',
  description: 'upload product image to cloudinary',

  inputs: {
    productImage: {
      type: 'ref',
      description: 'A reference to the product image files',
      required: true
    },
  },


  fn: function ({ productImage }) {
    const _productImage = productImage[0].fd;
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(_productImage, { folder: 'shoppers'}, (err, result) => {
        if(err) {
          reject(err);
        }
        if(result ) {
          resolve(result.secure_url);
        }
      });
    });
  }


};

