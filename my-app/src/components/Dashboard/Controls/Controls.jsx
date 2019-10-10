import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import styles from './Controls.module.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Controls extends Component {
  state = {
    input: '',
  };

  handleChange = e => {
    this.setState({
      input: e.target.value,
    });
  };

  handleClick = e => {
    const { handleTransaction, balance } = this.props;
    const { input } = this.state;

    const amount = Number(input);
    const date = new Date().toLocaleString();

    const transaction = {
      id: shortid.generate(),
      type: e.target.name,
      amount,
      date,
    };

    if (input === '0' || input === '' || Number(input) <= 0) {
      toast('Введите сумму для проведения операции!');
      this.reset();
      return;
    }

    if (input > balance && transaction.type === 'withdrawal') {
      toast('На счету недостаточно средств для проведения операции!');
      this.reset();
      return;
    }

    handleTransaction(transaction);
    this.reset();
  };

  reset = () => {
    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;
    return (
      <section className={styles.controls}>
        <input
          type="number"
          name="balance"
          value={input}
          onChange={this.handleChange}
          className={styles.controls__input}
        />
        <button
          type="button"
          name="deposit"
          onClick={this.handleClick}
          className={styles.controls__button}
        >
          Deposit
        </button>
        <button
          type="button"
          name="withdrawal"
          onClick={this.handleClick}
          className={styles.controls__button}
        >
          Withdraw
        </button>
      </section>
    );
  }
}

Controls.propTypes = {
  handleTransaction: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Controls;
