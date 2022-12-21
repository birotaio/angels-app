import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducers from './reducers';
import rootSagas from './sagas';
import createDebugger from 'redux-flipper';
let sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
if (__DEV__) {
  middleware.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducers,
  middleware,
});

rootSagas.forEach(saga => sagaMiddleware.run(saga));

export default store;
