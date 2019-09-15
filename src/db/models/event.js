import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  time: Date,
  location: String,
  manager: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resultOfWork: String,
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resultOfWork: String,
  }],
  closed: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

export default mongoose.model('Event', EventSchema);
