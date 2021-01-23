module.exports = function errorResponse(status, message) {
  // Get access to `req` and `res`
  // eslint-disable-next-line no-unused-vars
  const req = this.req;
  const res = this.res;

  // If no message was provided, use res.sendStatus().
  if (message === undefined) {
    sails.log.info('Ran custom response: res.errorResponse()');
    return res.sendStatus(status);
  } else {
    sails.log.info(
      'Custom response `res.errorResponse()` called with an Error:',
      message
    );
    return res.status(status).send({
      status,
      error: message,
    });
  }
};
