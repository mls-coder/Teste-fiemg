const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = '6cd0c230-07e7-11ee-be56-0242ac120002';

const authenticate = (token) => {
    try {
      const validateToken = jwt.verify(token, secret);
      return validateToken;
    } catch (error) {
      return false;
    }
  };

  module.exports = authenticate;