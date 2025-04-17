// products-loader.js - Load and render product data

// Add debugging to identify loading issues
console.log('Products loader script initialized');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing products');
    
    // Remove any static product displays first to avoid duplication
    cleanupStaticProducts();
    
    // Initialize products display
    initializeProducts();
    
    // Initialize featured product section
    initializeFeaturedProduct();
    
    // Set up filter buttons
    setupFilterButtons();
    
    // Set up search functionality
    setupSearch();
    
    // Initialize product comparison
    initializeProductComparison();
});

// Function to remove any static products that might be in the HTML
function cleanupStaticProducts() {
    // Look for elements with organic-npk-plus or other product IDs that might be hardcoded
    const staticProducts = document.querySelectorAll('[data-id]');
    console.log('Found static products to clean up:', staticProducts.length);
    
    staticProducts.forEach(product => {
        // Only remove if it's not in our container
        const isInDynamicContainer = product.closest('#all-products-container');
        if (!isInDynamicContainer) {
            console.log('Removing static product:', product.getAttribute('data-id'));
            product.remove();
        }
    });
    
    // Also look for common product class names that might be static
    const productCards = document.querySelectorAll('.product-card:not([data-id])');
    console.log('Found product cards without data-id:', productCards.length);
    productCards.forEach(card => {
        const isInDynamicContainer = card.closest('#all-products-container');
        if (!isInDynamicContainer) {
            console.log('Removing product card without data-id');
            card.remove();
        }
    });
}

// Initialize Featured Product Section
function initializeFeaturedProduct() {
    const featuredProductContainer = document.getElementById('featured-product-container');
    
    // If container doesn't exist, return early
    if (!featuredProductContainer) return;
    
    // Find the featured product(s)
    const featuredProducts = productsData.filter(product => product.featured && product.new);
    
    if (featuredProducts.length > 0) {
        // Take the first featured product
        const featuredProduct = featuredProducts[0];
        featuredProductContainer.innerHTML = createFeaturedProductCard(featuredProduct);
    } else {
        // Hide the section if no featured product
        const featuredSection = document.getElementById('featured-product-section');
        if (featuredSection) {
            featuredSection.style.display = 'none';
        }
    }
}

