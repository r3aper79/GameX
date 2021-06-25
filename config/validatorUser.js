const joi = require('joi')

const validatorUser = (req, res, next) => {
    const schema = joi.object({
        userName: joi.string().trim().min(2).max(40).required().pattern(new RegExp('^(?=.{2,40}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@-]+(?<![_.])$')).messages({
            "string.empty": "Your userName is a required field",
            "string.min": "Your userName must have at least 2 characters",
            "string.max": "Your userName could have max. 40 characters",
            "string.pattern.base": "Your userName must contain only letters, numbers and '_' or '.' in the middle",
        }),
        email: joi.string().required().trim().email({tlds:{allow:false}}).messages({
            "any.required": "Your Email is a required field",
            "string.email": "Your Email must be a valid mail",
        }),
        password: joi.string().min(6).trim().required().pattern(/(?=.*\d)(?=.*[A-z])/).messages({
            "string.empty": "Your Password  is a required field",
            "string.min": "Your Password  must have at least 6 characters",
            "string.pattern.base": "Your Password must have at least a letter and a number",
        }),
        avatar: joi.string().trim().messages({
            "string.empty": "Your avatar is a required field",
        }),
        country: joi.string().trim().required().messages({
            "string.empty": "Your country is a required field",
        }),
        imageUrl: joi.string().trim().messages({
            "string.empty": "Your country is a required field",
        }),
    })
    const validation = schema.validate(req.body, {abortEarly: true})
    if (validation.error) {
        return res.json({success: false, error: validation.error.details[0]})
    }
    next()
}

module.exports = validatorUser