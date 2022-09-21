import Joi from "joi";

const ticketSchema = Joi.object({
  issuer: Joi.string().min(2).max(50).required(),
  vendor: Joi.string().required(),
  status: Joi.string().valid("converted", "pending").required(),
  issuedDate: Joi.date().iso(),
  event: Joi.string().required(),
  ticketType: Joi.string().required(),
  user: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
});

const ticketUpdateSchema = Joi.object({
  status: Joi.string().valid("converted", "pending").required(),
});

export const validateTicketData = function (req, res, next) {
  let { error, value } = ticketSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};

export const validateTicketUpdateData = function (req, res, next) {
  let { error, value } = ticketUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  req.body = value;
  next();
};
