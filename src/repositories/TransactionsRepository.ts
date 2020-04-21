import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface AllTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): AllTransactions {
    // pega os valores do balanço
    const balance = this.getBalance();
    const allData = {
      transactions: this.transactions,
      balance: balance,
    };

    return allData;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.map(function (item) {
      if (item.type === 'income') {
        income = income + item.value;
      } else {
        outcome = outcome + item.value;
      }
    });

    return {
      income: income,
      outcome: outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
