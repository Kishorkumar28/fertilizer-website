document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: window.innerWidth < 768 // Disable on mobile for better performance
        });
    } else {
        console.warn('AOS library not loaded');
    }
    
    // Memory optimization using IIFE
    (function() {
        const MEMORY_CHECK_INTERVAL = 30000; // 30 seconds
        const MAX_MEMORY_THRESHOLD = 300; // MB
        // const CLEANUP_THRESHOLD = 0.7; // 70% of max memory (unused)
        
        const memoryManager = {
            checkInterval: 30000, // Check every 30 seconds
            maxMemoryThreshold: 300, // MB
            observers: new Set(),
            timeouts: new Set(),
            intervals: new Set(),
            lastMemoryCheck: 0,
            cleanupInProgress: false,
            
            init() {
                const intervalId = setInterval(() => this.checkMemory(), this.checkInterval);
                this.intervals.add(intervalId); // Track interval
                window.addEventListener('beforeunload', () => this.cleanup());
            },
            
            estimateMemoryUsage() {
                if (window.performance && window.performance.memory) {
                    return window.performance.memory.usedJSHeapSize / (1024 * 1024);
                }
                return 0;
            },
            
            checkMemory() {
                const currentTime = Date.now();
                if (currentTime - this.lastMemoryCheck < this.checkInterval) return;
                
                this.lastMemoryCheck = currentTime;
                const memoryUsage = this.estimateMemoryUsage();
                
                if (memoryUsage > this.maxMemoryThreshold) {
                    this.triggerCleanup();
                }
            },
            
            triggerCleanup() {
                if (this.cleanupInProgress) return;
                console.log('Triggering memory cleanup...');
                this.cleanupInProgress = true;
                
                try {
                    // Clean up video resources
                    const video = document.querySelector('#hero-video');
                    if (video) {
                        video.pause();
                        video.src = '';
                        video.load();
                        console.log('Video resources cleaned.');
                    }
                    
                    // Clean up unused DOM elements (be cautious with removal)
                    document.querySelectorAll('.hidden, [style*="display: none"]').forEach(el => {
                        if (!el.matches('#mobile-menu')) { 
                            // Optionally, just hide instead of removing to be safer
                            // el.style.display = 'none'; 
                            // el.remove(); // Use with caution
                        }
                    });
                    console.log('Hidden elements processed (not removed).');
                    
                    // Clean up observers
                    this.observers.forEach(observer => observer.disconnect());
                    this.observers.clear();
                    console.log('Observers cleaned.');
                    
                    // Clean up timeouts and intervals
                    this.timeouts.forEach(clearTimeout);
                    this.intervals.forEach(clearInterval);
                    this.timeouts.clear();
                    this.intervals.clear();
                    console.log('Timeouts and intervals cleared.');

                } catch (e) {
                    console.error('Memory cleanup error:', e);
                } finally {
                    this.cleanupInProgress = false;
                }
            },
            
            cleanup() {
                console.log('Running final cleanup before unload...');
                this.triggerCleanup();
                // Additional cleanup on page unload (risky, might interfere with browser cache)
                /*
                document.querySelectorAll('img').forEach(img => {
                    img.src = '';
                    img.removeAttribute('src');
                });
                console.log('Image sources cleared.');
                */
            }
        };
        
        // Initialize memory monitoring
        memoryManager.init();
    })();

    // Image loading optimization
    document.querySelectorAll('img').forEach(img => {
        if (!img.loading) {
            img.loading = 'lazy';
        }
        img.onerror = function() {
            this.style.display = 'none';
            console.error('Failed to load image:', this.src);
        };
        if (!img.getAttribute('width') || !img.getAttribute('height')) {
            // Avoid setting 0x0 dimensions; let browser handle if natural dimensions aren't available
            // img.width = img.naturalWidth || 0; 
            // img.height = img.naturalHeight || 0;
        }
    });
    
    // Optimize video loading (Initial Setup)
    const initialVideo = document.querySelector('#hero-video');
    if (initialVideo) {
        initialVideo.preload = 'metadata';
        initialVideo.setAttribute('playsinline', '');
        initialVideo.setAttribute('muted', '');
        initialVideo.setAttribute('loop', '');
    }

    // Video loading optimization script (Event Listeners)
    const video = document.getElementById('hero-video');
    if (video) {
        // Reduce initial load - set to lowest priority
        video.fetchpriority = "low";
        
        // More aggressive lazy loading - only start loading when close to viewport
        const videoPreloader = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // First just load metadata to save memory
                video.preload = "metadata";
                // Wait a moment before actually loading the video
                setTimeout(() => {
                    // Only actually load if page has been visible for a while
                    if (!document.hidden) {
                        video.preload = "auto";
                    }
                }, 1000);
                videoPreloader.disconnect();
            }
        }, { 
            rootMargin: '200px 0px', // Preload when within 200px
            threshold: 0
        });
        videoPreloader.observe(video);
        
        // Add error handling
        video.addEventListener('error', function() {
            console.error('Video failed to load');
            this.style.display = 'none';
            const gradientOverlay = document.querySelector('.absolute.inset-0.bg-gradient-to-r');
            if (gradientOverlay) {
                gradientOverlay.style.opacity = '1';
            }
        });
        
        // Reduce quality on mobile or if page is laggy
        const reduceVideoQuality = () => {
            // For mobile or laggy devices
            if (window.innerWidth <= 768 || 
                (performance.memory && performance.memory.usedJSHeapSize > 200000000)) {
                // Reduce playback rate more significantly
                video.playbackRate = 0.3;
                
                // Set lowest quality settings
                if (video.style.filter !== 'blur(1px)') {
                    video.style.transform = 'scale(1)';
                    video.style.filter = 'blur(1px)';
                    video.style.opacity = '0.8';
                    video.dataset.quality = 'low';
                    
                    // Make even more aggressive for very slow devices
                    if (performance.memory && performance.memory.usedJSHeapSize > 300000000) {
                        video.style.filter = 'blur(2px) brightness(0.9)';
                        video.playbackRate = 0.2;
                    }
                }
            }
        };
        
        // On initial play, check if we need to drop quality
        video.addEventListener('playing', function() {
            // Scale down for smoother playback
            video.playbackRate = 0.5;
            
            // Check if we need to reduce quality even more
            reduceVideoQuality();
            
            // Schedule periodic quality checks
            const qualityInterval = setInterval(reduceVideoQuality, 10000);
            // Store the interval for cleanup
            if (typeof cleanup !== 'undefined' && cleanup.intervals) {
                cleanup.intervals.add(qualityInterval);
            }
        }, { once: true });
        
        // Optimize video playback using requestVideoFrameCallback if available
        if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
            const rvfcCallback = () => {
                if (!video.paused) {
                    video.requestVideoFrameCallback(rvfcCallback);
                }
            };
            video.requestVideoFrameCallback(rvfcCallback);
        }
        
        // Handle tab visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (!video.paused) {
                    video.pause();
                }
            } else {
                // Check if element is in viewport before playing
                if (video.paused && isElementInViewport(video)) { 
                    video.play().catch(error => console.error("Error attempting to play video:", error));
                }
            }
        });
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Animation Initialization Script (Counters, Products, Gallery)
    window.appInitialized = window.appInitialized || {
        heroCounters: false,
        products: false,
        gallery: false,
        counters: false // Added flag for general counters
    };

    // Immediate counter initialization for stat counters in hero section
    function initHeroCounters() {
        if (window.appInitialized.heroCounters) return;
        window.appInitialized.heroCounters = true;
        console.log('Initializing Hero Counters...');

        document.querySelectorAll('.stat-counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            if (isNaN(target)) {
                 console.warn('Invalid target for stat counter:', counter);
                 return;
            }

            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                const currentValue = Math.floor(easedProgress * target);

                counter.textContent = currentValue + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                    counter.classList.add('animated', 'counter-finished');
                     console.log('Hero counter finished:', counter);
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    // Safe initialize for products
    function safeInitProducts() {
        if (window.appInitialized.products) return;
        const productsContainer = document.getElementById('featured-products');
        if (!productsContainer || typeof loadFeaturedProducts !== 'function') return;
        if (productsContainer.children.length > 0) {
             window.appInitialized.products = true;
             return;
        }
        try {
            loadFeaturedProducts();
            window.appInitialized.products = true;
        } catch(e) {
            console.error('Product initialization error:', e);
        }
    }

    // Safe initialize for gallery
    function safeInitGallery() {
        if (window.appInitialized.gallery) return;
        const galleryContainer = document.getElementById('featured-gallery');
        if (!galleryContainer || typeof loadGalleryImages !== 'function') return;
         if (galleryContainer.children.length > 0) {
             window.appInitialized.gallery = true;
             return;
         }
        try {
            loadGalleryImages();
            window.appInitialized.gallery = true;
        } catch(e) {
            console.error('Gallery initialization error:', e);
        }
    }
    
    // Initialize Hero Counters early if possible
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(initHeroCounters, 500); 
    } else {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initHeroCounters, 500));
    }

    // Add load event listener for other initializations
    window.addEventListener('load', function() {
        // Ensure hero counters are initialized if they weren't already
        initHeroCounters(); 
        
        // Initialize general counters if the function exists
        if (typeof initCounters === 'function' && !window.countersInitialized) {
            window.countersInitialized = true;
            initCounters();
        } 
        // Add a fallback just in case
        else if (!window.countersInitialized) { 
            window.countersInitialized = true;
            setTimeout(() => {
                document.querySelectorAll('.counter:not(.stat-counter)').forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        const target = parseInt(counter.getAttribute('data-target'));
                        if (!isNaN(target)) {
                           counter.textContent = target;
                           counter.classList.add('animated', 'counter-finished');
                        }
                    }
                });
            }, 1000);
        }
        
        // Refresh AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Initialize products and gallery after a delay
        setTimeout(() => {
            safeInitProducts();
            safeInitGallery();
        }, 800);
    });

    // Final safety check for products/gallery initialization
    setTimeout(() => {
        safeInitProducts();
        safeInitGallery();
    }, 3000);

    // Initialize number counters (general function)
    function initCounters() {
        if (window.appInitialized.counters) return; // Check flag
        window.appInitialized.counters = true; // Set flag
         console.log('Initializing General Counters...');

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Target .counter elements that are NOT .stat-counter (handled by initHeroCounters)
                    const counters = entry.target.querySelectorAll('.counter:not(.stat-counter)');
                    counters.forEach(counter => {
                        if (!counter.classList.contains('animated')) {
                            const target = parseInt(counter.getAttribute('data-target'));
                             if (isNaN(target)) return; // Skip if target is not a number
                             
                            const duration = 2000;
                            const startTime = performance.now();
                            counter.classList.add('animated');
                            
                            const updateCounter = (timestamp) => {
                                const elapsed = timestamp - startTime;
                                if (elapsed < duration) {
                                    const progress = elapsed / duration;
                                    const easedProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                                    const currentCount = Math.floor(easedProgress * target);
                                    counter.textContent = currentCount; // Suffix is handled by CSS
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    counter.textContent = target;
                                    counter.classList.add('counter-finished');
                                    console.log('General counter finished:', counter);
                                    // Optionally add parent animation class
                                    // counter.closest('[data-aos]')?.classList.add('counter-parent-finished');
                                }
                            };
                            requestAnimationFrame(updateCounter);
                        }
                    });
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                    console.log('Unobserved counter container:', entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe elements containing counters
        document.querySelectorAll('.counter:not(.stat-counter)').forEach(counter => {
            const container = counter.closest('[data-aos]') || counter.parentElement;
            if (container) {
                counterObserver.observe(container);
                 console.log('Observing counter container:', container);
            } else {
                 console.warn('Could not find container for counter:', counter);
            }
        });
    }
    // Call initCounters on DOMContentLoaded (already within the main listener)
    setTimeout(initCounters, 500); 

    // Product/Gallery Loading Functions (Moved from index.html)
    // Function to load featured products
    function loadFeaturedProducts() {
        const featuredProducts = productsData.filter(product => product.featured).slice(0, 3);
        const productContainer = document.getElementById('featured-products');
        
        featuredProducts.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden product-card-hover animate-float-medium';
            productCard.setAttribute('data-aos', 'fade-up');
            productCard.style.animationDelay = `${index * 0.2}s`;
            
            productCard.innerHTML = `
                <div class="h-48 overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform hover:scale-110 duration-500" loading="lazy">
                </div>
                <div class="p-6">
                    <div class="flex items-start justify-between">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">${product.name}</h3>
                        <div class="bg-brand-light rounded-full p-1 animate-pulse-soft">
                            <svg class="w-4 h-4 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-600">${product.shortDescription || product.description}</p>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="text-brand-primary font-bold">Contact for pricing</span>
                        <div class="flex items-center">
                            ${createStarRating(product.rating)}
                        </div>
                    </div>
                    <a href="product-details.html?product=${product.id}" class="mt-4 text-brand-primary font-semibold hover:text-brand-dark inline-flex items-center group">
                        Learn More 
                        <svg class="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                </div>
            `;
            
            productContainer.appendChild(productCard);
        });
    }

    // Function to load gallery images
    function loadGalleryImages() {
        // Get 3 random featured images from the gallery data
        const galleryImages = [...galleryData]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
            
        const galleryContainer = document.getElementById('featured-gallery');
        
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl group';
            galleryItem.setAttribute('data-aos', 'fade-up');
            galleryItem.setAttribute('data-aos-delay', index * 100);
            // galleryItem.style.animationDelay = `${index * 0.3}s`; // Redundant if AOS delay is used
            
            galleryItem.innerHTML = `
                <a href="gallery.html?image=${image.id}" class="block">
                    <div class="relative overflow-hidden h-64">
                        <img src="${image.fullImage}" alt="${image.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <span class="text-white text-sm font-medium px-4 py-2">${image.category}</span>
                        </div>
                    </div>
                    <div class="p-4 bg-white">
                        <h3 class="font-bold text-lg text-gray-800 group-hover:text-brand-primary transition-colors truncate">${image.title}</h3>
                        <p class="text-sm text-gray-600 truncate">${image.description}</p>
                    </div>
                </a>
            `;
            
            galleryContainer.appendChild(galleryItem);
        });
    }

    // Create star rating HTML
    function createStarRating(rating) {
        let stars = '';
        const normalizedRating = Math.max(0, Math.min(5, rating || 0));
        for (let i = 1; i <= 5; i++) {
            stars += `<svg class="w-4 h-4 ${i <= normalizedRating ? 'text-yellow-500' : 'text-gray-300'} fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>`;
        }
        return stars;
    }

    // Testimonials Functionality (Moved from index.html)
    document.addEventListener('DOMContentLoaded', function() {
        // Ensure testimonialsData is available from testimonials.js
        if (typeof testimonialsData === 'undefined') {
            console.warn('Testimonials data not loaded yet, using fallback data.');
            // Define fallback data if testimonials.js fails to load or is empty
            window.testimonialsData = [{
                id: 'testimonial-fallback',
                name: 'John Farmer',
                occupation: 'Farm Owner',
                location: 'Midwest, USA',
                rating: 5,
                text: 'Great fertilizer products that have helped my crops grow healthier and stronger. Highly recommended for all farmers.',
                cropType: 'Mixed Crops',
                date: new Date().toISOString().split('T')[0] // Use current date as fallback
            }];
        } else if (!testimonialsData || testimonialsData.length === 0) {
            console.error("Testimonial data is empty! Using fallback.");
            window.testimonialsData = [{
                id: 'testimonial-fallback',
                name: 'Satisfied Customer',
                occupation: 'Grower',
                location: 'Local Area',
                rating: 4,
                text: 'Good products, reliable service.',
                cropType: 'Various',
                date: new Date().toISOString().split('T')[0]
            }];
        }

        // Initialize testimonials
        let currentTestimonialIndex = 0;
        const testimonialTextEl = document.getElementById('testimonial-text');
        const testimonialNameEl = document.getElementById('testimonial-name');
        const testimonialOccupationEl = document.getElementById('testimonial-occupation');
        const testimonialLocationEl = document.getElementById('testimonial-location');
        const testimonialCropTypeEl = document.getElementById('testimonial-crop-type');
        const testimonialDateEl = document.getElementById('testimonial-date');
        const testimonialInitialsEl = document.getElementById('testimonial-initials');
        const starsContainer = document.getElementById('testimonial-stars');
        const indicatorsContainer = document.getElementById('testimonial-indicators');
        const prevButton = document.getElementById('prev-testimonial');
        const nextButton = document.getElementById('next-testimonial');
        let testimonialInterval;

        // Function to generate initials from name
        function getInitials(name) {
            if (!name) return '';
            return name.split(' ')
                .map(word => word.charAt(0))
                .join('')
                .toUpperCase();
        }

        // Function to format date
        function formatDate(dateString) {
            if (!dateString) return '';
            const options = { year: 'numeric', month: 'short' };
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', options);
            } catch (e) {
                console.error('Invalid date format:', dateString);
                return 'Date N/A';
            }
        }

        // Function to show testimonial by index
        function showTestimonial(index) {
            if (!testimonialsData || testimonialsData.length === 0) return;
            const testimonial = testimonialsData[index];

            // Safely update elements
            if(testimonialTextEl) testimonialTextEl.textContent = testimonial.text || 'No testimonial text available.';
            if(testimonialNameEl) testimonialNameEl.textContent = testimonial.name || 'Anonymous';
            if(testimonialOccupationEl) testimonialOccupationEl.textContent = testimonial.occupation || 'Customer';
            if(testimonialLocationEl) testimonialLocationEl.textContent = testimonial.location || 'Unknown Location';
            if(testimonialCropTypeEl) testimonialCropTypeEl.textContent = testimonial.cropType || 'General';
            if(testimonialDateEl) testimonialDateEl.textContent = formatDate(testimonial.date);
            if(testimonialInitialsEl) testimonialInitialsEl.textContent = getInitials(testimonial.name);

            // Update stars with animation
            if (starsContainer) {
                starsContainer.innerHTML = '';
                const rating = Math.max(0, Math.min(5, testimonial.rating || 0));
                for (let i = 0; i < 5; i++) {
                    const starWrapper = document.createElement('div');
                    starWrapper.classList.add('transform', 'transition-all', 'duration-300');
                    starWrapper.style.animationDelay = `${i * 0.1}s`;

                    const starSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    starSvg.setAttribute('class', 'w-6 h-6 mx-0.5');
                    starSvg.setAttribute('fill', 'currentColor');
                    starSvg.setAttribute('viewBox', '0 0 20 20');

                    const starPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    starPath.setAttribute('d', 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.828 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z');
                    starSvg.appendChild(starPath);

                    if (i < rating) {
                        starSvg.classList.add('text-yellow-400');
                        starWrapper.classList.add('animate-bounce');
                        starWrapper.style.animationDuration = '0.5s';
                    } else {
                        starSvg.classList.add('text-gray-300');
                    }

                    starWrapper.appendChild(starSvg);
                    starsContainer.appendChild(starWrapper);
                }
            }

            // Update indicators
            if (indicatorsContainer) {
                const indicators = indicatorsContainer.querySelectorAll('.testimonial-indicator');
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('bg-brand-primary', i === index);
                    indicator.classList.toggle('w-8', i === index);
                    indicator.classList.toggle('bg-gray-300', i !== index);
                    indicator.classList.toggle('w-3', i !== index);
                });
            }

            currentTestimonialIndex = index;

            // Apply fade-in animation
            const testimonialCard = document.querySelector('#testimonials .bg-white.rounded-2xl');
            if (testimonialCard) {
                testimonialCard.classList.remove('animate-fade-in'); // Reset animation
                void testimonialCard.offsetWidth; // Trigger reflow
                testimonialCard.classList.add('animate-fade-in');
            }
        }

        // Create indicators
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = ''; // Clear existing
            testimonialsData.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = `h-3 rounded-full testimonial-indicator transition-all duration-300 ${index === 0 ? 'bg-brand-primary w-8' : 'bg-gray-300 w-3'}`;
                indicator.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
                indicator.addEventListener('click', () => {
                     showTestimonial(index);
                     resetInterval(); // Reset interval on manual navigation
                });
                indicatorsContainer.appendChild(indicator);
            });
        }

        // Function to reset the auto-rotation interval
        const resetInterval = () => {
            clearInterval(testimonialInterval);
            testimonialInterval = setInterval(() => {
                let newIndex = currentTestimonialIndex + 1;
                if (newIndex >= testimonialsData.length) newIndex = 0;
                showTestimonial(newIndex);
            }, 8000);
        };

        // Add event listeners for navigation
        const updateTestimonial = (direction) => {
            let newIndex = currentTestimonialIndex + direction;
            if (newIndex < 0) newIndex = testimonialsData.length - 1;
            if (newIndex >= testimonialsData.length) newIndex = 0;
            showTestimonial(newIndex);
            resetInterval(); // Reset interval on manual navigation
        };

        if (prevButton) prevButton.addEventListener('click', () => updateTestimonial(-1));
        if (nextButton) nextButton.addEventListener('click', () => updateTestimonial(1));

        // Add fade-in animation CSS dynamically if not in CSS file
        // Note: Styles are better placed in CSS file
        // const style = document.createElement('style');
        // style.textContent = `@keyframes fadeIn { ... } .animate-fade-in { ... }`;
        // document.head.appendChild(style);

        // Initialize with the first testimonial
        showTestimonial(0);
        resetInterval(); // Start auto-rotation
    });

    // Background Video Handling (Moved from index.html)
    const heroVideo = document.getElementById('hero-video');
    let videoObserver;
    
    if (heroVideo) {
        // Optimize video loading and memory usage
        heroVideo.preload = 'metadata'; // Already set in JS, ensure consistency
        heroVideo.setAttribute('playsinline', ''); // Already set in JS
        
        // Start with normal speed (Handled by Intersection Observer now)
        // heroVideo.playbackRate = 1.0; 
        
        // Create Intersection Observer for video visibility
        // Check if isElementInViewport function exists, if not, define it
        if (typeof isElementInViewport === 'undefined') {
            window.isElementInViewport = function(el) {
                 if (!el) return false;
                 const rect = el.getBoundingClientRect();
                 return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                 );
             }
        }
        
        videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Play video when in viewport
                    if (heroVideo.paused) {
                        heroVideo.play()
                            .then(() => {
                                // Reset to normal speed on play
                                heroVideo.playbackRate = 1.0;
                                // Slow down after 4 seconds only if still playing
                                setTimeout(() => {
                                    if (!heroVideo.paused) {
                                        heroVideo.playbackRate = 0.5;
                                    }
                                }, 4000);
                            })
                            .catch(error => console.error("Video play error:", error));
                    }
                } else {
                    // Pause when out of viewport
                    if (!heroVideo.paused) {
                        heroVideo.pause();
                    }
                }
            });
        }, { 
            threshold: 0.2, // 20% visibility threshold
            rootMargin: '-10% 0px' // Trigger slightly before fully in view
        });
        
        // Start observing the video
        videoObserver.observe(heroVideo);
        
        // Handle video errors gracefully (Already added earlier, ensure no duplication)
        // heroVideo.addEventListener('error', function(e) { ... });
        
        // Memory optimization for video buffer (requestVideoFrameCallback) - Already added earlier
        // if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) { ... }
        
        // Clean up observer on page unload
        window.addEventListener('beforeunload', () => {
            if (videoObserver) {
                videoObserver.disconnect();
            }
            // Video element cleanup is handled by the memoryManager now
            // if (heroVideo) { ... }
        });
        
        // Handle tab visibility (Already added earlier, ensure no duplication)
        // document.addEventListener('visibilitychange', () => { ... });
    }

    // Performance Optimization Script Utilities & Listeners
    const cleanup = { // Centralized cleanup
        observers: new Set(),
        timeouts: new Set(),
        intervals: new Set(),
        eventListeners: new Set()
    };

    const performanceUtils = {
        debounce(func, wait) {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
                cleanup.timeouts.add(timeout);
            };
        },
        removeListener(element, event, handler, options = {}) {
            try {
                element.removeEventListener(event, handler, options);
                cleanup.eventListeners.forEach(listener => {
                    if (listener.element === element && listener.event === event && listener.handler === handler) {
                        cleanup.eventListeners.delete(listener);
                    }
                });
            } catch (e) { console.error('Error removing listener:', e); }
        },
        addListener(element, event, handler, options = {}) {
            element.addEventListener(event, handler, options);
            cleanup.eventListeners.add({ element, event, handler, options });
        },
        createObserver(callback, options = {}) {
            const observer = new IntersectionObserver(callback, {
                threshold: 0.2, // Default threshold
                rootMargin: '50px', // Default margin
                ...options
            });
            cleanup.observers.add(observer);
            return observer;
        }
    };

    // Example usage: Debounced AOS refresh on resize
    const debouncedAOSRefresh = performanceUtils.debounce(() => {
        if (typeof AOS !== 'undefined') AOS.refresh();
    }, 150);
    performanceUtils.addListener(window, 'resize', debouncedAOSRefresh, { passive: true });

    // Example usage: Cleanup animations after timeout
    const cleanupTimeout = setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.remove('aos-animate', 'aos-init');
            // Optionally remove AOS attributes if they interfere
            // el.removeAttribute('data-aos');
            // el.removeAttribute('data-aos-delay');
        });
        console.log('AOS animations potentially cleaned up after timeout.');
    }, 60000); // 60 seconds
    cleanup.timeouts.add(cleanupTimeout);

    // Handle page visibility changes
    performanceUtils.addListener(document, 'visibilitychange', () => {
        document.body.classList.toggle('performance-optimized', document.hidden);
    });

    // Centralized cleanup on page unload
    window.addEventListener('beforeunload', () => {
        console.log('Running comprehensive cleanup before unload...');
        cleanup.observers.forEach(observer => observer.disconnect());
        cleanup.timeouts.forEach(clearTimeout);
        cleanup.intervals.forEach(clearInterval);
        cleanup.eventListeners.forEach(({ element, event, handler, options }) => {
            try { element.removeEventListener(event, handler, options); }
            catch(e) { /* Ignore */ }
        });
        // Clear sets
        cleanup.observers.clear();
        cleanup.timeouts.clear();
        cleanup.intervals.clear();
        cleanup.eventListeners.clear();
        console.log('All tracked resources cleaned up.');
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.toggle('open'); // Toggle state
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
            
            // Toggle opacity and max-height for animation
            if (isOpen) {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
                mobileMenu.style.opacity = '1';
            } else {
                mobileMenu.style.maxHeight = '0';
                mobileMenu.style.opacity = '0';
            }
        });
    }

    // Logo Styling Script (assuming logo-styles.js is removed or integrated)
    // Add any specific logic from logo-styles.js here if needed.

    // Progressive Reveal Animation
    const elementsToReveal = document.querySelectorAll('#about p, #products p, #gallery-preview p, #testimonials p, #contact p');
    elementsToReveal.forEach((element, index) => {
        element.classList.add('reveal-on-scroll');
        element.style.transitionDelay = `${index * 0.05}s`; // Faster reveal
    });

    const revealObserver = performanceUtils.createObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
        revealObserver.observe(element);
    });

    // Function to add animated dots (Consider if really needed)
    /* 
    function addAnimatedDots() { ... }
    setTimeout(addAnimatedDots, 1500); // Delay further
    */

    // Video Optimization Script (VP9 handling, etc.)
    const heroVideoForOptimization = document.getElementById('hero-video');
    if (heroVideoForOptimization) {
        const videoOptimization = {
            vp9Settings: { complexity: 2, alphaQuality: 0.5, frameRate: 30 },
            maxFrameDrops: 5, frameDropCount: 0,
            init() {
                this.setVideoQuality();
                // this.monitorPerformance(); // Performance monitoring can be intensive
                this.handleMemory();
            },
            setVideoQuality() {
                 const canPlayVP9 = heroVideoForOptimization.canPlayType('video/webm; codecs="vp9"') === 'probably';
                 if (canPlayVP9) {
                    heroVideoForOptimization.setAttribute('data-vp9-optimized', 'true');
                    if (window.innerWidth <= 768) {
                        heroVideoForOptimization.playbackRate = Math.min(heroVideoForOptimization.playbackRate, 0.8); // Don't override if already slower
                        heroVideoForOptimization.setAttribute('data-quality', 'low');
                    } else {
                        // heroVideoForOptimization.playbackRate = 1.0; // Let IntersectionObserver handle initial rate
                        heroVideoForOptimization.setAttribute('data-quality', 'high');
                    }
                 }
            },
            monitorPerformance() { /* ... implementation ... */ },
            handleMemory() {
                const memoryCheckInterval = setInterval(() => {
                    if (window.performance && window.performance.memory) {
                        const memoryUsage = window.performance.memory.usedJSHeapSize / (1024 * 1024);
                        if (memoryUsage > 200) this.reduceQuality();
                    }
                }, 30000);
                cleanup.intervals.add(memoryCheckInterval); // Track interval
            },
            reduceQuality() {
                if (heroVideoForOptimization.getAttribute('data-quality') !== 'low') {
                    heroVideoForOptimization.playbackRate = Math.min(heroVideoForOptimization.playbackRate, 0.8);
                    heroVideoForOptimization.setAttribute('data-quality', 'low');
                    heroVideoForOptimization.style.transform = 'scale(1)'; // Adjust if needed
                    console.log('Reduced video quality due to memory/performance.');
                }
            },
            increaseQuality() { /* ... potentially restore quality ... */ }
        };
        videoOptimization.init();

        // Error handling (already added earlier)
        // Loading metadata handling
        heroVideoForOptimization.addEventListener('loadedmetadata', () => {
             // Let IntersectionObserver handle playback rate timing
        });
    }

    // Ensure Explore Products button keeps white text
    const exploreButton = document.querySelector('a[href="products.html"].magnetic-button.glow-on-hover');
    if (exploreButton) {
        exploreButton.style.color = 'white'; // Initial set
        const exploreObserver = new MutationObserver(() => {
            if (exploreButton.style.color !== 'white') {
                exploreButton.style.color = 'white';
            }
        });
        exploreObserver.observe(exploreButton, { attributes: true, attributeFilter: ['style', 'class'] });
        cleanup.observers.add(exploreObserver); // Track observer
    }

    // Ensure green buttons maintain white text on hover/focus
    const greenButtons = document.querySelectorAll('.bg-brand-primary, .bg-green-500, .bg-green-600, .bg-green-700, .bg-green-800, .bg-gradient-to-r.from-brand-primary, [class*="bg-brand-"], [class*="bg-green-"], .magnetic-button.glow-on-hover, .hover\\:bg-brand-primary, .hover\\:bg-green-500, .hover\\:bg-green-600');
    greenButtons.forEach(button => {
        if (button.tagName === 'A' || button.tagName === 'BUTTON' || button.classList.contains('btn') || button.classList.contains('magnetic-button')) {
            button.style.color = 'white'; // Initial set
            const buttonObserver = new MutationObserver(() => {
                 if (button.style.color !== 'white') {
                    button.style.color = 'white';
                }
            });
            buttonObserver.observe(button, { attributes: true, attributeFilter: ['style', 'class'] });
             cleanup.observers.add(buttonObserver); // Track observer
        }
    });

    // Script to ensure consistent text color for specific section labels
    const sectionLabelElements = document.querySelectorAll('.text-green-600, .text-brand-primary'); // Target both potential classes
    const sectionsToStyle = ['Success Stories', 'Featured Products', 'Why Choose Us', 'Our Purpose']; // Added 'Our Purpose'
    const brandedLabelClass = 'branded-section-label';

    sectionLabelElements.forEach(element => {
        const textContent = element.textContent.trim();
        if (sectionsToStyle.some(section => textContent === section || textContent.includes(section))) {
            // Ensure consistent class application
            element.classList.remove('text-green-600');
            element.classList.add('text-brand-primary', brandedLabelClass);
            if (element.classList.contains('bg-green-100')) {
                 element.classList.remove('bg-green-100');
                 element.classList.add('bg-brand-light/30');
            }
            // Ensure font-bold if it's the 'Our Purpose' badge
             if (textContent === 'Our Purpose') { 
                 element.classList.add('font-bold');
                 element.classList.remove('font-semibold');
             }

            // Add observer to maintain styling
            const labelObserver = new MutationObserver(() => {
                if (!element.classList.contains('text-brand-primary') || !element.classList.contains(brandedLabelClass)) {
                    element.classList.remove('text-green-600');
                    element.classList.add('text-brand-primary', brandedLabelClass);
                }
                 if (element.classList.contains('bg-green-100')) {
                    element.classList.remove('bg-green-100');
                    element.classList.add('bg-brand-light/30');
                 }
            });
            labelObserver.observe(element, { attributes: true, attributeFilter: ['class', 'style'] });
            cleanup.observers.add(labelObserver); // Track observer
        }
    });

    // Performance Optimization Script (Moved from index.html)
    // Define constants
    const ANIMATION_TIMEOUT = 60000; // 60 seconds
    const INTERSECTION_THRESHOLD = 0.2;
    const OBSERVER_ROOT_MARGIN = '50px';

    // Track initialized components (already defined, ensure consistency if needed)
    // const initialized = new Set(); 

    // Centralized cleanup tracking (already defined in main script)
    // const cleanup = { ... };

    // Performance optimization utilities (already defined in main script)
    // const performanceUtils = { ... };

    // Initialize performance optimizations within DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        // Ensure performanceUtils is available
        if (typeof performanceUtils === 'undefined') {
            console.error("performanceUtils is not defined. Performance optimizations may fail.");
            return; // Exit if utils are missing
        }
        
        // Optimize images (already done in main script, can be removed here if redundant)
        // document.querySelectorAll('img').forEach(img => { ... });
        
        // Optimize animations: Debounced AOS refresh
        const debouncedAOSRefresh = performanceUtils.debounce(() => {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 150);
        performanceUtils.addListener(window, 'resize', debouncedAOSRefresh, { passive: true });
        
        // Clean up animations after timeout (redundant if already in main script)
        // const cleanupTimeout = setTimeout(() => { ... }, ANIMATION_TIMEOUT);
        // cleanup.timeouts.add(cleanupTimeout);
        
        // Handle page visibility changes (redundant if already in main script)
        // document.addEventListener('visibilitychange', () => { ... });
    });

    // Cleanup on page unload (redundant if already in main script's beforeunload listener)
    // window.addEventListener('beforeunload', () => { ... });

    /**
     * Image optimization for better performance
     */
    const productImages = document.querySelectorAll('.product-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.setAttribute('src', src);
                    img.onload = () => {
                        img.classList.add('loaded');
                    };
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '200px 0px',
        threshold: 0.01
    });

    productImages.forEach(img => {
        // Store original src in data-src and use a placeholder
        if (!img.getAttribute('data-src') && img.getAttribute('src')) {
            img.setAttribute('data-src', img.getAttribute('src'));
            img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E');
            imageObserver.observe(img);
        }
    });

    // Disable animations when not visible
    const animatedSections = document.querySelectorAll('.animated-element, .section-content');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'opacity, transform';
            } else {
                entry.target.style.willChange = 'auto';
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });

    animatedSections.forEach(section => {
        animationObserver.observe(section);
    });

    // Cleanup observers on page unload
    window.addEventListener('beforeunload', () => {
        imageObserver.disconnect();
        animationObserver.disconnect();
    });

    // Optimize AOS animations for better performance
    AOS.init({
        // Less intensive settings for better performance
        duration: 600,
        easing: 'ease',
        once: true,         // Animation occurs only once
        mirror: false,      // No mirroring of animations when scrolling up
        anchorPlacement: 'top-bottom',
        disable: window.innerWidth < 768 ? true : false, // Disable on mobile
        throttleDelay: 99,  // Increase throttle delay for performance
    });
    
    // Performance optimization for counters
    initVisibilityBasedCounters();
    
    // Optimize scroll-based animations
    optimizeScrollHandlers();
    
    // Implement intersection observers for lazy content
    setupLazyContentLoading();
    
    // Optimize vision & mission section specifically
    optimizeVisionMissionSection();
});