function createFeaturedProductCard(product) {
    // Create star rating
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < product.rating) {
            stars += `
                <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>`;
        } else {
            stars += `
                <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>`;
        }
    }
    
    // Generate random testimonial for featured product
    const testimonials = [
        { name: "Rajesh Kumar", role: "Farmer, Tamil Nadu", text: "This product has completely transformed my crop yield!" },
        { name: "Anita Singh", role: "Commercial Grower", text: "I've noticed significant improvement in plant health since using this." },
        { name: "Vijay Patel", role: "Organic Farmer", text: "Perfect for organic farming needs. Highly recommended." }
    ];
    
    const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
    
    // Format product features
    const featuresList = product.details.features.map(feature => 
        `<li class="flex items-start mb-3">
            <svg class="w-5 h-5 text-brand-primary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>${feature}</span>
        </li>`
    ).join('');
    
    // Create badge
    const newBadge = product.new ? 
        `<div class="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase z-10">New</div>` : '';
    
    return `
        <div class="bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div class="grid md:grid-cols-2 gap-0">
                <div class="relative overflow-hidden group">
                    <div class="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300 group-hover:bg-opacity-5"></div>
                    ${newBadge}
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-6 px-6 opacity-90">
                        <span class="inline-block px-3 py-1 bg-brand-primary text-white text-xs font-medium rounded-full mb-2">
                            Featured Product
                        </span>
                        <h3 class="text-2xl font-bold text-white mb-1">${product.name}</h3>
                        <p class="text-gray-200 text-sm">${product.shortDescription}</p>
                    </div>
                </div>
                
                <div class="p-8">
                    <div class="inline-block px-3 py-1 bg-brand-light text-brand-primary text-sm font-medium rounded-full mb-3">
                        ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </div>
                    
                    <h3 class="text-2xl font-bold text-gray-800 mb-3">${product.name}</h3>
                    
                    <p class="text-gray-600 mb-6">${product.details.fullDescription}</p>
                    
                    <div class="mb-6">
                        <h4 class="text-gray-700 font-semibold mb-3">Key Features:</h4>
                        <ul class="text-gray-600 text-sm">
                            ${featuresList}
                        </ul>
                    </div>
                    
                    <div class="flex items-center mb-6">
                        <div class="flex mr-2">
                            ${stars}
                        </div>
                        <span class="text-gray-600 text-sm">${product.reviews} verified reviews</span>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg mb-6">
                        <div class="flex items-start">
                            <svg class="h-8 w-8 text-brand-primary mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                            </svg>
                            <div>
                                <p class="text-gray-600 italic text-sm mb-2">"${randomTestimonial.text}"</p>
                                <p class="text-gray-700 font-medium text-sm">${randomTestimonial.name}</p>
                                <p class="text-gray-500 text-xs">${randomTestimonial.role}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex space-x-4">
                        <a href="product-details.html?id=${product.id}" class="flex-1 bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors shadow-md hover:shadow-lg text-center font-medium">
                            View Details
                        </a>
                        <a href="enquiry.html?product=${product.id}" class="flex-1 border-2 border-brand-primary text-brand-primary px-6 py-3 rounded-lg hover:bg-brand-primary hover:text-white transition-colors text-center font-medium">
                            Enquire Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initializeProducts() {
    // Get containers
    const allProductsContainer = document.getElementById('all-products-container');
    
    console.log('Initializing products - containers:', {
        allProductsContainer: !!allProductsContainer
    });
    
    // If container doesn't exist, return early
    if (!allProductsContainer) return;
    
    // Clear container
    allProductsContainer.innerHTML = '';
    
    // Render all products
    console.log('Loading all products:', productsData.length);
    
    productsData.forEach(product => {
        allProductsContainer.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-id', product.id);
    
    // Create new badge if product is new
    const newBadge = product.new ? 
        `<div class="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase">New</div>` : '';
    
    // Create discount badge if applicable (15% OFF example)
    const discountBadge = product.discount ? 
        `<div class="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">${product.discount}% OFF</div>` : '';
    
    // Create star rating
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < product.rating) {
            stars += `
                <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>`;
        } else {
            stars += `
                <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>`;
        }
    }
    
    // Show original price if there's a discount
    let priceDisplay = `<span class="text-brand-primary font-bold text-lg">Contact for pricing</span>`;
    if (product.originalPrice) {
        priceDisplay = `
            <div>
                <span class="text-brand-primary font-bold text-lg">Contact for pricing</span>
            </div>
        `;
    }
    
    // Add category badge
    const categoryBadge = `
        <div class="inline-block px-2 py-1 bg-brand-light text-brand-primary text-xs font-medium rounded-full mb-2">
            ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
    `;
    
    card.innerHTML = `
        <div class="relative bg-white flex items-center justify-center h-48 w-full overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="object-contain h-full w-full transition-transform duration-500 hover:scale-110">
            ${newBadge}
            ${discountBadge}
            <button class="quick-view-button absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 text-brand-primary text-xs font-bold px-3 py-2 rounded-full uppercase shadow-md hover:bg-brand-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100" data-product-id="${product.id}">
                Quick View
            </button>
        </div>

        <div class="p-6">
            ${categoryBadge}
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-4">${product.shortDescription}</p>
            <div class="flex items-center mb-4">
                ${stars}
                <span class="text-gray-500 text-sm ml-2">${product.reviews || Math.floor(Math.random() * 200) + 50} reviews</span>
            </div>
            <div class="flex justify-between items-center">
                ${priceDisplay}
                <div class="flex space-x-2">
                    <a href="product-details.html?id=${product.id}" class="btn-learn-more text-sm">
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Enquire →
                        </span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add event listener for quick view button
    const quickViewButton = card.querySelector('.quick-view-button');
    if (quickViewButton) {
        quickViewButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            openQuickViewModal(product.id);
        });
    }
    
    // Make entire image area clickable for quick view
    const imageContainer = card.querySelector('.relative');
    if (imageContainer) {
        imageContainer.classList.add('group', 'cursor-pointer');
        imageContainer.addEventListener('click', () => {
            openQuickViewModal(product.id);
        });
    }
    
    return card;
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.product-filter');
    if (!filterButtons.length) return;
    
    // Count products in each category
    const categoryCounts = {};
    categoryCounts['all'] = productsData.length;
    
    productsData.forEach(product => {
        if (!categoryCounts[product.category]) {
            categoryCounts[product.category] = 0;
        }
        categoryCounts[product.category]++;
    });
    
    // Add count badges to filter buttons
    filterButtons.forEach(button => {
        const category = button.getAttribute('data-category') || 'all';
        const count = categoryCounts[category] || 0;
        
        // Create and append count badge
        const badge = document.createElement('span');
        badge.className = 'ml-1.5 bg-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded-full transition-colors';
        badge.textContent = count;
        button.appendChild(badge);
        
        // Set up click event with enhanced animations
        button.addEventListener('click', function() {
            // Get category from data attribute
            const category = this.getAttribute('data-category') || 'all';
            
            // Don't reapply filter if it's already active
            if (this.classList.contains('active')) return;
            
            // Update active state for all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.classList.contains('bg-brand-primary')) {
                    btn.classList.remove('bg-brand-primary');
                    btn.classList.remove('text-white');
                    btn.classList.add('text-brand-primary');
                    btn.classList.add('border-gray-300');
                    btn.classList.add('bg-white');
                    
                    // Reset badge style
                    const btnBadge = btn.querySelector('span');
                    if (btnBadge) {
                        btnBadge.className = 'ml-1.5 bg-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded-full transition-colors';
                    }
                }
            });
            
            // Add active styles to clicked button
            this.classList.add('active');
            this.classList.add('bg-brand-primary');
            this.classList.add('text-white');
            this.classList.remove('text-brand-primary');
            this.classList.remove('border-gray-300');
            this.classList.add('border-brand-primary');
            
            // Update badge style
            const thisBadge = this.querySelector('span');
            if (thisBadge) {
                thisBadge.className = 'ml-1.5 bg-white text-brand-primary text-xs px-1.5 py-0.5 rounded-full transition-colors';
            }
            
            // Filter products with animation
            const productCards = document.querySelectorAll('.product-card');
            let visibleCount = 0;
            
            productCards.forEach(card => {
                // Get the card's category
                const cardCategory = card.getAttribute('data-category');
                
                // Check if we should show this card
                const shouldShow = category === 'all' || cardCategory === category;
                
                // Apply animation and display change
                if (shouldShow) {
                    // Add a small delay based on position for staggered animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.display = 'block';
                    }, visibleCount * 50);
                    visibleCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Wait for animation to complete
                }
            });
            
            // Update header text with count
            const productsHeader = document.querySelector('#all-products h2');
            if (productsHeader) {
                const categoryName = category === 'all' ? 'All Products' : 
                    category.charAt(0).toUpperCase() + category.slice(1) + ' Products';
                
                productsHeader.textContent = categoryName;
                
                // Update subtitle with count
                const productsSubtitle = productsHeader.nextElementSibling;
                if (productsSubtitle) {
                    const count = categoryCounts[category] || 0;
                    productsSubtitle.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
                }
            }
        });
    });
    
    // Ensure product cards have proper transition styles
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

