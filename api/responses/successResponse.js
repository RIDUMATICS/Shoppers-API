module.exports = function successResponse(status, result) {
  // Get access to `req` and `res`
  // eslint-disable-next-line no-unused-vars
  const req = this.req;
  const res = this.res;

  // If no data was provided, use res.sendStatus().
  if (result === undefined) {
    return res.sendStatus(status);
  } else {
    return res.status(status).send({
      status,
      result,
    });
  }
};
