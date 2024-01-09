import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme'; // Import the custom theme
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}> {/* Provide the custom theme here */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
