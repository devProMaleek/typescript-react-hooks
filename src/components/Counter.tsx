import React, { useReducer, useState } from 'react';
import useCounter from '../contexts/CounterContext';

type Props = {
  children: (count: number) => JSX.Element;
};

const Counter = ({ children }: Props) => {
  const {
    state: { count, text },
    increment,
    decrement,
    incrementByFive,
    decrementByFive,
    changeCountAndText,
  } = useCounter();

  return (
    <>
      <h3>{children(count)}</h3>
      <h3>{text}</h3>
      <div style={{ marginBottom: '15px' }}>
        <button style={{ marginRight: '10px' }} onClick={increment}>
          Increment
        </button>
        <button style={{ marginLeft: '10px' }} onClick={decrement}>
          Decrement
        </button>
      </div>
      <button style={{ marginLeft: '10px' }} onClick={changeCountAndText}>
        Change Count and Text
      </button>
      <div style={{ marginTop: '15px' }}>
        <button style={{ marginRight: '10px' }} onClick={incrementByFive}>
          Increment by 5
        </button>
        <button style={{ marginLeft: '10px' }} onClick={decrementByFive}>
          Decrement by 5
        </button>
      </div>
    </>
  );
};

export default Counter;
