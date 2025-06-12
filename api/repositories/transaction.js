import Transaction from '../models/transaction.js';

export default class TransactionRepository {
  async getAll(type) {
    try {
      const filter = {}
      if (type && type.trim() !== '') {
        filter.transactionType = type
      }

      return await Transaction.find(filter);
    } catch (error) {
      throw new Error('Failed to fetch transactions: ' + error.message);
    }
  }

  async getByID(id) {
    try {
      return await Transaction.findById(id);
    } catch (error) {
      console.error('TransactionRepository.getByID error' + error.message);
      throw new Error('Failed to fetch transaction: ' + error.message);
    }
  }

  async create(data) {
    try {
      const transaction = new Transaction(data);
      return await transaction.save();
    } catch (error) {
      console.error('TransactionRepository.create error' + error.message);
      throw new Error('Failed to create transaction: ' + error.message);
    }
  }

  async update(id, data) {
    try {
      return await Transaction.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error('TransactionRepository.update error' + error.message);
      throw new Error('Failed to update transaction: ' + error.message);
    }
  }

  async delete(id) {
    try {
      return await Transaction.findByIdAndDelete(id);
    } catch (error) {
      console.error('TransactionRepository.delete error' + error.message);
      throw new Error('Failed to delete transaction: ' + error.message);
    }
  }
}
