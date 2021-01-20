/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authorization for admin
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = async function (req, res, next) {
  console.log('admin')
  // check if req.user object is not undefine and if req.user.isAdmin is not false
  if(!req.user || !req.user.isAdmin) {
    return res.sendStatus(401);
  }

  return next();
};
