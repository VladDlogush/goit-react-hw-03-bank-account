import React, { Component } from 'react';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const localTransactions = localStorage.getItem('transactions');
    const localBalance = localStorage.getItem('balance');

    if (localTransactions && localBalance) {
      this.setState({
        transactions: JSON.parse(localTransactions),
        balance: JSON.parse(localBalance),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;
    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify([...transactions]));
      localStorage.setItem('balance', JSON.stringify(balance));
    }
  }

  handleTransaction = transaction => {
    this.setState(prevState => {
      return {
        transactions: [...prevState.transactions, transaction],
        balance:
          transaction.type === 'withdrawal'
            ? prevState.balance - transaction.amount
            : prevState.balance + transaction.amount,
      };
    });
  };

  handleTotalAmount = type => {
    const { transactions } = this.state;
    const amount = transactions
      .filter(transaction => transaction.type === type)
      .reduce((acc, transaction) => {
        return Number(transaction.amount) + Number(acc);
      }, 0);

    return amount;
  };

  render() {
    const { transactions, balance } = this.state;
    return (
      <div>
        <Controls
          handleTransaction={this.handleTransaction}
          balance={balance}
        />
        <Balance handleTotalAmount={this.handleTotalAmount} balance={balance} />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}

export default Dashboard;
