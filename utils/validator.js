const Joi = require('joi');

// Validation for User Registration
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

// Validation for User Login
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

// Validation for Customer Data
const customerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
        company: Joi.string().allow('', null),
    });

    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
    customerValidation,
};
