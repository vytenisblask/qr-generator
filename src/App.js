import React from 'react';
import './App.css';
import QRCodeGenerator from './QRcodeGenerator';
import { Flex, Box, useColorMode, Switch, Image } from '@chakra-ui/react';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="App">
      <Flex className="App-header" justifyContent="space-between" alignItems="center" p={4}>
        <Box>
          <Image src="path-to-your-logo.svg" alt="Logo" boxSize="50px" />
        </Box>
        <Box>
          <label>
            {colorMode === 'light' ? 'Dark' : 'Light'} Mode
            <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark'} />
          </label>
        </Box>
      </Flex>
      <QRCodeGenerator />
    </div>
  );
}

export default App;
