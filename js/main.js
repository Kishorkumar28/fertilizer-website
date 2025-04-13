// Main JavaScript file for fertilizer.map website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize counter animations
    initCounters();
    
    // Initialize AOS animations
    initAOS();
    
    // Initialize scroll effects
    initScrollEffects();
});

/**
 * Initialize mobile menu functionality with improved accessibility
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    mobileMenuButton.addEventListener('click', () => {
        // Get current aria-expanded state
        const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        
        // Toggle the attribute
        mobileMenuButton.setAttribute('aria-expanded', !expanded);
        mobileMenu.setAttribute('aria-hidden', expanded);
        
        // Toggle visual state
        if (expanded) {
            // Close menu
            mobileMenu.style.opacity = '0';
            mobileMenu.style.maxHeight = '0';
            setTimeout(() => {
                mobileMenu.classList.remove('open');
            }, 300);
        } else {
            // Open menu
            mobileMenu.classList.add('open');
            mobileMenu.style.opacity = '1';
            mobileMenu.style.maxHeight = '500px';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isMenuOpen = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnMenuButton = mobileMenuButton.contains(event.target);
        
        if (isMenuOpen && !isClickInsideMenu && !isClickOnMenuButton) {
            mobileMenuButton.click();
        }
    });
    
    // Add additional keyboard accessibility
    mobileMenu.addEventListener('keydown', function(event) {
        // Close on escape key
        if (event.key === 'Escape') {
            const isMenuOpen = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            if (isMenuOpen) {
                mobileMenuButton.click();
            }
        }
    });
}

/**
 * Initialize counter animations
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = entry.target;
                const target = parseInt(counterElement.dataset.target);
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    if (elapsedTime < duration) {
                        const progress = elapsedTime / duration;
                        const currentCount = Math.floor(progress * target);
                        counterElement.textContent = currentCount;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counterElement.textContent = target;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counterElement);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Initialize AOS animations
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: false,
            mirror: true,
            offset: 50,
            delay: 100,
            disable: 'mobile'
        });
    }
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const mobileMenuButton = document.getElementById('mobile-menu-button');
                if (mobileMenuButton && mobileMenuButton.getAttribute('aria-expanded') === 'true') {
                    mobileMenuButton.click();
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
} 