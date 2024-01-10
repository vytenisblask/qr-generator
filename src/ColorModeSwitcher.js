// ColorModeSwitcher.js
import React from 'react';
import { useColorMode, Switch, Flex, Text } from '@chakra-ui/react';

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex align="center">
      <Text mr={2}>{colorMode === 'light' ? 'Dark' : 'Light'} Mode</Text>
      <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark'} />
    </Flex>
  );
};

export default ColorModeSwitcher;
