// models/Member.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // New password field
  rentedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rental' }],
}, { timestamps: true });

// Hash password before saving
memberSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Member', memberSchema);
