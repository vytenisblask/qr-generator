// App.js
import React from 'react';
import './App.css';
import QRCodeGenerator from './QRcodeGenerator';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <QRCodeGenerator />
    </div>
  );
}

export default App;
