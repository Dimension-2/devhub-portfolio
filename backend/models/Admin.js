const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'admins' }); // This forces it to use the correct collection

module.exports = mongoose.model('Admin', AdminSchema);