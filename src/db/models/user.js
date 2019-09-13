import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  telegramId: {
    type: Number,
    unique: true,
  },
  username: String,
  first_name: String,
  last_name: String,
  fullname: String,
  birthday: Date,
  phone: String,
  staffPersonalNumber: {
    type: Number,
    unique: true,
  },
  jobTitle: String,
  description: String,
  role: {
    type: String,
    default: 'user',
  },
},
{
  timestamps: true,
});

export default mongoose.model('User', UserSchema);
