// By Raul Brito
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionBalance {
  transactions: Transaction[];
  balance: Balance;
}

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionBalance {

    const transactionBalance =  {
      transactions: this.transactions,
      balance: this.getBalance()};
    const transaction = this.getTransactionBalance(transactionBalance);

   return transaction;
  }

  public findByOutCome({ title, value, type }:RequestDTO) : Boolean{
    const balance = this.getBalance();
    return (type === 'outcome' && value > balance.total);
  }

  public getBalance() : Balance{
    let inc = 0;
    let out = 0;

    this.transactions.map(transaction => {
      if(transaction.type === 'income'){
        inc += transaction.value;
      }else{
        out += transaction.value;
      }
    });

    const balance = {
        income: inc,
        outcome: out,
        total: Number(inc - out)
    }
    return balance;
  }
  public getTransactionBalance({transactions,balance}: TransactionBalance): TransactionBalance {
    const transactionBalance = {
      transactions,balance
    }
    return transactionBalance;
  }

  public create({ title, value, type }:RequestDTO): Transaction {

    const transactions = new Transaction({ title, value, type });

    this.transactions.push(transactions);

    return transactions;
  }
}

export default TransactionsRepository;
