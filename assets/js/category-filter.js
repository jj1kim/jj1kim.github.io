// Category filter functionality
(function() {
  'use strict';
  
  function initCategoryFilter() {
    console.log('Initializing category filter...');
    
    var categoryButtons = document.querySelectorAll('.category-btn');
    var postItems = document.querySelectorAll('.post-item');
    
    console.log('Found buttons:', categoryButtons.length);
    console.log('Found posts:', postItems.length);
    
    if (categoryButtons.length === 0 || postItems.length === 0) {
      console.log('Category filter elements not found, retrying...');
      setTimeout(initCategoryFilter, 500);
      return;
    }
    
    function filterPosts(category) {
      console.log('Filtering by category:', category);
      
      postItems.forEach(function(item) {
        if (category === 'all') {
          item.style.display = '';
        } else {
          var categories = item.getAttribute('data-categories');
          if (categories && categories.indexOf(category) !== -1) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        }
      });
      
      // Update button styles - preserve original styles
      categoryButtons.forEach(function(btn) {
        var btnCategory = btn.getAttribute('data-category');
        if (btnCategory === category) {
          // Active button style
          btn.style.backgroundColor = 'var(--global-link-color)';
          btn.style.color = 'white';
          btn.style.border = 'none';
        } else {
          // Inactive button style - restore original
          btn.style.backgroundColor = 'var(--global-bg-color)';
          btn.style.color = 'var(--global-text-color)';
          btn.style.border = '1px solid var(--global-border-color)';
        }
      });
    }
    
    categoryButtons.forEach(function(btn) {
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Button clicked:', this.getAttribute('data-category'));
        var category = this.getAttribute('data-category');
        filterPosts(category);
        
        // Update URL without reload
        try {
          var url = new URL(window.location);
          if (category === 'all') {
            url.searchParams.delete('category');
          } else {
            url.searchParams.set('category', category);
          }
          window.history.pushState({category: category}, '', url);
        } catch (err) {
          console.log('URL update failed:', err);
        }
      };
    });
    
    // Check URL parameter on load
    try {
      var urlParams = new URLSearchParams(window.location.search);
      var categoryParam = urlParams.get('category');
      if (categoryParam) {
        filterPosts(categoryParam);
      }
    } catch (err) {
      console.log('URL parameter check failed:', err);
    }
    
    console.log('Category filter initialized successfully');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryFilter);
  } else {
    initCategoryFilter();
  }
  
  // Also try after a delay as backup
  setTimeout(initCategoryFilter, 500);
  setTimeout(initCategoryFilter, 1000);
})();

