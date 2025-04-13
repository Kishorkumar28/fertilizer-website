document.addEventListener('DOMContentLoaded', function() {
    // Set "All Products" as the default active filter
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    
    // Get all filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('product-search');
    const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
    const filterContainer = document.querySelector('.filter-container');
    
    // Add click event to each filter button
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Show/hide products based on filter
            products.forEach(product => {
                if (filter === 'all' || product.classList.contains(filter)) {
                    product.style.display = '';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            products.forEach(product => {
                const title = product.querySelector('.product-title').textContent.toLowerCase();
                const description = product.querySelector('.product-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    product.style.display = '';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
    
    // Mobile filter toggle
    if (mobileFilterToggle && filterContainer) {
        mobileFilterToggle.addEventListener('click', function() {
            filterContainer.classList.toggle('active');
            
            // Update toggle button text based on state
            if (filterContainer.classList.contains('active')) {
                mobileFilterToggle.textContent = 'Hide Filters';
            } else {
                mobileFilterToggle.textContent = 'Show Filters';
            }
        });
    }
}); 