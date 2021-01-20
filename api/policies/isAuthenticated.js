/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user
 *                 Looks for an Authorization header bearing a valid JWT token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = async function (req, res, next) {
  await sails.helpers.verifyJwt.with({
    req: req,
    res: res
  }).switch({
    error: function (err) {
      return res.serverError(err);
    },
    invalid: function () {
      return res.sendStatus(401);
    },
    success: function () {
      // user has been attached to the req object (ie logged in) so we're set, they may proceed
      return next();
    }
  });
};
