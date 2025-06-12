import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  transactionType: {
    type: String,
    enum: ['Stake', 'Borrow', 'Lend'],
    required: true
  },
  token: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('transactions', transactionSchema);
