import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true,
    },
    email: {
      type: String,
      required: true, // Email is mandatory
      unique: true,   // Email must be unique
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true, // Phone is mandatory
      trim: true,
    },
  },
);

// Create model from schema
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
