import Joi from "joi";

const ticketTypeSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  price: Joi.number().required(),
});

const ticketTypeUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  price: Joi.number(),
});

export const validateTicketTypeData = function (req, res, next) {
  let { error, value } = ticketTypeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};

export const validateTicketTypeUpdateData = function (req, res, next) {
  let { error, value } = ticketTypeUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};
