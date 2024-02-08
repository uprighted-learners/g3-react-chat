const {model, Schema} = require('mongoose');

const UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, unique: true, lowercase: true, required: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
});

module.exports = model('User', UserSchema);
