const Joi = require('joi');
const { failResponce, successResponce } = require('../Utilities/dbHelper');
const { verifyJwtToken } = require('../Utilities/helper');

async function validateUserRegistering(req, res, next) {
  const UseValidation = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required().label('Password'),
    confirmPassword: Joi.any()
      .required()
      .equal(Joi.ref('password'))
      .label('Confirm password')
      .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  });

  try {
    await UseValidation.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    // map
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponce(res, formatedError);
  }
}
async function validateUserLogging(req, res, next) {
  const UseValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await UseValidation.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      message: detail.message,
      field: detail.context.key,
    }));
    failResponce(res, formatedError);
  }
}

async function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return failResponce(res, 'no token', 401);
  const verifyResult = verifyJwtToken(tokenGotFromUser);

  if (verifyResult === false) return failResponce(res, 'invalid token', 403);
  req.user_Id = verifyResult.id;
  next();
}

module.exports = {
  validateUserLogging,
  validateUserRegistering,
  validateToken,
};
