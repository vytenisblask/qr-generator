// NavigationBar.js
import React from 'react';
import { Flex, Box, Image } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher';

const NavigationBar = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" p={4}>
      <Box>
        <Image src="path-to-your-logo.svg" alt="Logo" boxSize="50px" />
      </Box>
      <Box>
        <ColorModeSwitcher />
      </Box>
    </Flex>
  );
};

export default NavigationBar;
