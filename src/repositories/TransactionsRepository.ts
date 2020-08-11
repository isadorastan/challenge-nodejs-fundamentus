import Transaction from '../models/Transaction';
import { valueToNode } from '@babel/types';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transactions {
  transactions: Transaction[],
  balance: Balance
}

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: "income" | "outcome"
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transactions {
    const all = {
      transactions: this.transactions,
      balance: this.getBalance()
    }
    return all;
  }

  public getBalance(): Balance {
    const incomeTotal = this.sumTotalByType("income");
    const outcomeTotal = this.sumTotalByType("outcome");

    const balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal
    }
    
    return balance;
  }

  private sumTotalByType(type: "income" | "outcome") {
    return this.transactions.reduce((acc, obj) => {
      if(obj.type === type) {
        acc = acc + obj.value
      }
      return acc;
    }, 0);
  }

  public create({title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
