const { body } = require('express-validator');

exports.notificationValidation = [
  body('toUser').optional().isMongoId(),
  body('toContact').optional().custom(contact => {
    if (!contact.email && !contact.mobile) throw new Error('Email or Mobile must be provided');
    return true;
  }),
  body('type').notEmpty().isIn(['inapp','email','whatsapp','sms']),
  body('channelRef').optional().isString(),
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').optional().isIn(['queued','sent','failed']),
  body('relatedModel').optional().custom(model => {
    if (model && (!model.kind || !model.item)) throw new Error('relatedModel must have kind and item');
    return true;
  })
];