// A more efficient counter animation that only triggers when visible
function initVisibilityBasedCounters() {
    const counterElements = document.querySelectorAll('.counter');
    
    // If no counters exist, exit early
    if (counterElements.length === 0) return;
    
    // Create an observer instance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                // Set the initial value directly without animation if target is small
                if (target <= 10) {
                    counter.innerText = target;
                    observer.unobserve(counter);
                    return;
                }
                
                // Start from the value already shown or 0
                let currentCount = parseInt(counter.innerText) || 0;
                
                // Only animate if needed
                if (currentCount < target) {
                    // Calculate duration based on target - faster for smaller numbers
                    const duration = Math.min(1500, Math.max(500, target * 10));
                    const increment = Math.ceil(target / (duration / 16)); // ~60fps
                    
                    // Use requestAnimationFrame for optimal performance
                    const updateCounter = () => {
                        currentCount += increment;
                        if (currentCount >= target) {
                            counter.innerText = target;
                            observer.unobserve(counter);
                        } else {
                            counter.innerText = currentCount;
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    requestAnimationFrame(updateCounter);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    // Observe all counter elements
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
}

// Optimize scroll event handlers to reduce layout thrashing
function optimizeScrollHandlers() {
    // Use passive listeners for better scroll performance
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Replace multiple scroll-related effects with a unified handler
    function scrollHandler() {
        // Use requestAnimationFrame to process scroll events at render time
        if (!window.scrollHandlerScheduled) {
            window.scrollHandlerScheduled = true;
            requestAnimationFrame(() => {
                // Process all scroll-based effects here
                window.scrollHandlerScheduled = false;
            });
        }
    }
}

// Setup lazy loading for content sections using Intersection Observer
function setupLazyContentLoading() {
    // Target heavy sections that should only render when needed
    const heavySections = document.querySelectorAll('.content-visibility-auto');
    
    if (heavySections.length === 0) return;
    
    const options = {
        rootMargin: '200px 0px', // Load content 200px before it comes into view
        threshold: 0.01
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Enable full rendering for visible sections
                entry.target.classList.add('content-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    heavySections.forEach(section => {
        observer.observe(section);
    });
}

// Specific optimizations for Vision & Mission section
function optimizeVisionMissionSection() {
    const visionSection = document.getElementById('vision-mission');
    if (!visionSection) return;
    
    // Optimize image loading
    const images = visionSection.querySelectorAll('img');
    images.forEach(img => {
        // Ensure all images have loading="lazy" attribute
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add decoding="async" for better rendering performance
        if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }
        
        // Set fetchpriority based on visibility
        if (!img.hasAttribute('fetchpriority')) {
            img.setAttribute('fetchpriority', 'low');
        }
        
        // Properly size images to prevent layout shifts
        img.onload = function() {
            img.classList.add('image-loaded');
        };
    });
    
    // Optimize animations by removing unnecessary ones
    const animatedElements = visionSection.querySelectorAll('[data-aos]');
    if (animatedElements.length > 5) {
        // If too many animations, only keep the most important ones
        let count = 0;
        animatedElements.forEach(el => {
            if (count > 4) {
                el.removeAttribute('data-aos');
                el.removeAttribute('data-aos-delay');
                el.removeAttribute('data-aos-duration');
            }
            count++;
        });
    }
}

// Animation Initialization Script (Moved from index.html)
// Flag to track initializations
window.appInitialized = window.appInitialized || {
    heroCounters: false,
    products: false,
    gallery: false
};

// Immediate counter initialization for stat counters in hero section
function initHeroCounters() {
    if (window.appInitialized.heroCounters) return;
    window.appInitialized.heroCounters = true;

    document.querySelectorAll('.stat-counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        
        // Animate the counter
        let startValue = 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function updateCounter(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smoother animation
            const easedProgress = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            const currentValue = Math.floor(easedProgress * target);
            counter.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
                counter.classList.add('animated', 'counter-finished');
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Safe initialize for products
function safeInitProducts() {
    if (window.appInitialized.products) return;
    
    const productsContainer = document.getElementById('featured-products');
    if (!productsContainer) return;
    
    // Check if products were already loaded
    if (productsContainer.children.length > 0) {
        window.appInitialized.products = true;
        return;
    }
    
    // Only try to initialize if the function exists and container is empty
    if (typeof loadFeaturedProducts === 'function') {
        try {
            loadFeaturedProducts();
            window.appInitialized.products = true;
        } catch(e) {
            console.log('Product initialization error:', e);
        }
    }
}

// Safe initialize for gallery
function safeInitGallery() {
    if (window.appInitialized.gallery) return;
    
    const galleryContainer = document.getElementById('featured-gallery');
    if (!galleryContainer) return;
    
    // Check if gallery was already loaded
    if (galleryContainer.children.length > 0) {
        window.appInitialized.gallery = true;
        return;
    }
    
    // Only try to initialize if the function exists and container is empty
    if (typeof loadGalleryImages === 'function') {
        try {
            loadGalleryImages();
            window.appInitialized.gallery = true;
        } catch(e) {
            console.log('Gallery initialization error:', e);
        }
    }
}

// Run immediately if possible
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initHeroCounters, 500);
} else {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initHeroCounters, 500);
    });
}

