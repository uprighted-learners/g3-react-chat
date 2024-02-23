const {model, Schema} = require('mongoose');

/**
 * @property {Date} when - Automatically set date/time when message is first created. https://stackoverflow.com/questions/10006218/which-schematype-in-mongoose-is-best-for-a-timestamp
 * @param {Boolean} timestamps - Automatically manage "createdAt" and "updatedAt" fields. https://www.mongodb.com/docs/manual/reference/bson-types/#document-bson-type-date
 */
const MessageSchema = new Schema(
  {
    timestamps: {type: Date, default: Date.now},
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    roomId: {type: Schema.Types.ObjectId, required: true, ref: 'Room'},
    message: {type: String, required: true},
  },
  {timestamps: true}
);

module.exports = model('Message', MessageSchema);
