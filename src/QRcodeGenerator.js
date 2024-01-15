import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { RgbaStringColorPicker } from 'react-colorful';
import {
  Box, Flex, FormControl, FormLabel, Input, Button, Slider, SliderTrack, 
  SliderFilledTrack, SliderThumb, Popover, PopoverTrigger, PopoverContent, 
  PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Select, FormErrorMessage, Badge, Tooltip
} from '@chakra-ui/react';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [qrSize, setQrSize] = useState(168); // Default QR code size
  const [fgColor, setFgColor] = useState('rgba(0, 0, 0, 1)');
  const [bgColor, setBgColor] = useState('rgba(255, 255, 255, 1)');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('L');

  const isValidUrl = (urlString) => {
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(urlString);
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    if (newUrl && !isValidUrl(newUrl)) {
      setValidationMessage('Please enter valid URL');
    } else {
      setValidationMessage('');
    }
  };

  const handleSizeChange = (value) => setQrSize(value);
  const handleFgColorChange = (color) => setFgColor(color);
  const handleBgColorChange = (color) => setBgColor(color);
  const handleECLevelChange = (e) => setErrorCorrectionLevel(e.target.value);

  const getRandomColor = () => {
    const getRandom = () => Math.floor(Math.random() * 256);
    return `rgba(${getRandom()}, ${getRandom()}, ${getRandom()}, 1)`;
  };

  const handleRandomizeColors = () => {
    setFgColor(getRandomColor());
    setBgColor(getRandomColor());
  };

  const downloadSvg = () => {
    const svgElement = document.querySelector(".qr-code-container svg");
    if (!svgElement) {
      console.error('No SVG found');
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "qr-code.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };  

  const downloadPng = () => {
    const svgElement = document.querySelector(".qr-code-container svg");
    if (!svgElement) {
      console.error('No SVG found');
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
  
    const canvas = document.createElement('canvas');
    canvas.width = qrSize;
    canvas.height = qrSize;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = 'qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  };  

  return (
    <Flex direction={{ base: "column", md: "row" }} wrap="wrap">
      <Box w={{ base: "100%", md: "50%" }} p={8}>
      <FormControl variant="floating" id="qr-url" isInvalid={!!validationMessage}>
        <Input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder=" "
            mb={0}
        />
        <FormLabel>Enter URL</FormLabel>
        <FormErrorMessage mt={1}>
            {validationMessage}
        </FormErrorMessage>
        </FormControl>

        <FormLabel mt={4} htmlFor="error-correction-level">Error Correction
        <Tooltip hasArrow label='Error correction in a QR code ensures that the code remains scannable and the URLa remains accessible, even if part of the QR code is damaged or covered. Error correction level affects the QR code more noticeably when the URL is large enough to make the proportional increase in error correction data significant.'>
            <Badge ml={2}>?</Badge>
        </Tooltip>
        </FormLabel>
        <Select id="error-correction-level" value={errorCorrectionLevel} onChange={handleECLevelChange} mb={4}>
          <option value="L">Level L (Low)</option>
          <option value="M">Level M (Medium)</option>
          <option value="Q">Level Q (Quartile)</option>
          <option value="H">Level H (High)</option>
        </Select>

        <FormLabel htmlFor="size-slider">Size</FormLabel>
        <Slider defaultValue={qrSize} min={128} max={512} onChange={handleSizeChange}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>

      <Box w={{ base: "100%", md: "50%" }} p={8}>
        <Box className="button-wrap">
          <Popover placement="auto">
            <PopoverTrigger>
              <Button colorScheme='blue'>Change Colors</Button>
            </PopoverTrigger>

            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader pt={4} fontWeight='bold' border='0' textAlign="center">
                    Select QR Code Colors
                </PopoverHeader>
                <PopoverBody display="flex" flexDirection="column" alignItems="center" gap="15px">
                    <Box style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
                    <RgbaStringColorPicker color={fgColor} onChange={handleFgColorChange} />
                    <RgbaStringColorPicker color={bgColor} onChange={handleBgColorChange} />
                    </Box>
                    <Button mb={3} mt={3} onClick={handleRandomizeColors}>Randomize</Button>
                </PopoverBody>
            </PopoverContent>

         </Popover>
            <Button onClick={downloadSvg}>Download SVG</Button>
            <Button onClick={downloadPng}>Download PNG</Button>
            </Box>
            <Box className="qr-code-container" mb={4}>
      <QRCode
        value={url || ' '}
        size={qrSize}
        fgColor={fgColor}
        bgColor={bgColor}
        level={errorCorrectionLevel}
        renderAs="svg"
      />
    </Box>
  </Box>
  </Flex>
  );
};

export default QRCodeGenerator;