import TransactionRepository from '../repositories/transaction.js';
import createError from 'http-errors';

export default class TransactionService {
  constructor() {
    this.repository = new TransactionRepository();
  }

  async getAll(type) {
    try {
      const transactions = await this.repository.getAll(type);
      return { data: transactions };
    } catch (error) {
      throw createError(error.statusCode || 500, error.message);
    }
  }

  async getByID(id) {
    try {
      const transaction = await this.repository.getByID(id);
      if (!transaction) {
        throw new createError.NotFound('Transaction not found');
      }
      
      return { data: transaction };
    } catch (error) {
      throw createError(error.statusCode || 500, error.message);
    }
  }

  async create(data) {
    try {
      const created = await this.repository.create(data);
      return { data: created };
    } catch (error) {
      throw createError(error.statusCode || 500, error.message);
    }
  }

  async update(id, data) {
    try {
      const transaction = await this.repository.getByID(id);
      if (!transaction) {
        throw new createError.NotFound('Transaction not found');
      }
      if (data.status === 'cancelled' && transaction.status === 'completed') {
        throw new createError.BadRequest('Cannot cancel completed transactions');
      }

      const updated = await this.repository.update(id, data);
      return { data: updated };
    } catch (error) {
      throw createError(error.statusCode || 500, error.message);
    }
  }

  async delete(id) {
    try {
      const transaction = await this.repository.getByID(id);
      if (!transaction) {
        throw new createError.NotFound('Transaction not found');
      }
      if (transaction.status === 'completed') {
        throw new createError.BadRequest('Cannot delete completed transactions');
      }

      await this.repository.delete(id);

      return { message: 'Deleted successfully' };
    } catch (error) {
      throw createError(error.statusCode || 500, error.message);
    }
  }
}