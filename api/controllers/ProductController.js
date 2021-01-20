/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  getProducts: async (req, res) => {
    try {
      //pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      //filter
      let productFor = req.query.productFor || '';
      const category = req.query.category || undefined;

      if (productFor) productFor = productFor.replace(productFor[0], productFor[0].toUpperCase()); // convert first letter to capital letter
      const products = await Product.find({ where: { productFor: { contains: productFor }, category } }).skip(skip).limit(limit);
      const productsCount = await Product.count({ where: { productFor: { contains: productFor }, category } });
      const totalPages = parseInt(Math.ceil(parseFloat(productsCount / limit)));
      res.successResponse(200, { products, totalPages });
    } catch (error) {
      sails.log(error);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

  addProductReview: async (req, res) => {
    try {
      const { productId } = req.params;
      const { comment, rating } = req.body;
      const review = await Review.findOne({ user: req.user.id, product: productId });
      if(review){
        return res.errorResponse(409, 'You already submitted a review');
      }

      await Review.create({
        product: productId,
        user: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        comment,
        rating: parseFloat(rating)
      }).fetch();

      const product = await Product.findOne({ id: productId }).populate('reviews');
      res.successResponse(201, { product });
    } catch (error) {
      sails.log(error);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

  getProductById: async (req, res) => {
    try {
      const id = req.param('productId');
      const product = await Product.findOne({ id }).populate('reviews');

      if(!product) {
        res.errorResponse(404, `The database does not contain a product with id=${id}`);
      }
      res.successResponse(200, { product });
    } catch (error) {
      sails.log(error);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

  addProduct: async (req, res) => {
    sails.log(req.body);
    try {
      console.log(req.body);

      const files = await new Promise((resolve, reject) => {
        req.file('productImage').upload({
          maxBytes: 10000000,
        }, (err, uploadedFiles) => {
          if (uploadedFiles.length === 0) {
            reject('No file was uploaded');
          }
          else if(err) {
            reject(err);
          }
          resolve(uploadedFiles);
        });
      });

      const image = await sails.helpers.uploadToCloudinary(files);

      let { productFor} = req.body;
      const {
        name,
        brand,
        category,
        description,
        price,
        discount,
        countInStock,
      } = req.body;
      if (productFor)
        productFor = productFor
        .split(',')
        .map( p => p.replace(p[0], p[0].toUpperCase())); // convert each first letter to capital letter

      console.log(productFor);

      const createdProduct = await Product.create({
        name, image, brand, category, productFor, description, price, discount, countInStock
      }).fetch();

      res.successResponse(201, { product: createdProduct });

    } catch (error) {
      sails.log(error);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.param('productId');
      const {
        name,
        brand,
        category,
        description,
        price,
        discount,
        countInStock,
      } = req.body;

      const updatedProduct = await Product.updateOne({ id }).set({
        name, brand, category, description, price, discount, countInStock
      });

      if(updatedProduct) {
        res.successResponse(200, { product: updatedProduct });
      }
      res.errorResponse(404, `The database does not contain a product with id=${id}`);
    } catch (error) {
      sails.log(error);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.param('productId');
      const burnedProduct = await Product.destroyOne({ id });
      if( burnedProduct ) {
        res.successResponse(204);
      }
      else {
        res.errorResponse(404, `The database does not contain a product with id=${id}`);
      }
    } catch (error) {
      sails.log(error);
      res.errorResponse(500, 'database is busy at the moment call back later');
    }
  },

};

