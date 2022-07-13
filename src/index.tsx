import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter basename="/pizza-app">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
