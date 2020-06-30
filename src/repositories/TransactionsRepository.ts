import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.filter(i => i.type === 'income');
    const sumIncome = income.reduce((r, t) => {
      return r + t.value;
    }, 0);

    const outcome = this.transactions.filter(i => i.type === 'outcome');
    const sumOutcome = outcome.reduce((r, t) => {
      return r + t.value;
    }, 0);

    const total = sumIncome - sumOutcome;
    const balance: Balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const balance = this.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw Error('Value not available');
    }
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