function setupSearch() {
    const searchInput = document.getElementById('product-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Show all products if search term is empty
        if (searchTerm === '') {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        // Filter products based on search term
        productsData.forEach(product => {
            const card = document.querySelector(`.product-card[data-id="${product.id}"]`);
            if (!card) return;
            
            if (
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            ) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Function to load and display product details on the product details page
function loadProductDetails() {
    // Get product ID from URL - check for both 'id' and 'product' parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || urlParams.get('product');
    
    if (!productId) return;
    
    // Find product in data
    const product = productsData.find(p => p.id === productId);
    
    if (!product) return;
    
    // Get container
    const productContent = document.getElementById('product-content');
    if (!productContent) return;
    
    // Clear loading placeholder
    productContent.innerHTML = '';
    
    // Find related products (same category or random if not enough)
    const relatedProducts = productsData
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, 3);
    
    // If we need more related products, add some random ones
    if (relatedProducts.length < 3) {
        const additionalProducts = productsData
            .filter(p => p.id !== productId && !relatedProducts.includes(p))
            .sort(() => 0.5 - Math.random())
            .slice(0, 3 - relatedProducts.length);
        
        relatedProducts.push(...additionalProducts);
    }
    
    // Load related products if container exists
    const relatedProductsContainer = document.getElementById('related-products');
    if (relatedProductsContainer) {
        relatedProductsContainer.innerHTML = '';
        relatedProducts.forEach(relatedProduct => {
            relatedProductsContainer.appendChild(createProductCard(relatedProduct));
        });
    }
    
    // Populate product details with enhanced UI
    productContent.innerHTML = `
        <div class="grid md:grid-cols-2 gap-12">
            <div>
                <div class="relative group overflow-hidden rounded-xl shadow-lg">
                    <img id="main-product-image" src="${product.image}" alt="${product.name}" class="w-full rounded-xl transform transition-transform duration-500 group-hover:scale-105">
                    ${product.new ? `<div class="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase z-10">New</div>` : ''}
                    ${product.discount ? `<div class="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">${product.discount}% OFF</div>` : ''}
                </div>
                
                <div class="grid grid-cols-4 gap-4 mt-6">
                    <div class="border-2 border-brand-primary rounded-lg overflow-hidden cursor-pointer" onclick="changeMainImage(this, '${product.image}')">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-20 object-cover">
                    </div>
                    <div class="border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-brand-primary transition-all duration-300" onclick="changeMainImage(this, '${product.image}?v=2')">
                        <img src="${product.image}?v=2" alt="${product.name}" class="w-full h-20 object-cover">
                    </div>
                    <div class="border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-brand-primary transition-all duration-300" onclick="changeMainImage(this, '${product.image}?v=3')">
                        <img src="${product.image}?v=3" alt="${product.name}" class="w-full h-20 object-cover">
                    </div>
                    <div class="border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-brand-primary transition-all duration-300" onclick="changeMainImage(this, '${product.image}?v=4')">
                        <img src="${product.image}?v=4" alt="${product.name}" class="w-full h-20 object-cover">
                    </div>
                </div>
                
            </div>
            
            <div>
                <div class="bg-white rounded-xl p-8 shadow-md">
                    <div class="inline-block px-3 py-1 bg-brand-light text-brand-primary text-sm font-medium rounded-full mb-4">
                        ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </div>
                
                    <h1 class="text-3xl font-bold text-gray-800 mb-4">${product.name}</h1>
                    
                    <div class="flex items-center mb-4">
                        <div class="flex mr-4">
                            ${createStarRating(product.rating)}
                        </div>
                        <span class="text-gray-600">(${product.reviews || Math.floor(Math.random() * 100) + 20} reviews)</span>
                    </div>
                    
                    ${product.originalPrice ? `
                        <div class="mb-6">
                            <p class="text-2xl font-bold text-brand-primary inline-block">Contact for pricing</p>
                        </div>
                    ` : `
                        <p class="text-2xl font-bold text-brand-primary mb-6">Contact for pricing</p>
                    `}
                    
                    <div class="mb-8 text-gray-700 leading-relaxed">
                        <p>${product.details.fullDescription}</p>
                    </div>
                    
                    <div class="flex flex-wrap gap-4 mb-8">
                        <button id="learn-more" class="btn-learn-more w-full flex items-center justify-center bg-brand-primary text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Enquire
                        </button>
                    </div>
                </div>
                
                <div class="mt-8">
                    <div class="border-b border-gray-200">
                        <nav class="flex -mb-px">
                            <button id="tab-features" class="tab-button active py-4 px-1 border-b-2 border-brand-primary font-medium text-brand-primary mr-8">
                                Features
                            </button>
                            <button id="tab-specifications" class="tab-button py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-brand-primary hover:border-brand-light mr-8">
                                Specifications
                            </button>
                            <button id="tab-benefits" class="tab-button py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-brand-primary hover:border-brand-light">
                                Benefits
                            </button>
                        </nav>
                    </div>
                    
                    <div id="tab-content-features" class="tab-content py-6">
                        <ul class="space-y-4">
                            ${product.details.features.map(feature => `
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 text-brand-primary mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    <span>${feature}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div id="tab-content-specifications" class="tab-content py-6 hidden">
                        <div class="bg-gray-50 rounded-lg p-6">
                            <dl class="space-y-4">
                                ${Object.entries(product.details.specifications).map(([key, value]) => `
                                    <div class="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                                        <dt class="text-gray-600 font-medium">${key}</dt>
                                        <dd class="text-gray-800">${value}</dd>
                                    </div>
                                `).join('')}
                            </dl>
                        </div>
                    </div>
                    
                    <div id="tab-content-benefits" class="tab-content py-6 hidden">
                        <ul class="space-y-4">
                            ${product.details.benefits.map(benefit => `
                                <li class="flex items-start">
                                    <svg class="w-5 h-5 text-brand-primary mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                                    </svg>
                                    <span>${benefit}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Set up tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all tabs
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'border-brand-primary', 'text-brand-primary');
                btn.classList.add('border-transparent', 'text-gray-500');
            });
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Activate clicked tab
            button.classList.add('active', 'border-brand-primary', 'text-brand-primary');
            button.classList.remove('border-transparent', 'text-gray-500');
            
            // Show corresponding content
            const tabId = button.id.replace('tab-', 'tab-content-');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
    
    // Setup "Enquire" button functionality
    const learnMoreBtn = document.getElementById('learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            // Immediately redirect to enquiry page with product info
            window.location.href = `enquiry.html?product=${product.id}`;
        });
    }
}

// Function to change the main product image
function changeMainImage(thumbnailElement, imageUrl) {
    // Update main image
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = imageUrl;
    }
    
    // Update thumbnail styling
    const allThumbnails = document.querySelectorAll('.border-2');
    allThumbnails.forEach(thumb => {
        thumb.classList.remove('border-brand-primary');
        thumb.classList.add('border-transparent');
    });
    
    thumbnailElement.classList.remove('border-transparent');
    thumbnailElement.classList.add('border-brand-primary');
}

// Helper function to create star rating HTML
function createStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += `
                <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>`;
        } else {
            stars += `
                <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>`;
        }
    }
    return stars;
}

// Call loadProductDetails if we're on the product details page
if (window.location.pathname.includes('product-details.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadProductDetails();
        
        // Get product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || urlParams.get('product');
        
        if (productId) {
            // Find product in data
            const product = productsData.find(p => p.id === productId);
            
            if (product) {
                // Update breadcrumb product name
                const breadcrumbProductName = document.getElementById('breadcrumb-product-name');
                if (breadcrumbProductName) {
                    breadcrumbProductName.textContent = product.name;
                }
                
                // Update document title
                document.title = `${product.name} - fertilizer.map`;
                
                // Add meta description
                let metaDescription = document.querySelector('meta[name="description"]');
                if (!metaDescription) {
                    metaDescription = document.createElement('meta');
                    metaDescription.setAttribute('name', 'description');
                    document.head.appendChild(metaDescription);
                }
                metaDescription.setAttribute('content', product.details.fullDescription.substring(0, 160));
            }
        }
    });
}

// Create or get the quick view modal
function getQuickViewModal() {
    let modal = document.getElementById('quick-view-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 opacity-0 pointer-events-none transition-opacity duration-300';
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        
        // Modal content
        modal.innerHTML = `
            <div class="relative bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-auto transform scale-95 transition-transform duration-300">
                <button id="quick-view-close" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div id="quick-view-content" class="p-6">
                    <div class="animate-pulse shimmer">
                        <div class="flex flex-col md:flex-row gap-8">
                            <div class="md:w-1/2">
                                <div class="h-80 bg-gray-200 rounded-lg"></div>
                            </div>
                            <div class="md:w-1/2">
                                <div class="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                                <div class="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
                                <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div class="h-4 bg-gray-200 rounded w-4/5 mb-6"></div>
                                <div class="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                                <div class="h-10 bg-gray-200 rounded w-full mb-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close button event
        const closeButton = modal.querySelector('#quick-view-close');
        closeButton.addEventListener('click', closeQuickViewModal);
        
        // Close on outside click
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeQuickViewModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('opacity-100')) {
                closeQuickViewModal();
            }
        });
    }
    
    return modal;
}

// Open quick view modal with product details
function openQuickViewModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const modal = getQuickViewModal();
    const content = modal.querySelector('#quick-view-content');
    
    // Show modal first with loading state
    modal.classList.add('opacity-100');
    modal.classList.remove('pointer-events-none');
    setTimeout(() => {
        modal.querySelector('.transform').classList.remove('scale-95');
        modal.querySelector('.transform').classList.add('scale-100');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Create star rating
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < product.rating) {
            stars += `
                <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>`;
        } else {
            stars += `
                <svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>`;
        }
    }
    
    // Format product features 
    const featuresList = product.details.features.map(feature => 
        `<li class="flex items-start mb-3">
            <svg class="w-5 h-5 text-brand-primary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>${feature}</span>
        </li>`
    ).join('');
    
    // Format product benefits
    const benefitsList = product.details.benefits.map(benefit => 
        `<li class="flex items-start mb-3">
            <svg class="w-5 h-5 text-brand-secondary mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
            </svg>
            <span>${benefit}</span>
        </li>`
    ).join('');
    
    // Populate modal content
    content.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="relative overflow-hidden rounded-lg mb-4 bg-gray-100 flex items-center justify-center">
                    <img src="${product.image}" alt="${product.name}" class="w-full object-contain max-h-80">
                    ${product.new ? `<div class="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">New</div>` : ''}
                </div>
                
                <div class="grid grid-cols-4 gap-4">
                    <div class="border-2 border-brand-primary rounded-lg overflow-hidden cursor-pointer">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-20 object-cover">
                    </div>
                    <div class="border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-brand-primary transition-all duration-300">
                        <img src="${product.image}?v=2" alt="${product.name}" class="w-full h-20 object-cover">
                    </div>
                    <div class="border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-brand-primary transition-all duration-300">
                        <img src="${product.image}?v=3" alt="${product.name}" class="w-full h-20 object-cover">
                    </div>
                    <div class="border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-brand-primary transition-all duration-300">
                        <img src="${product.image}?v=4" alt="${product.name}" class="w-full h-20 object-cover">
                    </div>
                </div>
            </div>
            
            <div class="md:w-1/2">
                <div class="inline-block px-3 py-1 bg-brand-light text-brand-primary text-sm font-medium rounded-full mb-3">
                    ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
                
                <h3 class="text-2xl font-bold text-gray-800 mb-3">${product.name}</h3>
                
                <p class="text-gray-600 mb-4">${product.details.fullDescription}</p>
                
                <div class="flex items-center mb-4">
                    <div class="flex mr-2">
                        ${stars}
                    </div>
                    <span class="text-gray-600 text-sm">${product.reviews} verified reviews</span>
                </div>
                
                <div class="mb-6">
                    <h4 class="text-gray-700 font-semibold mb-3">Key Features:</h4>
                    <ul class="text-gray-600 text-sm">
                        ${featuresList}
                    </ul>
                </div>
                
                <div class="mb-6">
                    <h4 class="text-gray-700 font-semibold mb-3">Benefits:</h4>
                    <ul class="text-gray-600 text-sm">
                        ${benefitsList}
                    </ul>
                </div>
                
                <div class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mt-6">
                    <a href="product-details.html?id=${product.id}" class="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors shadow-md hover:shadow-lg text-center font-medium">
                        View Full Details
                    </a>
                    <a href="enquiry.html?product=${product.id}" class="border-2 border-brand-primary text-brand-primary px-6 py-3 rounded-lg hover:bg-brand-primary hover:text-white transition-colors text-center font-medium">
                        Enquire Now
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Close quick view modal
function closeQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;
    
    // Animate out
    modal.querySelector('.transform').classList.remove('scale-100');
    modal.querySelector('.transform').classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0', 'pointer-events-none');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }, 200);
}

// Initialize Product Comparison
function initializeProductComparison() {
    // Create comparison bar if it doesn't exist
    createComparisonBar();
    
    // Add compare checkboxes to product cards
    addCompareCheckboxesToCards();
}

// Create comparison bar
function createComparisonBar() {
    // Check if comparison bar already exists
    if (document.getElementById('comparison-bar')) return;
    
    // Create comparison bar element
    const comparisonBar = document.createElement('div');
    comparisonBar.id = 'comparison-bar';
    comparisonBar.className = 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transform translate-y-full transition-transform duration-300 z-40';
    
    comparisonBar.innerHTML = `
        <div class="container mx-auto px-4 py-4">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center">
                    <h3 class="font-bold text-gray-800 mr-3">Compare Products:</h3>
                    <span id="comparison-count" class="bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full">0</span>
                </div>
                
                <div id="comparison-items" class="flex flex-wrap gap-3 flex-1 justify-center">
                    <!-- Selected products will appear here -->
                </div>
                
                <div class="flex items-center gap-3">
                    <button id="clear-comparison" class="text-gray-500 hover:text-gray-700 text-sm font-medium">
                        Clear All
                    </button>
                    <button id="compare-products" class="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                        Compare
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Append to body
    document.body.appendChild(comparisonBar);
    
    // Set up event listeners for comparison bar buttons
    document.getElementById('clear-comparison').addEventListener('click', clearComparison);
    document.getElementById('compare-products').addEventListener('click', showComparisonModal);
    
    // Initial state of compare button - disabled
    document.getElementById('compare-products').disabled = true;
}

// Add compare checkboxes to product cards
function addCompareCheckboxesToCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Get product ID
        const productId = card.getAttribute('data-id');
        
        // Create compare checkbox element
        const compareElement = document.createElement('div');
        compareElement.className = 'absolute top-4 left-4 z-10';
        compareElement.innerHTML = `
            <label class="flex items-center cursor-pointer">
                <input type="checkbox" class="compare-checkbox sr-only" data-product-id="${productId}">
                <div class="w-5 h-5 bg-white border-2 border-gray-300 rounded-sm flex items-center justify-center peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-colors">
                    <svg class="w-3 h-3 text-white opacity-0 compare-checkmark" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <span class="ml-2 text-xs text-white font-medium bg-gray-700 bg-opacity-70 px-2 py-0.5 rounded">Compare</span>
            </label>
        `;
        
        // Add to image container
        const imageContainer = card.querySelector('.relative');
        if (imageContainer) {
            imageContainer.appendChild(compareElement);
        }
        
        // Set up event listener for checkbox change
        const checkbox = compareElement.querySelector('.compare-checkbox');
        checkbox.addEventListener('change', function() {
            const checkmark = compareElement.querySelector('.compare-checkmark');
            
            if (this.checked) {
                checkmark.classList.remove('opacity-0');
                addProductToComparison(productId);
            } else {
                checkmark.classList.add('opacity-0');
                removeProductFromComparison(productId);
            }
        });
    });
}

// Global array to store selected product IDs for comparison
let productsToCompare = [];

// Add product to comparison
function addProductToComparison(productId) {
    // Check if product is already in comparison list
    if (productsToCompare.includes(productId)) return;
    
    // Check if comparison already has maximum products (4)
    if (productsToCompare.length >= 4) {
        alert('You can compare up to 4 products at a time. Please remove a product before adding another.');
        // Uncheck the checkbox
        const checkbox = document.querySelector(`.compare-checkbox[data-product-id="${productId}"]`);
        if (checkbox) checkbox.checked = false;
        return;
    }
    
    // Add product to comparison array
    productsToCompare.push(productId);
    
    // Find product data
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    // Create comparison item
    const comparisonItems = document.getElementById('comparison-items');
    const item = document.createElement('div');
    item.className = 'relative flex items-center bg-gray-100 rounded-lg p-2 pr-8';
    item.setAttribute('data-product-id', productId);
    
    item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-10 h-10 object-contain mr-2">
        <span class="text-xs font-medium text-gray-800 mr-2">${product.name}</span>
        <button class="remove-comparison-item absolute top-1 right-1 text-gray-400 hover:text-gray-600" data-product-id="${productId}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    `;
    
    comparisonItems.appendChild(item);
    
    // Add click event for remove button
    item.querySelector('.remove-comparison-item').addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        removeProductFromComparison(productId);
    });
    
    // Update count and show comparison bar
    updateComparisonBar();
}

