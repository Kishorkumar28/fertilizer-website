// products-loader.js - Load and render product data

// Add debugging to identify loading issues
console.log('Products loader script initialized');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing products');
    
    // Remove any static product displays first to avoid duplication
    cleanupStaticProducts();
    
    // Initialize products display
    initializeProducts();
    
    // Set up filter buttons
    setupFilterButtons();
    
    // Set up search functionality
    setupSearch();
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
        <div class="relative">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            ${newBadge}
            ${discountBadge}
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
    
    return card;
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.product-filter');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons without hiding them
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.classList.contains('bg-brand-primary')) {
                    btn.classList.remove('bg-brand-primary');
                    btn.classList.remove('text-white');
                    btn.classList.add('text-brand-primary');
                    btn.classList.add('border-gray-300');
                    btn.classList.add('bg-white');
                }
            });
            
            // Add active class to clicked button without hiding it
            this.classList.add('active');
            this.classList.add('bg-brand-primary');
            this.classList.add('text-white');
            this.classList.remove('text-brand-primary');
            this.classList.remove('border-gray-300');
            this.classList.add('border-brand-primary');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category') || 'all';
            
            // Filter products
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
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