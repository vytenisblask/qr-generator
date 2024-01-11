// NavigationBar.js
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher';
import LogoIcon from './LogoIcon';

const NavigationBar = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" p={4}>
      <Box>
        <LogoIcon />
      </Box>
      <Box>
        <ColorModeSwitcher />
      </Box>
    </Flex>
  );
};

export default NavigationBar;
