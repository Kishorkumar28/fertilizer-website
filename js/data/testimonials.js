// Testimonials data for fertilizer.map
const testimonialsData = [
    {
        id: 'testimonial-1',
        name: 'Michael Thompson',
        occupation: 'Farm Owner',
        location: 'Iowa, USA',
        rating: 5,
        text: 'Switching to GrowRich fertilizers was one of the best decisions I\'ve made for my farm. I\'ve seen a 25% increase in corn yield and significantly healthier soil after just two seasons.',
        cropType: 'Corn',
        date: '2023-05-15'
    },
    {
        id: 'testimonial-2',
        name: 'Sarah Johnson',
        occupation: 'Agricultural Consultant',
        location: 'California, USA',
        rating: 5,
        text: 'I\'ve recommended fertilizer.map products to dozens of my clients, and the results speak for themselves. Higher yields, better quality produce, and improved soil health across different crop types.',
        cropType: 'Mixed Crops',
        date: '2023-06-22'
    },
    {
        id: 'testimonial-3',
        name: 'David Rodriguez',
        occupation: 'Vineyard Manager',
        location: 'Napa Valley, USA',
        rating: 4,
        text: 'Their specialized vine fertilizer has improved both grape yield and quality. Our wines have never tasted better, and the organic certification helps with our marketing too.',
        cropType: 'Vineyard',
        date: '2023-08-10'
    },
    {
        id: 'testimonial-4',
        name: 'Maria Garcia',
        occupation: 'Organic Farmer',
        location: 'Oregon, USA',
        rating: 5,
        text: 'As an organic farmer, I\'m very selective about what goes into my soil. fertilizer.map products are truly sustainable and have helped us maintain our organic certification while increasing yields.',
        cropType: 'Vegetables',
        date: '2023-09-05'
    },
    {
        id: 'testimonial-5',
        name: 'James Wilson',
        occupation: 'Commercial Grower',
        location: 'Nebraska, USA',
        rating: 5,
        text: 'We\'ve been using their NPK blends across our 1,200-acre operation for the past year. The difference in crop health and yield is noticeable, and the cost-benefit ratio makes it a clear winner.',
        cropType: 'Wheat',
        date: '2023-11-18'
    }
];

// Function to add a new testimonial to the array
function addTestimonial(testimonial) {
    // Generate a unique ID
    const newId = 'testimonial-' + (testimonialsData.length + 1);
    
    // Create date if not provided
    const date = testimonial.date || new Date().toISOString().split('T')[0];
    
    // Add the new testimonial with ID and date
    const newTestimonial = {
        id: newId,
        date: date,
        ...testimonial
    };
    
    // Add to the array
    testimonialsData.push(newTestimonial);
    
    // Return the new testimonial
    return newTestimonial;
}

// Function to save testimonials data to localStorage
function saveTestimonialsToStorage() {
    try {
        localStorage.setItem('testimonialsData', JSON.stringify(testimonialsData));
    } catch (e) {
        console.warn('Could not save testimonials to localStorage:', e);
    }
}

// Function to load testimonials data from localStorage
function loadTestimonialsFromStorage() {
    try {
        const storedData = localStorage.getItem('testimonialsData');
        if (storedData) {
            // Merge existing testimonials with stored ones, avoiding duplicates by ID
            const storedTestimonials = JSON.parse(storedData);
            const existingIds = testimonialsData.map(t => t.id);
            
            storedTestimonials.forEach(testimonial => {
                if (!existingIds.includes(testimonial.id)) {
                    testimonialsData.push(testimonial);
                }
            });
        }
    } catch (e) {
        console.warn('Could not load testimonials from localStorage:', e);
    }
}

// Load any saved testimonials when the script loads
loadTestimonialsFromStorage(); 