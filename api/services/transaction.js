import TransactionRepository from '../repositories/transaction.js';

export default class TransactionService {
  constructor() {
    this.repository = new TransactionRepository();
  }

  async getAll(type) {
    try {
      return await this.repository.getAll(type);
    } catch (error) {
      console.error('TransactionService.getAll error' + error.message);
      throw new Error('Failed to fetch transactions: ' + error.message);
    }
  }

  async getByID(id) {
    try {
      const transaction = await this.repository.getByID(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      
      return transaction;
    } catch (error) {
      console.error('TransactionService.getByID error' + error.message);
      throw new Error('Failed to fetch transaction: ' + error.message);
    }
  }

  async create(data) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      console.error('TransactionService.create error' + error.message);
      throw new Error('Failed to create transaction: ' + error.message);
    }
  }

  async update(id, data) {
    try {
      const transaction = await this.repository.getByID(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      if (data.status === 'cancelled' && transaction.status === 'completed') {
        throw new Error('Cannot cancel completed transactions');
      }

      return await this.repository.update(id, data);
    } catch (error) {
      console.error('TransactionService.update error' + error.message);
      throw new Error('Failed to update transaction: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const transaction = await this.repository.getByID(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      if (transaction.status === 'completed') {
        throw new Error('Cannot delete completed transactions');
      }

      return await this.repository.delete(id);
    } catch (error) {
      console.error('TransactionService.delete error' + error.message);
      throw new Error('Failed to delete transaction: ' + error.message);
    }
  }
}