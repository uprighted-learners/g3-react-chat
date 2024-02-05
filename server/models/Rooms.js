import {model, Schema} from 'mongoose';

/**
 * @property {array of ObjectId} addedUsers - Array types of ObjectId and ref allows access to user properties
 */
const RoomSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  addedUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = model('Room', RoomSchema);
