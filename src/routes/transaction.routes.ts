import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  const transactions = transactionsRepository.all();

  return response.json(transactions);

  // try {
  //   // TODO
  // } catch (err) {
  //   return response.status(400).json({ error: err.message });
  // }
});

transactionRouter.post('/', (request, response) => {
  // try {
  //   // TODO
  // } catch (err) {
  //   return response.status(400).json({ error: err.message });
  // }

  const { title, value, type } = request.body;

  const transaction = transactionsRepository.create(title, value, type);

  return response.json(transaction);
});

export default transactionRouter;
