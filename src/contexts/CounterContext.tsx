import { ReactElement, createContext, useCallback, useContext, useReducer } from 'react';

interface StateType {
  count: number;
  text?: string;
}

export interface CounterContextType {
  state: StateType;
  increment: () => void;
  decrement: () => void;
  incrementByFive: () => void;
  decrementByFive: () => void;
  changeCountAndText: () => void;
}

export const initialState: StateType = { count: 0, text: 'Hello World' };

export const stateInitial: CounterContextType = {
  state: initialState,
  increment: () => {},
  decrement: () => {},
  incrementByFive: () => {},
  decrementByFive: () => {},
  changeCountAndText: () => {},
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

export const CounterContext = createContext(stateInitial);

export const useCounterContext = (initialState: StateType): CounterContextType => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = useCallback((): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  }, []);

  const decrement = useCallback((): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  }, []);
  const incrementByFive = useCallback((): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENTBYFIVE, payload: { count: 5 } });
  }, []);

  const decrementByFive = useCallback((): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.DECREMENTBYFIVE, payload: { count: 5 } });
  }, []);

  const changeCountAndText = useCallback((): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.CHANGECOUNTANDTEXT, payload: { count: 5, text: 'Hello World' } });
  }, []);

  return { state, increment, decrement, incrementByFive, decrementByFive, changeCountAndText };
};

type childrenType = {
  children?: ReactElement | undefined;
};

export const CounterProvider = ({ children, ...initialState }: childrenType & StateType) => {
  return <CounterContext.Provider value={useCounterContext(initialState)}>{children}</CounterContext.Provider>;
};

const useCounter = (): CounterContextType => {
  const { state, increment, decrement, incrementByFive, decrementByFive, changeCountAndText } =
    useContext(CounterContext);

  return { state, increment, decrement, incrementByFive, decrementByFive, changeCountAndText };
};

export default useCounter;
