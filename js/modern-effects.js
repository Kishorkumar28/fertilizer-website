/**
 * Modern Effects - JS effects for fertilizer.map website
 * Handles animations, scroll effects, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize effects
  initScrollAnimations();
  initParallaxEffects();
  initHoverEffects();
  initBackgroundEffects();
  initMobileOptimizations();
  enhanceTextVisibility();
});

/**
 * Initialize scroll-based animations
 * Adds classes to elements when they enter the viewport
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (!animatedElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get the animation type from data attribute or use default
        const animationType = entry.target.dataset.animation || 'fade-in';
        entry.target.classList.add(`animate-${animationType}`);
        
        // If it's a one-time animation, unobserve after triggering
        if (entry.target.dataset.once !== 'false') {
          observer.unobserve(entry.target);
        }
      } else if (entry.target.dataset.once === 'false') {
        // If not a one-time animation, remove class when out of view
        const animationType = entry.target.dataset.animation || 'fade-in';
        entry.target.classList.remove(`animate-${animationType}`);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize parallax scrolling effects
 */
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (!parallaxElements.length) return;
  
  function updateParallax() {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const offsetY = scrollY * speed;
      element.style.transform = `translateY(${offsetY}px)`;
    });
  }
  
  // Initial update
  updateParallax();
  
  // Update on scroll with requestAnimationFrame for better performance
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Initialize hover effects for interactive elements
 */
function initHoverEffects() {
  // Magnetic buttons effect
  const magneticButtons = document.querySelectorAll('.magnetic-button');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate the distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const distanceX = x - centerX;
      const distanceY = y - centerY;
      
      // Apply a magnetic effect (subtle movement)
      this.style.transform = `translate(${distanceX / 10}px, ${distanceY / 10}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
      // Reset position when mouse leaves
      this.style.transform = 'translate(0, 0)';
    });
  });
  
  // Glow effect on hover
  const glowElements = document.querySelectorAll('.glow-on-hover');
  
  glowElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.classList.add('animate-glow');
    });
    
    element.addEventListener('mouseleave', function() {
      this.classList.remove('animate-glow');
    });
  });
}

/**
 * Create and animate background decorative elements
 */
function initBackgroundEffects() {
  // Add floating shapes to sections with the 'with-shapes' class
  const sectionsWithShapes = document.querySelectorAll('.with-shapes');
  
  sectionsWithShapes.forEach(section => {
    // Number of shapes to add
    const shapeCount = parseInt(section.dataset.shapeCount || 3);
    
    // Add each shape
    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      
      // Randomize appearance
      const size = Math.floor(Math.random() * 80) + 40; // 40-120px
      const isCircle = Math.random() > 0.5;
      
      // Style the shape
      shape.className = 'decoration-shape absolute';
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.backgroundColor = 'currentColor';
      shape.style.opacity = '0.05';
      shape.style.zIndex = '1';
      shape.style.borderRadius = isCircle ? '50%' : '30%';
      
      // Random position within the section
      shape.style.left = `${Math.random() * 90}%`;
      shape.style.top = `${Math.random() * 90}%`;
      
      // Add animation
      shape.style.animation = `float ${Math.random() * 5 + 10}s infinite ease-in-out ${Math.random() * 5}s`;
      
      // Add to section
      section.appendChild(shape);
    }
  });
}

/**
 * Optimize for mobile devices
 */
function initMobileOptimizations() {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Simplify animations on mobile for better performance
    document.querySelectorAll('.bg-pulse, .decoration-shape').forEach(el => {
      el.style.animation = 'none';
    });
    
    // Make sure navigation links are large enough for tapping
    document.querySelectorAll('nav a, button').forEach(el => {
      if (parseInt(window.getComputedStyle(el).height) < 44) {
        el.style.minHeight = '44px';
        el.style.minWidth = '44px';
      }
    });
  }
}

/**
 * Enhance text visibility and readability
 */
function enhanceTextVisibility() {
  // Ensure good contrast between text and background
  document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span').forEach(el => {
    const style = window.getComputedStyle(el);
    const color = style.color;
    const bgColor = getBackgroundColor(el);
    
    // If the element has transparent background, we're looking at parents
    if (isColorTransparent(bgColor) && !(el.tagName === 'SPAN' && el.parentElement.tagName === 'BUTTON')) {
      // Find the first non-transparent parent
      let parent = el.parentElement;
      let parentBg = getBackgroundColor(parent);
      
      while (isColorTransparent(parentBg) && parent.tagName !== 'BODY') {
        parent = parent.parentElement;
        parentBg = getBackgroundColor(parent);
      }
      
      // If we have a valid background from a parent
      if (!isColorTransparent(parentBg)) {
        // Check contrast and apply a text shadow for better legibility if needed
        if (needsTextEnhancement(color, parentBg)) {
          el.style.textShadow = '0 1px 1px rgba(0,0,0,0.1)';
        }
      }
    }
  });
}

/**
 * Get background color of an element
 */
function getBackgroundColor(el) {
  return window.getComputedStyle(el).backgroundColor;
}

/**
 * Check if a color is transparent
 */
function isColorTransparent(color) {
  return color === 'transparent' || color === 'rgba(0, 0, 0, 0)';
}

/**
 * Check if text needs enhancement based on color contrast
 * This is a simplified check - a full WCAG check would be more complex
 */
function needsTextEnhancement(textColor, bgColor) {
  // Extract RGB from color strings
  const textRGB = extractRGB(textColor);
  const bgRGB = extractRGB(bgColor);
  
  if (!textRGB || !bgRGB) return false;
  
  // Calculate perceived brightness difference
  const textBrightness = (textRGB.r * 299 + textRGB.g * 587 + textRGB.b * 114) / 1000;
  const bgBrightness = (bgRGB.r * 299 + bgRGB.g * 587 + bgRGB.b * 114) / 1000;
  
  // If the difference is low, enhancement may be needed
  return Math.abs(textBrightness - bgBrightness) < 100;
}

/**
 * Extract RGB values from a color string
 */
function extractRGB(color) {
  // Handle different color formats
  if (color.startsWith('rgb')) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10)
      };
    }
  } else if (color.startsWith('#')) {
    let hex = color.substring(1);
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }
  return null;
} 