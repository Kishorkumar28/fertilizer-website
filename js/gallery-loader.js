// gallery-loader.js - Load and render gallery images

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery display
    initializeGallery();
    
    // Set up filter buttons
    setupCategoryFilters();
    
    // Set up search functionality
    setupSearch();
    
    // Set up lightbox functionality
    setupLightbox();
});

function initializeGallery() {
    // Get container
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    // Clear container
    galleryContainer.innerHTML = '';
    
    // Initialize gallery by first showing featured images
    const featuredImages = galleryData.filter(image => image.featured);
    const nonFeaturedImages = galleryData.filter(image => !image.featured);
    
    // Render featured images first, then non-featured
    [...featuredImages, ...nonFeaturedImages].forEach(image => {
        galleryContainer.appendChild(createGalleryItem(image));
    });
}

function createGalleryItem(image) {
    const item = document.createElement('div');
    item.className = 'gallery-item rounded-xl overflow-hidden group relative';
    item.setAttribute('data-category', image.category);
    item.setAttribute('data-id', image.id);
    
    const delay = Math.floor(Math.random() * 300); // Random delay for animation
    
    item.innerHTML = `
        <div class="relative overflow-hidden h-64" data-aos="fade-up" data-aos-delay="${delay}">
            <img 
                src="${image.thumbnail}" 
                alt="${image.title}" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 class="text-white font-semibold mb-1">${image.title}</h3>
                <p class="text-gray-200 text-sm">${image.description}</p>
                <div class="flex items-center mt-2">
                    <span class="text-xs uppercase tracking-wider bg-${getCategoryColor(image.category)} text-white px-2 py-1 rounded-full">${image.category}</span>
                    <span class="ml-auto text-gray-300 text-xs">${image.date}</span>
                </div>
            </div>
            <button class="lightbox-trigger absolute inset-0 w-full h-full cursor-pointer" data-image="${image.fullImage}" data-title="${image.title}" data-description="${image.description}">
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 text-brand-primary rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                    </svg>
                </div>
            </button>
        </div>
    `;
    
    // If it's a featured image, add a featured badge
    if (image.featured) {
        const badge = document.createElement('div');
        badge.className = 'absolute top-2 right-2 bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full z-10';
        badge.textContent = 'Featured';
        item.querySelector('.relative').appendChild(badge);
    }
    
    return item;
}

function getCategoryColor(category) {
    const colors = {
        'farming': 'green-500',
        'fertilizer': 'brand-primary',
        'research': 'blue-500',
        'application': 'yellow-500',
        'products': 'purple-500',
        'results': 'orange-500',
        'community': 'pink-500'
    };
    
    return colors[category] || 'brand-primary';
}

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons without hiding them
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.classList.contains('bg-brand-primary')) {
                    btn.classList.remove('bg-brand-primary');
                    btn.classList.remove('text-white');
                    btn.classList.add('border-gray-300');
                    btn.classList.add('text-gray-600');
                }
            });
            
            // Add active class to clicked button without hiding it
            this.classList.add('active');
            this.classList.add('bg-brand-primary');
            this.classList.add('text-white');
            this.classList.remove('border-gray-300');
            this.classList.add('border-brand-primary');
            this.classList.remove('text-gray-600');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category');
            
            // Filter gallery items
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('gallery-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Show all gallery items if search term is empty
        if (searchTerm === '') {
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.style.display = 'block';
            });
            return;
        }
        
        // Filter gallery items based on search term
        galleryData.forEach(image => {
            const item = document.querySelector(`.gallery-item[data-id="${image.id}"]`);
            if (!item) return;
            
            if (
                image.title.toLowerCase().includes(searchTerm) ||
                image.description.toLowerCase().includes(searchTerm) ||
                image.category.toLowerCase().includes(searchTerm) ||
                image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            ) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

function setupLightbox() {
    // Create lightbox elements if they don't exist
    if (!document.getElementById('gallery-lightbox')) {
        createLightboxElements();
    }
    
    // Get lightbox elements
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxPrev = document.getElementById('lightbox-prev');
    
    // Add event listeners to trigger buttons
    document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const image = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            const imageId = parseInt(this.closest('.gallery-item').getAttribute('data-id'));
            
            lightboxImage.src = image;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            lightbox.setAttribute('data-current-id', imageId);
            
            // Show lightbox
            lightbox.classList.remove('hidden');
            setTimeout(() => {
                lightbox.classList.add('opacity-100');
            }, 10);
            
            // Disable body scroll
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Next image
    lightboxNext.addEventListener('click', function() {
        const currentId = parseInt(lightbox.getAttribute('data-current-id'));
        const nextImage = getNextImage(currentId);
        
        if (nextImage) {
            lightboxImage.src = nextImage.fullImage;
            lightboxTitle.textContent = nextImage.title;
            lightboxDescription.textContent = nextImage.description;
            lightbox.setAttribute('data-current-id', nextImage.id);
        }
    });
    
    // Previous image
    lightboxPrev.addEventListener('click', function() {
        const currentId = parseInt(lightbox.getAttribute('data-current-id'));
        const prevImage = getPrevImage(currentId);
        
        if (prevImage) {
            lightboxImage.src = prevImage.fullImage;
            lightboxTitle.textContent = prevImage.title;
            lightboxDescription.textContent = prevImage.description;
            lightbox.setAttribute('data-current-id', prevImage.id);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('hidden')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            lightboxNext.click();
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev.click();
        }
    });
}

function createLightboxElements() {
    const lightbox = document.createElement('div');
    lightbox.id = 'gallery-lightbox';
    lightbox.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300 hidden';
    
    lightbox.innerHTML = `
        <div class="relative max-w-5xl w-full">
            <button id="lightbox-close" class="absolute -top-10 right-0 text-white hover:text-brand-primary transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            
            <div class="bg-white rounded-xl overflow-hidden shadow-2xl">
                <img id="lightbox-image" src="" alt="" class="w-full object-contain max-h-[calc(100vh-200px)]">
                <div class="p-6">
                    <h3 id="lightbox-title" class="text-xl font-bold text-gray-800 mb-2"></h3>
                    <p id="lightbox-description" class="text-gray-600"></p>
                </div>
            </div>
            
            <button id="lightbox-prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white/20 hover:bg-white/40 transition-colors text-white rounded-full p-2">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            
            <button id="lightbox-next" class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white/20 hover:bg-white/40 transition-colors text-white rounded-full p-2">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
}

function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    
    lightbox.classList.remove('opacity-100');
    setTimeout(() => {
        lightbox.classList.add('hidden');
    }, 300);
    
    // Enable body scroll
    document.body.style.overflow = '';
}

function getNextImage(currentId) {
    const currentIndex = galleryData.findIndex(image => image.id === currentId);
    const nextIndex = (currentIndex + 1) % galleryData.length;
    
    return galleryData[nextIndex];
}

function getPrevImage(currentId) {
    const currentIndex = galleryData.findIndex(image => image.id === currentId);
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    
    return galleryData[prevIndex];
} 