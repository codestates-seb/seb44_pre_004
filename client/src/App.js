import { Provider } from 'react-redux';
import { store } from './store/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Header from './components/layout/Header';
import RoutingPages from './pages/RoutingPages';

import './App.css';

export const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Header />
          <RoutingPages />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
