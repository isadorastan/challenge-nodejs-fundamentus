import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: "income" | "outcome"
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: CreateTransactionDTO): Transaction {
    const {total} = this.transactionsRepository.getBalance();
    if(type === "outcome" && value > total) {
      throw Error('Não há saldo suficiente');
    }

    const transaction =  this.transactionsRepository.create({title, value, type});
    return transaction;
  }
}

export default CreateTransactionService;
