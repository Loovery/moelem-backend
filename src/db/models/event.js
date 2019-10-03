import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
  chatLink: String,
  time: Date,
  location: String,
  manager: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resultOfWork: String,
  },
  maxParticipants: Number,
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resultOfWork: String,
  }],
  maxOrganizers: Number,
  organizers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resultOfWork: String,
  }],
  isClosed: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

export default mongoose.model('Event', EventSchema);
