// Mobile menu functionality
const initMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenPath = document.getElementById('menu-open');
    const menuClosePath = document.getElementById('menu-close');

    if (!mobileMenuBtn || !mobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }

    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        
        // Toggle menu visibility
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.add('menu-open');
                mobileMenu.classList.remove('menu-closed');
            }, 10);
        } else {
            mobileMenu.classList.add('menu-closed');
            mobileMenu.classList.remove('menu-open');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }

        // Toggle menu icons
        menuOpenPath.classList.toggle('hidden');
        menuClosePath.classList.toggle('hidden');
        
        // Toggle body scroll
        document.body.classList.toggle('overflow-hidden');
    };

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking on links
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Close menu on resize if screen becomes larger than mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMenu();
        }
    });
};

// Initialize mobile menu when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// Smooth scroll with performance optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Use requestAnimationFrame for smooth performance
            const targetPosition = target.offsetTop - 80; // Account for fixed header
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function for smooth animation
                const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                
                window.scrollTo(0, startPosition + distance * ease(progress));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Intersection Observer for lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px'
});

lazyImages.forEach(img => imageObserver.observe(img));

// Debounced scroll handler for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('nav');

        // Add/remove background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('bg-white/95', 'shadow-md');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white/95', 'shadow-md');
            navbar.classList.add('bg-transparent');
        }
    });
}, { passive: true });

// Form validation with better mobile UX
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Add touch feedback
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.add('touch-feedback');
        });
        
        input.addEventListener('blur', () => {
            input.classList.remove('touch-feedback');
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable form while submitting
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner mr-2"></span>Sending...';
        
        try {
            // Basic form validation
            const name = contactForm.querySelector('[name="name"]').value.trim();
            const email = contactForm.querySelector('[name="email"]').value.trim();
            const message = contactForm.querySelector('[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                throw new Error('Please fill in all fields');
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Please enter a valid email address');
            }
            
            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'text-brand-primary mt-4';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
            
        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'text-red-500 mt-4';
            errorMessage.textContent = error.message;
            contactForm.appendChild(errorMessage);
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    });
}

// Initialize AOS with performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        disable: window.innerWidth < 768 // Disable on mobile for better performance
    });
}); 