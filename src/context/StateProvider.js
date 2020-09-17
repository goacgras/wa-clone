import React, { useContext, createContext, useReducer } from 'react'

//global state, creating data where it lives
export const StateContext = createContext();

//create provider where can be use everywhere which has a values
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
