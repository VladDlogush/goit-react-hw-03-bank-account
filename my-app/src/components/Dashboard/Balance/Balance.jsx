import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ handleTotalAmount, balance }) => {
  return (
    <section className={styles.balance}>
      <span role="img" aria-label="deposit" className={styles.balance__text}>
        ⬆️{handleTotalAmount('deposit')}$
      </span>
      <span role="img" aria-label="withdrawal" className={styles.balance__text}>
        ⬇️{handleTotalAmount('withdrawal')}$
      </span>
      <span className={styles.balance__text}>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  handleTotalAmount: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Balance;
