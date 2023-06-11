const { sign } = require('jsonwebtoken');

const secret = '6cd0c230-07e7-11ee-be56-0242ac120002';

const createToken = (payload) => {
  const token = sign(payload, secret, { expiresIn: '10d', algorithm: 'HS256' });
  return token;
};

module.exports = createToken;