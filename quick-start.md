# 🎯 Quick Start Guide

## Step-by-Step Usage Example

### 1. Install and Setup
```
1. Load the extension in Chrome (chrome://extensions/)
2. Pin the extension to your toolbar
3. Get your free API key from api-ninjas.com
```

### 2. Using the Extension

**Step 1: Open Extension**
- Click the 📸 icon in your Chrome toolbar
- Enter your API key in the input field (saved automatically)

**Step 2: Start Selection** 
- Click "🎯 Start Area Selection" button
- The popup will close and you'll see the webpage

**Step 3: Select Area**
- Page dims with dark overlay
- Instructions appear at top: "Click and drag to select area • Press ESC to cancel"
- Cursor changes to crosshair (+)
- Click and drag to select rectangular area containing text
- Blue selection box shows your selection area

**Step 4: Get Results**
- Release mouse to capture selection
- Extension processes the image (few seconds)
- Click extension icon again to see extracted text
- Results appear in the extension popup

### 3. Example Text Extraction

**What works well:**
- Clear printed text (articles, documents, signs)
- High contrast text (black text on white background)
- Reasonable font sizes (not too small/blurry)
- Screenshots of text from other applications

**Tips for best results:**
- Select area tightly around text (avoid extra whitespace)
- Ensure good lighting/contrast in the image
- Select larger areas rather than single words
- Avoid selecting areas with mixed content (text + images)

### 4. Troubleshooting Quick Fixes

**Extension not responding:**
- Refresh the webpage and try again
- Check that the extension is enabled in chrome://extensions/

**No text detected:**
- Try selecting a larger, clearer area
- Ensure the text has good contrast
- Check that you're selecting actual text (not stylized graphics)

**API errors:**
- Verify your API key is correct
- Check your API quota hasn't been exceeded
- Try again in a few minutes (rate limiting)

## 📝 Keyboard Shortcuts

- **ESC**: Cancel area selection
- **Click + Drag**: Select area for OCR
- **Click Extension Icon**: View results/settings

## 🔧 File Organization for Installation

Create a folder with these files:
```
screenshot-ocr-extension/
├── manifest.json
├── popup.html  
├── popup.js
├── content.js
├── background.js
└── content.css
```

Then load this folder as an unpacked extension in Chrome.