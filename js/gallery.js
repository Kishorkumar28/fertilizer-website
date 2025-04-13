// Gallery specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery Filtering
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    if (galleryFilters.length > 0) {
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Update active button
                galleryFilters.forEach(btn => {
                    btn.classList.remove('active', 'border-brand-primary', 'text-brand-primary');
                    btn.classList.add('border-gray-300');
                });
                this.classList.add('active', 'border-brand-primary', 'text-brand-primary');
                this.classList.remove('border-gray-300');
                
                // Filter items
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    const imgSrc = img.getAttribute('src');
                    const imgAlt = img.getAttribute('alt');
                    
                    lightboxImg.setAttribute('src', imgSrc);
                    lightboxImg.setAttribute('alt', imgAlt);
                    lightbox.classList.add('open');
                }
            });
        });
        
        if (closeLightbox) {
            closeLightbox.addEventListener('click', function() {
                lightbox.classList.remove('open');
            });
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('open');
            }
        });
    }
}); 