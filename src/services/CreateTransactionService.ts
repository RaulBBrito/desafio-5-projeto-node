// By Raul Brito
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }:RequestDTO ): Transaction {

    const findtransactionsByOutCome = this.transactionsRepository.findByOutCome({ title, value, type });

    if (findtransactionsByOutCome) {
      throw Error('Total value in extrapolated cash.');
    }

    const transactions = this.transactionsRepository.create({ title, value, type });

    return transactions;
  }
}

export default CreateTransactionService;
