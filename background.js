// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'captureAndCrop') {
    handleCaptureAndCrop(request.selection, request.apiKey, sender.tab.id);
  }
});

async function handleCaptureAndCrop(selection, apiKey, tabId) {
  try {
    // Capture the full visible tab
    const screenshotDataUrl = await chrome.tabs.captureVisibleTab(null, {
      format: 'png'
    });
    
    // Crop the image using canvas
    const croppedBlob = await cropImage(screenshotDataUrl, selection);
    
    // Send to OCR API
    const ocrResult = await sendToOCR(croppedBlob, apiKey);
    
    // Send result back to content script
    chrome.tabs.sendMessage(tabId, {
      action: 'ocrResult',
      data: ocrResult
    });
    
  } catch (error) {
    console.error('Error processing screenshot:', error);
    chrome.tabs.sendMessage(tabId, {
      action: 'ocrError',
      error: error.message || 'Error processing screenshot'
    });
  }
}

function cropImage(dataUrl, selection) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
      // Set canvas dimensions to the selection size
      canvas.width = selection.width;
      canvas.height = selection.height;
      
      // Draw the cropped portion of the image
      ctx.drawImage(
        img,
        selection.x, selection.y, selection.width, selection.height,
        0, 0, selection.width, selection.height
      );
      
      // Convert canvas to blob
      canvas.toBlob(function(blob) {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      }, 'image/png');
    };
    
    img.onerror = function() {
      reject(new Error('Failed to load image for cropping'));
    };
    
    img.src = dataUrl;
  });
}

async function sendToOCR(imageBlob, apiKey) {
  const formData = new FormData();
  formData.append('image', imageBlob, 'screenshot.png');
  
  const response = await fetch('https://api.api-ninjas.com/v1/imagetotext', {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey
    },
    body: formData
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OCR API error (${response.status}): ${errorText}`);
  }
  
  const result = await response.json();
  return result;
}

// Handle extension installation
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    console.log('Screenshot OCR extension installed');
  }
});