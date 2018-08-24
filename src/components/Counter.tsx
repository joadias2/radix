import React from 'react';
import styles from './Counter.scss';

type Props = {
  counter: number
};

const Counter: React.StatelessComponent<Props> = function(props) {
  return (
    <div className={styles.Counter}>
      <span>{props.counter}</span>
    </div>
  );
}

export default Counter;
