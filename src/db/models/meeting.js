import mongoose from 'mongoose';

const MeetingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: String,
  time: Date,
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
},
{
  timestamps: true,
});

export default mongoose.model('Meeting', MeetingSchema);
