import React, { useReducer, useState } from 'react';

interface StateType {
  count: number;
  text?: string;
}

type Props = {
  children: (count: number) => JSX.Element;
};

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  INCREMENTBYFIVE,
  DECREMENTBYFIVE,
  NEW_INPUT,
  CHANGECOUNTANDTEXT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: StateType;
};

const initialState: StateType = { count: 0, text: 'Hello World' };

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.INCREMENTBYFIVE:
      if (typeof action.payload === 'number') {
        return { ...state, count: state.count + action.payload };
      }
    case REDUCER_ACTION_TYPE.DECREMENTBYFIVE:
      if (action.payload) {
        return { ...state, count: state.count - action.payload.count };
      }
    case REDUCER_ACTION_TYPE.CHANGECOUNTANDTEXT:
      if (action.payload) {
        return { ...state, count: state.count + action.payload.count, text: action.payload.text };
      }
    default:
      return state;
  }
};

const Counter = ({ children }: Props) => {
  const [{ count, text }, dispatch] = useReducer(reducer, initialState);

  const increment = (): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  };

  const decrement = (): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  };
  const incrementByFive = (): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENTBYFIVE, payload: { count: 5 } });
  };

  const decrementByFive = (): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.DECREMENTBYFIVE, payload: { count: 5 } });
  };

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
      <button style={{ marginLeft: '10px' }} onClick={() => dispatch({type: REDUCER_ACTION_TYPE.CHANGECOUNTANDTEXT, payload: {count: 3, text: 'Hello Abdulmalik'}})}>
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
