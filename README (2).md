# 📸 Screenshot OCR - Area Capture Chrome Extension

A Chrome extension that allows users to select specific areas of webpages and extract text using OCR (Optical Character Recognition) technology.

## 🚀 Features

- **Area Selection**: Click and drag to select any rectangular area on a webpage
- **OCR Processing**: Extracts text from the selected image area using API Ninjas OCR service
- **User-Friendly Interface**: Intuitive overlay with visual feedback
- **API Key Storage**: Securely saves your API key for future use
- **Retina Display Support**: Handles high-DPI displays correctly
- **Keyboard Shortcuts**: Press ESC to cancel selection

## 📋 Prerequisites

- Google Chrome browser
- API Ninjas account and API key (free tier available)

## 📦 Installation

### Method 1: Developer Mode (Recommended for Testing)

1. **Download the Extension Files**
   - Download all the files: `manifest.json`, `popup.html`, `popup.js`, `content.js`, `background.js`, `content.css`
   - Place them in a single folder (e.g., `screenshot-ocr-extension`)

2. **Enable Developer Mode in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Toggle on "Developer mode" in the top right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the folder containing your extension files
   - The extension should now appear in your extensions list

4. **Pin the Extension** (Optional)
   - Click the puzzle piece icon in Chrome's toolbar
   - Pin the "Screenshot OCR - Area Capture" extension for easy access

## 🔑 Getting an API Key

1. **Sign up for API Ninjas**
   - Visit [API Ninjas](https://api.api-ninjas.com/)
   - Create a free account
   - Navigate to your dashboard to get your API key

2. **API Limits**
   - Free tier: 200KB per image
   - Premium tier: Up to 5MB per image

## 🎯 How to Use

### Step 1: Set Up Your API Key
1. Click the extension icon in your Chrome toolbar
2. Enter your API Ninjas key in the "API Key" field
3. The key will be saved automatically for future use

### Step 2: Capture Text from Webpage
1. Navigate to any webpage with text you want to extract
2. Click the extension icon and then "Start Area Selection"
3. Your cursor will change to a crosshair
4. Click and drag to select the area containing text
5. Release the mouse button to capture the selection
6. Wait for the OCR processing to complete
7. View the extracted text in the extension popup

### Step 3: Tips for Best Results
- Ensure good contrast between text and background
- Select areas with clear, readable text
- Avoid selecting areas that are too small (minimum 10x10 pixels)
- Press ESC to cancel selection if needed

## 📁 File Structure

```
screenshot-ocr-extension/
├── manifest.json          # Extension configuration
├── popup.html             # Extension popup interface  
├── popup.js               # Popup functionality
├── content.js             # Page interaction and overlay
├── background.js          # Screenshot capture and OCR processing
└── content.css           # Styling for overlay elements
```

## 🔧 Technical Details

### Architecture
- **Manifest V3**: Uses the latest Chrome extension format
- **Content Script**: Handles area selection overlay and user interaction
- **Background Script**: Manages screenshot capture, image cropping, and API communication
- **Popup Script**: Provides user interface and settings management

### Key Technologies
- Chrome Extension APIs (`chrome.tabs`, `chrome.scripting`, `chrome.storage`)
- Canvas API for image cropping
- Fetch API for OCR service communication
- FormData for file uploads

### Security Features
- API keys are stored securely using Chrome's storage sync
- Content Security Policy (CSP) compliant
- No external script dependencies

## 🛠️ Troubleshooting

### Common Issues

**Extension not working after installation**
- Refresh the webpage after installing the extension
- Check that developer mode is enabled
- Verify all files are in the same directory

**"No active tab found" error**
- Make sure you're on a regular webpage (not chrome:// pages)
- Refresh the current tab and try again

**OCR API errors**
- Verify your API key is correct
- Check your API quota hasn't been exceeded
- Ensure the selected image is under size limits

**Selection not working**
- Try refreshing the page
- Check that JavaScript is enabled
- Ensure the page has finished loading

**No text detected**
- Ensure the selected area contains clear, readable text
- Try selecting a larger area
- Check image quality and contrast

## 🔍 Development

### Modifying the Extension

1. **Editing Code**
   - Make changes to the relevant files
   - Go to `chrome://extensions/`
   - Click the refresh icon on your extension

2. **Testing Changes**
   - Always test on different websites
   - Check browser console for errors
   - Test with different screen resolutions

3. **Adding Features**
   - Modify `manifest.json` for new permissions
   - Update relevant script files
   - Follow Chrome extension development guidelines

## 📝 API Reference

### API Ninjas OCR Endpoint
- **URL**: `https://api.api-ninjas.com/v1/imagetotext`
- **Method**: POST
- **Headers**: `X-Api-Key: YOUR_API_KEY`
- **Body**: FormData with image file
- **Response**: Array of detected text objects with bounding boxes

### Response Format
```json
[
  {
    "text": "Detected text",
    "bounding_box": {
      "x1": 10,
      "y1": 20,
      "x2": 100,
      "y2": 50
    }
  }
]
```

## 🔒 Privacy & Security

- API keys are stored locally using Chrome's sync storage
- No data is sent to external servers except the OCR API
- Screenshots are processed locally before being sent to the OCR service
- No browsing history or personal data is collected

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure you're using the latest version of Chrome
4. Verify your API key is valid and has remaining quota

## 🔗 Related Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [API Ninjas Documentation](https://api.api-ninjas.com/api/imagetotext)
- [Canvas API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)