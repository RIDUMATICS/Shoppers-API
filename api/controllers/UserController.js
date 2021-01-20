/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcryptjs');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email.toLowerCase() }).populate('orders');
      if(!user) {
        return res.errorResponse(400, 'Please check your email or password');
      }

      const isValidPassword = await bcrypt.compare(password, user.password); // user.password is the hashedPassword

      if(!isValidPassword) {
        return res.errorResponse(400, 'Please check your email or password');
      }

      const token = await sails.helpers.generateJwt(email);
      return res.successResponse(200, { token, user });

    } catch (error) {
      sails.log(error);
      res.status(500).send({ error: 'Server is sleeping'});
    }
  },

  register: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
      } = req.body;

      const user = await User.find({email});

      if(user.length) {
        return res.status(409).send({error: 'user already exists'});
      }

      const createdUser = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      }).fetch();

      const token = await sails.helpers.generateJwt(createdUser.email);
      return res.successResponse(201, { token, user : createdUser });
    } catch (err) {
      sails.log(err);
      res.status(500).send({ error: 'Database error'});
    }
  },

  createAdmin: async (req, res) => {
    try {
      const createdAdmin = await User.create({
        firstName: 'Admin',
        lastName: ' ',
        email: 'admin@shoppers.com',
        phoneNumber: '+2348122689423',
        password: 'admin_SHOPPERS',
        isAdmin: true
      }).fetch();

      const token = await sails.helpers.generateJwt(createdAdmin.email);
      return res.successResponse(201, { token, user: createdAdmin });
    } catch (error) {
      sails.log(error);
      res.status(500).send({ error: 'Database error'});
    }
  }
};