// Remove product from comparison
function removeProductFromComparison(productId) {
    // Remove from array
    productsToCompare = productsToCompare.filter(id => id !== productId);
    
    // Remove from UI
    const item = document.querySelector(`#comparison-items [data-product-id="${productId}"]`);
    if (item) item.remove();
    
    // Uncheck checkbox
    const checkbox = document.querySelector(`.compare-checkbox[data-product-id="${productId}"]`);
    if (checkbox) {
        checkbox.checked = false;
        const checkmark = checkbox.closest('label').querySelector('.compare-checkmark');
        if (checkmark) checkmark.classList.add('opacity-0');
    }
    
    // Update comparison bar
    updateComparisonBar();
}

// Clear all products from comparison
function clearComparison() {
    // Clear array
    productsToCompare = [];
    
    // Clear UI
    document.getElementById('comparison-items').innerHTML = '';
    
    // Uncheck all checkboxes
    document.querySelectorAll('.compare-checkbox').forEach(checkbox => {
        checkbox.checked = false;
        const checkmark = checkbox.closest('label').querySelector('.compare-checkmark');
        if (checkmark) checkmark.classList.add('opacity-0');
    });
    
    // Update comparison bar
    updateComparisonBar();
}

// Update comparison bar UI
function updateComparisonBar() {
    const count = productsToCompare.length;
    
    // Update count
    document.getElementById('comparison-count').textContent = count;
    
    // Enable/disable compare button
    document.getElementById('compare-products').disabled = count < 2;
    
    // Show/hide comparison bar
    const comparisonBar = document.getElementById('comparison-bar');
    if (count > 0) {
        comparisonBar.classList.remove('translate-y-full');
    } else {
        comparisonBar.classList.add('translate-y-full');
    }
}

