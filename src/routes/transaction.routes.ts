import { Router } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository;

transactionRouter.get('/', (request, response) => {
  try {
    const all = transactionsRepository.all();
    return response.json(all);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;
  
  try {
    const createTransaction = new CreateTransactionService(transactionsRepository);
    const transaction = createTransaction.execute({title, value, type});
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
