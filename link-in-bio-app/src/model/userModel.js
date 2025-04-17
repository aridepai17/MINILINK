import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(v);  // Simple URL validation
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  status: { 
    type: String, 
    default: 'active',
    enum: ['active', 'inactive', 'archived']  // Restricting status to specific values
  },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,  // Normalize email to lowercase
    trim: true  // Remove leading/trailing spaces from email
  },
  links: [linkSchema],
}, { timestamps: true });

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;
