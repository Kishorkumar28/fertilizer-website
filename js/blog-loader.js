// blog-loader.js - Load and render blog data

document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog display
    initializeBlog();
    
    // Set up filter buttons
    setupCategoryFilters();
    
    // Set up search functionality
    setupSearch();
    
    // Check if on blog details page
    if (window.location.pathname.includes('blog-details.html')) {
        loadBlogPost();
    }
});

function initializeBlog() {
    // Get containers
    const featuredContainer = document.querySelector('.featured-blog-container');
    const recentContainer = document.querySelector('.recent-blogs-container');
    
    if (!featuredContainer && !recentContainer) return;
    
    // Render featured blog post if container exists
    if (featuredContainer) {
        const featuredPost = blogData.find(post => post.featured);
        if (featuredPost) {
            renderFeaturedPost(featuredPost, featuredContainer);
        }
    }
    
    // Render recent blog posts if container exists
    if (recentContainer) {
        // Sort blog posts by date (newest first)
        const sortedPosts = [...blogData].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        
        // Exclude featured post from recent posts
        const recentPosts = sortedPosts.filter(post => !post.featured);
        
        // Render recent posts
        recentPosts.forEach(post => {
            recentContainer.appendChild(createBlogCard(post));
        });
    }
}

function renderFeaturedPost(post, container) {
    container.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden relative group" data-aos="fade-up">
            <div class="absolute inset-0 bg-gradient-to-r from-brand-primary/80 to-brand-dark/80 opacity-0 group-hover:opacity-75 transition-opacity duration-300 flex items-center justify-center z-10">
                <a href="blog-details.html?id=${post.id}" class="px-6 py-3 bg-white text-brand-primary font-bold rounded-full transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">Read Full Article</a>
            </div>
            <div class="md:flex">
                <div class="md:w-1/2 relative overflow-hidden">
                    <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute top-4 left-4 bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                        Featured
                    </div>
                </div>
                <div class="md:w-1/2 p-8">
                    <div class="uppercase tracking-wide text-sm text-brand-primary font-semibold flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                        ${post.category}
                    </div>
                    <h3 class="mt-2 text-2xl font-semibold text-gray-800 hover:text-brand-primary transition-colors">${post.title}</h3>
                    <p class="mt-4 text-gray-600">
                        ${post.excerpt}
                    </p>
                    <div class="mt-6 flex items-center">
                        <img class="h-10 w-10 rounded-full border-2 border-brand-light" src="${post.author.image}" alt="${post.author.name}">
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-900">${post.author.name}</p>
                            <p class="text-sm text-gray-500">${post.date} • ${post.readTime}</p>
                        </div>
                        <div class="ml-auto flex space-x-3">
                            <span class="text-gray-500 flex items-center text-sm">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                                </svg>
                                ${Math.floor(Math.random() * 2000) + 500}
                            </span>
                            <span class="text-gray-500 flex items-center text-sm">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                                </svg>
                                ${Math.floor(Math.random() * 50) + 5}
                            </span>
                        </div>
                    </div>
                    <div class="mt-6">
                        <a href="blog-details.html?id=${post.id}" class="inline-block bg-brand-primary text-white px-6 py-2 rounded-full hover:bg-brand-dark transition-colors transform hover:translate-x-2 duration-300 flex items-center">
                            Read More
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2';
    card.setAttribute('data-category', post.categorySlug);
    
    card.innerHTML = `
        <a href="blog-details.html?id=${post.id}" class="block">
            <div class="relative h-48 overflow-hidden">
                <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                <div class="absolute top-4 left-4 bg-${getCategoryColor(post.category)} text-${getCategoryTextColor(post.category)} text-xs font-bold px-2 py-1 rounded">
                    ${post.category}
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-800 hover:text-brand-primary transition-colors">${post.title}</h3>
                <p class="text-gray-600 mt-2 text-sm line-clamp-2">
                    ${post.excerpt.substring(0, 120)}${post.excerpt.length > 120 ? '...' : ''}
                </p>
                <div class="mt-4 flex items-center">
                    <img class="h-8 w-8 rounded-full border border-brand-light" src="${post.author.image}" alt="${post.author.name}">
                    <div class="ml-2">
                        <p class="text-xs font-medium text-gray-900">${post.author.name}</p>
                        <p class="text-xs text-gray-500">${post.date}</p>
                    </div>
                    <div class="ml-auto">
                        <span class="text-brand-primary hover:text-brand-dark text-sm flex items-center">
                            Read More
                            <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </a>
    `;
    
    return card;
}

