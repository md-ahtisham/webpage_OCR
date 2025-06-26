// content.js
(function() {
  'use strict';
  
  let isSelecting = false;
  let startX, startY, endX, endY;
  let overlay, selectionBox;
  let apiKey = '';
  
  // Prevent multiple injections
  if (window.screenshotOCRInjected) {
    return;
  }
  window.screenshotOCRInjected = true;
  
  // Listen for messages from popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'startSelection') {
      apiKey = request.apiKey;
      startAreaSelection();
      sendResponse({ success: true });
    }
  });
  
  function startAreaSelection() {
    if (isSelecting) return;
    
    isSelecting = true;
    createOverlay();
    
    // Disable page scrolling
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    document.addEventListener('mousedown', onMouseDown, true);
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('mouseup', onMouseUp, true);
    document.addEventListener('keydown', onKeyDown, true);
  }
  
  function createOverlay() {
    // Create overlay
    overlay = document.createElement('div');
    overlay.id = 'screenshot-ocr-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 999999;
      cursor: crosshair;
      user-select: none;
    `;
    
    // Create selection box
    selectionBox = document.createElement('div');
    selectionBox.id = 'screenshot-ocr-selection';
    selectionBox.style.cssText = `
      position: fixed;
      border: 2px solid #4285f4;
      background: rgba(66, 133, 244, 0.1);
      z-index: 1000000;
      pointer-events: none;
      display: none;
    `;
    
    // Create instruction text
    const instruction = document.createElement('div');
    instruction.id = 'screenshot-ocr-instruction';
    instruction.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      z-index: 1000001;
      user-select: none;
    `;
    instruction.textContent = 'Click and drag to select area • Press ESC to cancel';
    
    document.body.appendChild(overlay);
    document.body.appendChild(selectionBox);
    document.body.appendChild(instruction);
  }
  
  function onMouseDown(e) {
    if (!isSelecting) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    startX = e.clientX;
    startY = e.clientY;
    endX = e.clientX;
    endY = e.clientY;
    
    selectionBox.style.display = 'block';
    updateSelectionBox();
  }
  
  function onMouseMove(e) {
    if (!isSelecting || !selectionBox.style.display || selectionBox.style.display === 'none') return;
    
    e.preventDefault();
    e.stopPropagation();
    
    endX = e.clientX;
    endY = e.clientY;
    
    updateSelectionBox();
  }
  
  function onMouseUp(e) {
    if (!isSelecting) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    
    if (width < 10 || height < 10) {
      // Selection too small, cancel
      endSelection();
      return;
    }
    
    // Calculate selection coordinates
    const selection = {
      x: Math.min(startX, endX),
      y: Math.min(startY, endY),
      width: width,
      height: height
    };
    
    // Account for device pixel ratio
    const devicePixelRatio = window.devicePixelRatio || 1;
    const scaledSelection = {
      x: selection.x * devicePixelRatio,
      y: selection.y * devicePixelRatio,
      width: selection.width * devicePixelRatio,
      height: selection.height * devicePixelRatio
    };
    
    endSelection();
    captureAndCrop(scaledSelection);
  }
  
  function onKeyDown(e) {
    if (e.key === 'Escape' && isSelecting) {
      e.preventDefault();
      e.stopPropagation();
      endSelection();
    }
  }
  
  function updateSelectionBox() {
    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    
    selectionBox.style.left = left + 'px';
    selectionBox.style.top = top + 'px';
    selectionBox.style.width = width + 'px';
    selectionBox.style.height = height + 'px';
  }
  
  function endSelection() {
    isSelecting = false;
    
    // Remove event listeners
    document.removeEventListener('mousedown', onMouseDown, true);
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('mouseup', onMouseUp, true);
    document.removeEventListener('keydown', onKeyDown, true);
    
    // Remove overlay elements
    const overlay = document.getElementById('screenshot-ocr-overlay');
    const selectionBox = document.getElementById('screenshot-ocr-selection');
    const instruction = document.getElementById('screenshot-ocr-instruction');
    
    if (overlay) overlay.remove();
    if (selectionBox) selectionBox.remove();
    if (instruction) instruction.remove();
    
    // Restore page scrolling
    document.body.style.overflow = '';
  }
  
  function captureAndCrop(selection) {
    // Send message to background script to capture and crop
    chrome.runtime.sendMessage({
      action: 'captureAndCrop',
      selection: selection,
      apiKey: apiKey
    });
  }
})();