import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { SketchPicker } from 'react-color';

const QRCodeGenerator = () => {
    const [url, setUrl] = useState('');
    const [qrSize, setQrSize] = useState(128); // Default QR code size
    const [fgColor, setFgColor] = useState('#000000'); // Default foreground color
    const [bgColor, setBgColor] = useState('#ffffff'); // Default background color
    const [showColorPickers, setShowColorPickers] = useState(false); // State for showing/hiding color pickers

    // Handlers for changes in input, color, etc.
    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleSizeChange = (e) => setQrSize(e.target.value);
    const handleFgColorChange = (color) => setFgColor(color.hex);
    const handleBgColorChange = (color) => setBgColor(color.hex);
    const toggleColorPickers = () => setShowColorPickers(!showColorPickers);

    const downloadSvg = () => {
        const svg = document.querySelector('svg');
        if (!svg) {
            console.error('No SVG found');
            return;
        }
        const svgData = new XMLSerializer().serializeToString(svg);
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
        const svg = document.querySelector('svg');
        if (!svg) {
            console.error('No SVG found');
            return;
        }
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = qrSize;
            canvas.height = qrSize;
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = dataUrl;
            downloadLink.download = 'qr-code.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svg));
    };

    return (
        <div className="App-header">
            <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter URL" />
            <input type="range" min="128" max="512" value={qrSize} onChange={handleSizeChange} />
            <button onClick={toggleColorPickers}>Change Colors</button>
            
            <div className="qr-code-container">
                <QRCode
                    value={url || ' '}
                    size={qrSize}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    renderAs="svg"
                />
                {showColorPickers && (
                    <div className="color-pickers">
                        <SketchPicker color={fgColor} onChangeComplete={handleFgColorChange} />
                        <SketchPicker color={bgColor} onChangeComplete={handleBgColorChange} />
                    </div>
                )}
            </div>
    
            <button onClick={downloadSvg}>Download SVG</button>
            <button onClick={downloadPng}>Download PNG</button>
        </div>
    );    
};

export default QRCodeGenerator;
