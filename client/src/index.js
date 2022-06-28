import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { getPosts } from './features/postsSlice';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import Fonts from './fonts';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(getPosts());

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts/>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
