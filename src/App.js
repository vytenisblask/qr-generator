import React from 'react';
import './App.css';
import QRCodeGenerator from './QRcodeGenerator';
import { Flex, Box, useColorMode, Switch, Image, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="App">
      <Flex className="App-header" justifyContent="space-between" alignItems="center" p={4}>
        <Box>
          <Image src="path-to-your-logo.svg" alt="Logo" boxSize="50px" />
        </Box>
        <Box>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            isRound={true}
          />
        </Box>
      </Flex>
      <QRCodeGenerator />
    </div>
  );
}

export default App;
