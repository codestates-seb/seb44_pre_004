import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/layout/Header';
import RoutingPages from './pages/RoutingPages';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <RoutingPages />
      </div>
    </Provider>
  );
}

export default App;
