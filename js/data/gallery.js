// gallery.js - Data file for all gallery images
const galleryData = [
    {
        id: 1,
        title: "Organic Farming Field",
        category: "farming",
        thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Sustainable organic farming practices in action with rich soil beds ready for planting.",
        featured: true,
        date: "February 15, 2024",
        tags: ["organic", "farming", "soil"]
    },
    {
        id: 2,
        title: "Nutrient-Rich Compost",
        category: "fertilizer",
        thumbnail: "https://images.unsplash.com/photo-1581331474665-853ab4db0d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1581331474665-853ab4db0d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Nutrient-rich compost preparation for organic fertilizer production.",
        featured: false,
        date: "January 28, 2024",
        tags: ["compost", "organic", "fertilizer"]
    },
    {
        id: 3,
        title: "Soil Testing in the Lab",
        category: "research",
        thumbnail: "https://images.unsplash.com/photo-1582560475093-ba66accbc7f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1582560475093-ba66accbc7f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Our research team conducting comprehensive soil testing and analysis.",
        featured: true,
        date: "March 10, 2024",
        tags: ["research", "soil", "laboratory"]
    },
    {
        id: 4,
        title: "Fertilizer Application",
        category: "application",
        thumbnail: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Precision application of organic fertilizer on a commercial farm.",
        featured: false,
        date: "February 3, 2024",
        tags: ["application", "farming", "equipment"]
    },
    {
        id: 5,
        title: "Diverse Crop Rows",
        category: "farming",
        thumbnail: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Diverse crop rows showing healthy growth with our organic fertilizer solutions.",
        featured: true,
        date: "March 5, 2024",
        tags: ["crops", "farming", "diversity"]
    },
    {
        id: 6,
        title: "Worm Composting",
        category: "fertilizer",
        thumbnail: "https://images.unsplash.com/photo-1588131063271-0c4269ed3cf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1588131063271-0c4269ed3cf6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Vermiculture process creating nutrient-rich worm castings for our premium fertilizers.",
        featured: false,
        date: "January 15, 2024",
        tags: ["worms", "composting", "organic"]
    },
    {
        id: 7,
        title: "Soil Microbiome Study",
        category: "research",
        thumbnail: "https://images.unsplash.com/photo-1555704574-a9adf11abc1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1555704574-a9adf11abc1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Advanced research into soil microbiome for improved fertilizer formulations.",
        featured: false,
        date: "March 15, 2024",
        tags: ["microbiome", "research", "innovation"]
    },
    {
        id: 8,
        title: "Sustainable Packaging",
        category: "products",
        thumbnail: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1591289009723-aef0a1a8a211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Eco-friendly packaging used for our organic fertilizer products.",
        featured: false,
        date: "February 25, 2024",
        tags: ["packaging", "sustainable", "products"]
    },
    {
        id: 9,
        title: "Crop Yield Comparison",
        category: "results",
        thumbnail: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Side-by-side comparison showing increased crop yield with our fertilizers.",
        featured: true,
        date: "March 20, 2024",
        tags: ["results", "comparison", "yield"]
    },
    {
        id: 10,
        title: "Hydroponic Application",
        category: "application",
        thumbnail: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Specialized fertilizer solutions for modern hydroponic growing systems.",
        featured: false,
        date: "February 10, 2024",
        tags: ["hydroponics", "modern", "innovation"]
    },
    {
        id: 11,
        title: "Community Garden Project",
        category: "community",
        thumbnail: "https://images.unsplash.com/photo-1593114970899-95c26e8d8841?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1593114970899-95c26e8d8841?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Community garden project using our fertilizers for urban agriculture.",
        featured: false,
        date: "March 1, 2024",
        tags: ["community", "urban", "garden"]
    },
    {
        id: 12,
        title: "Agricultural Field Trials",
        category: "research",
        thumbnail: "https://images.unsplash.com/photo-1595085130066-6a6ae5b24ff3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
        fullImage: "https://images.unsplash.com/photo-1595085130066-6a6ae5b24ff3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=90",
        description: "Field trials evaluating the efficacy of our newest fertilizer formulations.",
        featured: false,
        date: "January 20, 2024",
        tags: ["trials", "research", "field-testing"]
    }
];

// Add new gallery images by simply adding new objects to the array above 