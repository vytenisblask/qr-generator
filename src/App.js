import React from 'react';
import './App.css';
import QRCodeGenerator from './QRcodeGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>QR Code Generator</h1>
        <QRCodeGenerator />
      </header>
    </div>
  );
}

export default App;
