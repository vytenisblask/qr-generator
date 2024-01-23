import React from "react";
import "./App.css";
import QRCodeGenerator from "./QRcodeGenerator";
import NavigationBar from "./NavigationBar";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavigationBar />
      <QRCodeGenerator />
    </div>
  );
};

export default App;
