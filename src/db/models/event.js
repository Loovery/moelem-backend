import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  time: String,
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
},
{
  timestamps: true,
});

export default mongoose.model('Event', EventSchema);
