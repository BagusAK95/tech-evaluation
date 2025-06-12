import { Router } from 'express';
import { validateIndex, validateCreate, validateUpdate } from '../utils/validator/transaction.js';
import TransactionController from '../controllers/transactions.js';

class TransactionRouter {
  constructor() {
    this.router = Router();
    this.controller = new TransactionController();
    this.init();
  }

  init() {
    this.router.get('/', validateIndex, this.index.bind(this));
    this.router.get('/:id', this.fetchById.bind(this));
    this.router.post('/', validateCreate, this.create.bind(this));
    this.router.put('/:id', validateUpdate, this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  index(req, res) {
    this.controller.index(req, res);
  }

  fetchById(req, res) {
    this.controller.fetchById(req, res);
  }

  create(req, res) {
    this.controller.create(req, res);
  }

  update(req, res) {
    this.controller.update(req, res);
  }

  delete(req, res) {
    this.controller.delete(req, res);
  }

  getRouter() {
    return this.router;
  }
}

export default new TransactionRouter().getRouter();
