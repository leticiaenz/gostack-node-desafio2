import Transaction from '../models/Transaction';

const typeIncome = 'income';
const typeOutcome = 'outcome';

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

    return {
      transactions: this.transactions,
      balance: balance,
    };
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.map(item => {
      if (item.type === typeIncome) {
        income = income + item.value;
      } else {
        if (item.type === typeOutcome) {
          outcome = outcome + item.value;
        }
      }
    });

    return {
      income: income,
      outcome: outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const resume = this.getBalance();

    if (type == typeOutcome && resume.total < value) {
      throw { message: 'Saldo Insuficiente' };
    }

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
