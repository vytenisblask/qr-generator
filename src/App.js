// App.js
import React from 'react';
import './App.css';
import QRCodeGenerator from './QRcodeGenerator';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />
      </header>
      <QRCodeGenerator />
    </div>
  );
}

export default App;