function getCategoryColor(category) {
    const colors = {
        'Research & Innovation': 'brand-primary',
        'Soil Science': 'yellow-400',
        'Sustainable Farming': 'green-400',
        'Crop Management': 'blue-400',
        'Market Trends': 'purple-400',
        'Case Studies': 'orange-400'
    };
    
    return colors[category] || 'brand-primary';
}

function getCategoryTextColor(category) {
    const textColors = {
        'Research & Innovation': 'white',
        'Soil Science': 'yellow-900',
        'Sustainable Farming': 'green-900',
        'Crop Management': 'blue-900',
        'Market Trends': 'white',
        'Case Studies': 'orange-900'
    };
    
    return textColors[category] || 'white';
}

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.blog-category-filter');
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
            const category = this.getAttribute('data-category');
            
            // Filter blog posts
            const blogArticles = document.querySelectorAll('.blog-article');
            blogArticles.forEach(article => {
                if (category === 'all' || article.getAttribute('data-category') === category) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Show all blog posts if search term is empty
        if (searchTerm === '') {
            const blogArticles = document.querySelectorAll('.blog-article');
            blogArticles.forEach(article => {
                article.style.display = 'block';
            });
            return;
        }
        
        // Filter blog posts based on search term
        blogData.forEach(post => {
            const articles = document.querySelectorAll(`.blog-article[data-category="${post.categorySlug}"]`);
            if (!articles.length) return;
            
            articles.forEach(article => {
                if (
                    post.title.toLowerCase().includes(searchTerm) ||
                    post.excerpt.toLowerCase().includes(searchTerm) ||
                    post.category.toLowerCase().includes(searchTerm) ||
                    post.author.name.toLowerCase().includes(searchTerm)
                ) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
}

// Load blog post details on the blog details page
function loadBlogPost() {
    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) return;
    
    // Find post in data
    const post = blogData.find(p => p.id === postId);
    
    if (!post) return;
    
    // Update page title
    document.title = `${post.title} - fertilizer.map`;
    
    // Update article elements
    updateElement('article-title', post.title);
    updateElement('article-category', post.category);
    updateElement('article-content', post.content);
    updateElement('article-meta', `${post.date} • ${post.readTime}`);
    updateElement('author-name', post.author.name);
    
    // Update images
    updateImage('author-image', post.author.image, post.author.name);
    updateImage('article-image', post.image, post.title);
    
    // Load related posts
    loadRelatedPosts(post.categorySlug, post.id);
}

function updateElement(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = content;
    }
}

function updateImage(id, src, alt) {
    const image = document.getElementById(id);
    if (image) {
        image.src = src;
        image.alt = alt || '';
    }
}

function loadRelatedPosts(category, currentPostId) {
    const relatedContainer = document.querySelector('.related-posts-container');
    if (!relatedContainer) return;
    
    // Get related posts (same category, exclude current post)
    const relatedPosts = blogData
        .filter(p => p.categorySlug === category && p.id !== currentPostId)
        .slice(0, 2); // Limit to 2 posts
    
    // If not enough related posts, add random posts
    if (relatedPosts.length < 2) {
        const additionalPosts = blogData
            .filter(p => p.id !== currentPostId && !relatedPosts.some(rp => rp.id === p.id))
            .slice(0, 2 - relatedPosts.length);
        
        relatedPosts.push(...additionalPosts);
    }
    
    // Clear container
    relatedContainer.innerHTML = '';
    
    // Render related posts
    relatedPosts.forEach(post => {
        const relatedCard = document.createElement('a');
        relatedCard.href = `blog-details.html?id=${post.id}`;
        relatedCard.className = 'bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow';
        
        relatedCard.innerHTML = `
            <div class="relative h-48 overflow-hidden">
                <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute top-2 left-2 bg-${getCategoryColor(post.category)} text-${getCategoryTextColor(post.category)} text-xs font-bold px-2 py-1 rounded">${post.category}</div>
            </div>
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-800 group-hover:text-brand-primary transition-colors">${post.title}</h3>
                <p class="text-gray-600 mt-2 text-sm">${post.excerpt.substring(0, 80)}...</p>
            </div>
        `;
        
        relatedContainer.appendChild(relatedCard);
    });
} 