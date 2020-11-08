import React from 'react';
import { Provider } from 'react-redux';
import QueryUi from './components/QueryUi';
import store from './store'


function App() {
  return (
    <div>
      <Provider store={store}>
          <QueryUi/>
      </Provider>
    </div>
  );
}
export default App;
