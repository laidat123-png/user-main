import { createStore, applyMiddleware, compose } from 'redux';
import { appReducers } from './index';
import thunk from 'redux-thunk';

export const store = createStore(
    appReducers,
    compose(
        applyMiddleware(thunk)
    )
)