// Show comparison modal
function showComparisonModal() {
    if (productsToCompare.length < 2) return;
    
    // Get products data
    const products = productsToCompare.map(id => productsData.find(p => p.id === id)).filter(Boolean);
    
    // Create or get modal element
    let modal = document.getElementById('comparison-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'comparison-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 opacity-0 pointer-events-none transition-opacity duration-300';
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        
        document.body.appendChild(modal);
    }
    
    // Build comparison table
    let productColumns = '';
    products.forEach(product => {
        productColumns += `
            <div class="flex-1 p-4 bg-white">
                <div class="flex flex-col items-center mb-4">
                    <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-contain mb-2">
                    <h3 class="text-sm font-bold text-center">${product.name}</h3>
                    <div class="text-xs text-gray-500 mb-2">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                    <div class="flex mb-2">
                        ${createStarRating(product.rating)}
                    </div>
                    <a href="product-details.html?id=${product.id}" class="text-xs text-brand-primary hover:underline">View Details</a>
                </div>
            </div>
        `;
    });
    
    // Build attributes rows
    const attributes = [
        { name: 'Description', getValueFn: p => p.shortDescription },
        { name: 'Formulation', getValueFn: p => p.details.specifications['Formulation'] || 'N/A' },
        { name: 'Dosage', getValueFn: p => p.details.specifications['Dosage'] || 'N/A' },
        { name: 'Suitable For', getValueFn: p => p.details.specifications['Suitable For'] || 'N/A' },
        { name: 'Size', getValueFn: p => p.details.specifications['Size'] || 'N/A' }
    ];
    
    let attributeRows = '';
    attributes.forEach(attr => {
        let rowValues = '';
        products.forEach(product => {
            rowValues += `
                <div class="flex-1 p-4 border-t border-gray-200">
                    <div class="text-sm">${attr.getValueFn(product)}</div>
                </div>
            `;
        });
        
        attributeRows += `
            <div class="flex">
                <div class="w-32 p-4 bg-gray-100 border-t border-gray-200 font-medium text-sm">
                    ${attr.name}
                </div>
                ${rowValues}
            </div>
        `;
    });
    
    // Build features rows
    let featuresRow = '';
    let maxFeatures = 0;
    
    // Find max number of features
    products.forEach(product => {
        maxFeatures = Math.max(maxFeatures, product.details.features.length);
    });
    
    // Format features for each product
    let featureColumns = '';
    products.forEach(product => {
        let featuresList = '';
        for (let i = 0; i < maxFeatures; i++) {
            if (i < product.details.features.length) {
                featuresList += `
                    <li class="flex items-start mb-2">
                        <svg class="w-4 h-4 text-brand-primary mt-0.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="text-sm">${product.details.features[i]}</span>
                    </li>
                `;
            } else {
                featuresList += `<li class="h-6"></li>`;
            }
        }
        
        featureColumns += `
            <div class="flex-1 p-4 border-t border-gray-200">
                <ul>${featuresList}</ul>
            </div>
        `;
    });
    
    featuresRow = `
        <div class="flex">
            <div class="w-32 p-4 bg-gray-100 border-t border-gray-200 font-medium text-sm">
                Features
            </div>
            ${featureColumns}
        </div>
    `;
    
    // Fill modal content
    modal.innerHTML = `
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-auto transform scale-95 transition-transform duration-300 m-4">
            <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
                <h2 class="text-xl font-bold text-gray-800">Product Comparison</h2>
                <button id="close-comparison-modal" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="overflow-x-auto">
                <div class="comparison-table min-w-max">
                    <!-- Products header row -->
                    <div class="flex">
                        <div class="w-32 p-4 bg-gray-100"></div>
                        ${productColumns}
                    </div>
                    
                    <!-- Attribute rows -->
                    ${attributeRows}
                    
                    <!-- Features row -->
                    ${featuresRow}
                    
                    <!-- Action row -->
                    <div class="flex border-t border-gray-200">
                        <div class="w-32 p-4 bg-gray-100 font-medium text-sm">
                            Action
                        </div>
                        ${products.map(product => `
                            <div class="flex-1 p-4">
                                <a href="enquiry.html?product=${product.id}" class="block w-full bg-brand-primary text-white text-center px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors text-sm font-medium">
                                    Enquire Now
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    modal.classList.add('opacity-100');
    modal.classList.remove('pointer-events-none');
    setTimeout(() => {
        modal.querySelector('.transform').classList.remove('scale-95');
        modal.querySelector('.transform').classList.add('scale-100');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close button event
    const closeButton = modal.querySelector('#close-comparison-modal');
    closeButton.addEventListener('click', () => {
        // Animate out
        modal.querySelector('.transform').classList.remove('scale-100');
        modal.querySelector('.transform').classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0', 'pointer-events-none');
            
            // Restore body scroll
            document.body.style.overflow = '';
        }, 200);
    });
} 