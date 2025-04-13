// Blog specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // In a real implementation, you would load the article content based on URL parameters
    // For example: getArticleById(getUrlParam('id'));
    
    // Example implementation of URL parameter extraction
    function getUrlParam(param) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(param);
    }
    
    // Placeholder for article loading functionality
    function loadArticleContent(articleId) {
        // This would typically be an API call to fetch article data
        console.log("Loading article with ID:", articleId);
        // Then populate DOM elements with article data
    }
    
    // Handle comment form submission
    const commentForm = document.querySelector('form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const comment = document.getElementById('comment');
            if (comment && comment.value.trim()) {
                console.log("Comment submitted:", comment.value);
                // In a real implementation, you would send this to an API
                // Then add the comment to the DOM
                
                // Clear the form
                comment.value = '';
                
                // Show success message
                alert('Comment submitted successfully!');
            }
        });
    }
    
    // Handle share button clicks
    const shareButtons = document.querySelectorAll('button[class*="share"]');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simple share implementation
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                })
                .catch(console.error);
            } else {
                // Fallback
                console.log("Web Share API not supported");
                // Copy URL to clipboard instead
                navigator.clipboard.writeText(window.location.href)
                    .then(() => alert("Link copied to clipboard!"))
                    .catch(console.error);
            }
        });
    });
    
    // Blog category filtering
    const categoryFilters = document.querySelectorAll('.blog-category-filter');
    if (categoryFilters.length > 0) {
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryFilters.forEach(btn => {
                    btn.classList.remove('active', 'text-brand-primary');
                    btn.classList.add('text-gray-700');
                    btn.style.borderColor = '';
                });
                
                // Add active class to clicked button
                this.classList.add('active', 'text-brand-primary');
                this.classList.remove('text-gray-700');
                this.style.borderColor = '#1c9444';
                
                const category = this.getAttribute('data-category');
                const articles = document.querySelectorAll('.blog-article');
                
                if (category === 'all') {
                    articles.forEach(article => {
                        article.style.display = '';
                    });
                } else {
                    articles.forEach(article => {
                        if (article.getAttribute('data-category') === category) {
                            article.style.display = '';
                        } else {
                            article.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Blog search functionality
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const articles = document.querySelectorAll('.blog-article');
            const activeCategory = document.querySelector('.blog-category-filter.active');
            const activeCategoryValue = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
            
            if (searchTerm === '') {
                // Show all visible items based on current filter
                if (activeCategoryValue === 'all') {
                    articles.forEach(article => {
                        article.style.display = '';
                    });
                } else {
                    articles.forEach(article => {
                        if (article.getAttribute('data-category') === activeCategoryValue) {
                            article.style.display = '';
                        } else {
                            article.style.display = 'none';
                        }
                    });
                }
            } else {
                // Filter by search term within current filter selection
                articles.forEach(article => {
                    const articleText = article.textContent.toLowerCase();
                    const articleCategory = article.getAttribute('data-category');
                    
                    if (articleText.includes(searchTerm) && 
                        (activeCategoryValue === 'all' || articleCategory === activeCategoryValue)) {
                        article.style.display = '';
                    } else {
                        article.style.display = 'none';
                    }
                });
            }
        });
    }
}); 