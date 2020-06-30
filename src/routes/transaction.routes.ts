import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const total = { transactions, balance };

    return response.json(total);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const CreateTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    const result = CreateTransaction.execute({ title, value, type });
    return response.json(result);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