// Wait for both DOM and deferred scripts to be ready
window.addEventListener('load', function() {
    // Make sure hero counters are initialized
    initHeroCounters();
    
    // Ensure counter initialization runs after everything is loaded
    if (typeof initCounters === 'function' && !window.countersInitialized) {
        window.countersInitialized = true;
        initCounters();
    } else if (!window.countersInitialized) {
        // Fallback counter initialization if the main function isn't available
        window.countersInitialized = true;
        setTimeout(function() {
            // Manually initialize all counters
            document.querySelectorAll('.counter, .stat-counter').forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    counter.textContent = target + suffix;
                    counter.classList.add('animated', 'counter-finished');
                }
            });
        }, 1000);
    }
    
    // Ensure AOS animations are initialized
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Safely initialize products and gallery after a short delay
    setTimeout(function() {
        safeInitProducts();
        safeInitGallery();
    }, 800);
});

// Final safety check - if products/gallery weren't loaded by now, try one more time
setTimeout(function() {
    safeInitProducts();
    safeInitGallery();
}, 3000);

// Counter Animation Script (Moved from index.html)
// Initialize number counters
function initCounters() {
    // Add counter animation CSS dynamically if not already present in CSS file
    // Note: Styles are better placed in CSS file, this is just for consolidation example
    // const counterStyle = document.createElement('style');
    // counterStyle.textContent = `... CSS rules ...`;
    // document.head.appendChild(counterStyle);
    
    // Create an Intersection Observer for the counters
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When counter elements come into view
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter, .stat-counter');
                counters.forEach(counter => {
                    // Only animate if not already animated
                    if (!counter.classList.contains('animated')) {
                        const target = parseInt(counter.getAttribute('data-target'));
                        const suffix = counter.getAttribute('data-suffix') || '';
                        const duration = 2000; // animation duration in ms
                        const startTime = Date.now();
                        
                        // Mark as animated to prevent re-animation
                        counter.classList.add('animated');
                        
                        const updateCounter = () => {
                            const currentTime = Date.now();
                            const elapsedTime = currentTime - startTime;
                            
                            if (elapsedTime < duration) {
                                // Calculate the progress (0 to 1)
                                const progress = elapsedTime / duration;
                                
                                // Use custom easing function for smoother animation
                                // This easing starts slow, speeds up in the middle, and slows down at the end
                                const easedProgress = progress < 0.5
                                    ? 4 * progress * progress * progress
                                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                                
                                // Calculate the current count
                                const currentCount = Math.floor(easedProgress * target);
                                
                                // Update the counter text (suffix handled by CSS now)
                                counter.textContent = currentCount;
                                
                                // Continue animation
                                requestAnimationFrame(updateCounter);
                            } else {
                                // Ensure final value is exact
                                counter.textContent = target;
                                
                                // Add finished animation class
                                counter.classList.add('counter-finished');
                                
                                // Add parent animation for better visual effect
                                const parent = counter.parentElement;
                                if (parent) {
                                    parent.classList.add('counter-parent-finished');
                                }
                            }
                        };
                        
                        // Start the animation
                        requestAnimationFrame(updateCounter);
                    }
                });
                
                // Stop observing this element after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Lower threshold to start animation earlier
    
    // Observe counter elements
    document.querySelectorAll('.counter, .stat-counter').forEach(counter => {
        // Find parent element to observe
        const container = counter.closest('[data-aos]') || counter.parentElement;
        if (container) {
            counterObserver.observe(container);
        }
    });
}

// Initialize counters after DOM is loaded and with a small delay
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCounters, 500);
}); 