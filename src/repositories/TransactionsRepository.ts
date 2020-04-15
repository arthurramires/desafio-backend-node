import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Data {
  title: string;
  value: number;
  type: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncomes = this.transactions.filter(transaction => {
      return transaction.type === 'income';
    });

    const calcIncomes = totalIncomes.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const totalOutcomes = this.transactions.filter(transaction => {
      return transaction.type === 'outcome';
    });

    const calcOutcomes = totalOutcomes.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const total = calcIncomes - calcOutcomes;

    const balance = {
      income: calcIncomes,
      outcome: calcOutcomes,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Data): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
