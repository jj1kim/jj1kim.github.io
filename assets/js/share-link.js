// Share link button functionality
(function() {
  'use strict';
  
  var initialized = false;
  
  function initShareButton() {
    // Prevent multiple initializations
    if (initialized) {
      return;
    }
    
    var shareBtn = document.getElementById('share-link-btn');
    var urlInput = document.getElementById('post-url');
    var modal = document.getElementById('copy-modal');
    
    if (!shareBtn || !urlInput) {
      return;
    }
    
    initialized = true;
    
    var modalTimeout = null;
    
    function hideModal() {
      if (modal) {
        modal.style.display = 'none';
        if (modalTimeout) {
          clearTimeout(modalTimeout);
          modalTimeout = null;
        }
      }
    }
    
    function showModal() {
      if (modal) {
        modal.style.display = 'flex';
        
        // Auto-hide after 1.5 seconds
        modalTimeout = setTimeout(function() {
          hideModal();
        }, 1500);
        
        // Close when clicking outside (on the overlay background)
        modal.addEventListener('click', function modalClickHandler(e) {
          // Only close if clicking directly on the modal overlay (not on the inner content)
          if (e.target === modal) {
            hideModal();
            modal.removeEventListener('click', modalClickHandler);
          }
        });
      }
    }
    
    function copyToClipboard(text) {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(function() {
          showModal();
          return true;
        }).catch(function(err) {
          console.log('Clipboard API failed, trying fallback:', err);
          return fallbackCopy(text);
        });
      } else {
        return fallbackCopy(text);
      }
    }
    
    function fallbackCopy(text) {
      return new Promise(function(resolve, reject) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        
        try {
          var successful = document.execCommand('copy');
          document.body.removeChild(textarea);
          
          if (successful) {
            showModal();
            resolve(true);
          } else {
            reject(new Error('execCommand failed'));
          }
        } catch (err) {
          document.body.removeChild(textarea);
          reject(err);
        }
      });
    }
    
    shareBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      var urlToCopy = urlInput.value || '';
      if (!urlToCopy) {
        return;
      }
      
      copyToClipboard(urlToCopy).catch(function(err) {
        console.error('Copy failed:', err);
        urlInput.select();
        urlInput.setSelectionRange(0, 99999);
        alert('Please copy manually: ' + urlToCopy);
      });
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShareButton);
  } else {
    initShareButton();
  }
  
  // Also try after a delay as backup
  setTimeout(initShareButton, 500);
  setTimeout(initShareButton, 1000);
})();

