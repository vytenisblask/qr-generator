import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { ChromePicker } from 'react-color';
import {
  Box, Input, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody,
  Select, FormControl, FormLabel
} from '@chakra-ui/react';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrSize, setQrSize] = useState(128); // Default QR code size
  const [fgColor, setFgColor] = useState('#000000'); // Default foreground color
  const [bgColor, setBgColor] = useState('#ffffff'); // Default background color
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('L'); // Error correction level

  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleSizeChange = (value) => setQrSize(value);
  const handleFgColorChange = (color) => setFgColor(color.hex);
  const handleBgColorChange = (color) => setBgColor(color.hex);

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
    <Box p={8} className="App-header">
        <FormControl variant="floating" id="qr-url">
          <Input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder=" "
          mb={4}
        />
        <FormLabel>Enter URL</FormLabel>
      </FormControl>

      <FormLabel htmlFor="error-correction-level">Error Correction</FormLabel>
      <Select id="error-correction-level" value={errorCorrectionLevel} onChange={(e) => setErrorCorrectionLevel(e.target.value)} mb={4}>
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


      <Box className="qr-code-container">
        <QRCode
          value={url || ' '}
          size={qrSize}
          fgColor={fgColor}
          bgColor={bgColor}
          level={errorCorrectionLevel}
          renderAs="svg"
        />
      </Box>

      <Popover placement="right">
        <PopoverTrigger>
          <Button colorScheme='blue'>Change Colors</Button>
        </PopoverTrigger>
        <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
          <PopoverArrow bg='blue.800'/>
          <PopoverCloseButton />
          <PopoverHeader pt={4} fontWeight='bold' border='0'>
            Select QR Code Colors
          </PopoverHeader>
          <PopoverBody display="flex" flexDirection="row" justifyContent="center" gap="20px">
            <ChromePicker color={fgColor} onChangeComplete={handleFgColorChange} />
            <ChromePicker color={bgColor} onChangeComplete={handleBgColorChange} />
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Button onClick={downloadSvg} mt={4}>Download SVG</Button>
      <Button onClick={downloadPng} mt={4}>Download PNG</Button>
    </Box>
  );
};

export default QRCodeGenerator;
