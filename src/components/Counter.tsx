import React from 'react';

type Props = {
  counter: number
};

const Counter: React.StatelessComponent<Props> = function(props) {
  return (
    <div className="counter">
      <span>{props.counter}</span>
    </div>
  );
}

export default Counter;
