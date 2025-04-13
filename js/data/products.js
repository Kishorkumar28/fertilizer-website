// products.js - Data file for all products
const productsData = [
    {
        id: "organic-npk-plus",
        name: "Organic NPK Plus",
        category: "organic",
        // price: "$29.99",
        // originalPrice: "$34.99",
        // discount: 15,
        reviews: 189,
        rating: 5,
        image: "image/Products/Organic_NPK_Plus.jpg",
        description: "Our premium organic NPK formula enhances crop yield while promoting soil health.",
        shortDescription: "Balanced NPK ratio for optimal growth with trace minerals and micronutrients.",
        featured: true,
        new: false,
        details: {
            fullDescription: "Our premium organic NPK formula enhances crop yield while promoting soil health. Formulated with plant-based ingredients and enriched with essential micronutrients, this balanced fertilizer provides complete nutrition for your crops throughout the growing season.",
            features: [
                "Balanced NPK ratio for optimal growth",
                "Enhanced with trace minerals and micronutrients",
                "Promotes soil microbial activity",
                "Slow-release formula for sustained nutrition"
            ],
            benefits: [
                "Improved crop yield and quality",
                "Enhanced soil structure and fertility",
                "Reduced environmental impact",
                "Safe for beneficial insects and soil organisms"
            ],
            specifications: {
                "NPK Ratio": "4-6-4",
                "Weight": "5 kg, 10 kg, 25 kg bags",
                "Application Rate": "2-3 kg per 100 sq. meters",
                "Suitable For": "All crop types"
            }
        }
    },
    {
        id: "soil-revitalizer",
        name: "Soil Revitalizer",
        category: "soil-health",
        // price: "$24.99",
        rating: 4,
        reviews: 153,
        image: "image/Products/Soil_Revitalizer.jpg",
        description: "Restore depleted soil with our specialized soil health formula.",
        shortDescription: "Rebuilds soil structure and increases microbial activity in depleted soils.",
        featured: true,
        new: true,
        details: {
            fullDescription: "Restore depleted soil with our specialized soil health formula. This unique blend of organic matter, beneficial microorganisms, and essential nutrients works to rebuild soil structure, increase biodiversity, and enhance nutrient cycling for healthier, more productive growing conditions.",
            features: [
                "Rich in organic matter and humic substances",
                "Contains beneficial soil microorganisms",
                "Improves soil structure and water retention",
                "Enhances nutrient availability"
            ],
            benefits: [
                "Revitalizes exhausted agricultural land",
                "Reduces erosion and compaction",
                "Increases water-holding capacity",
                "Creates a healthy environment for root development"
            ],
            specifications: {
                "Organic Matter": "65%",
                "Weight": "10 kg, 20 kg bags",
                "Application Rate": "3-5 kg per 100 sq. meters",
                "Suitable For": "All soil types, especially depleted soils"
            }
        }
    },
    {
        id: "liquid-growth-formula",
        name: "Liquid Growth Formula",
        category: "liquid",
        // price: "$24.99",
        rating: 4,
        reviews: 189,
        image: "image/Products/Liquid_Growth_Formula.jpg",
        description: "Fast-acting liquid formula for immediate nutrient delivery.",
        shortDescription: "Fast-acting liquid formula for immediate nutrient delivery. Perfect for nutrient-deficient soils or as a quick boost during critical growth stages.",
        featured: true,
        new: true,
        details: {
            fullDescription: "Fast-acting liquid formula for immediate nutrient delivery. Perfect for nutrient-deficient soils or as a quick boost during critical growth stages. This readily absorbable liquid fertilizer provides essential macronutrients and micronutrients directly to plant roots and foliage for rapid uptake.",
            features: [
                "Rapid nutrient delivery system",
                "Balanced blend of macro and micronutrients",
                "Suitable for both foliar and soil application",
                "Enhanced with growth stimulants"
            ],
            benefits: [
                "Quick correction of nutrient deficiencies",
                "Accelerated plant growth during critical stages",
                "Improved stress tolerance",
                "Enhanced crop quality and yield"
            ],
            specifications: {
                "Formulation": "Concentrated liquid",
                "NPK Ratio": "7-3-7",
                "Size": "1L, 5L, 20L containers",
                "Dilution Rate": "10ml per liter of water",
                "Suitable For": "All crops, especially during flowering and fruiting"
            }
        }
    },
    {
        id: "premium-npk-blend",
        name: "Premium NPK Blend",
        category: "npk",
        // price: "$19.99",
        // originalPrice: "$23.50",
        // discount: 15,
        rating: 5,
        reviews: 426,
        image: "image/Products/Premium_NPK_Blend.png",
        description: "Balanced NPK formula with perfect 10-10-10 ratio.",
        shortDescription: "Balanced NPK formula with perfect 10-10-10 ratio. Scientifically designed for maximum yield in all soil types and various crops. Long-lasting effect.",
        featured: true,
        new: false,
        details: {
            fullDescription: "Balanced NPK formula with perfect 10-10-10 ratio. Scientifically designed for maximum yield in all soil types and various crops. The slow-release granules provide consistent nutrition throughout the growing season while promoting healthy root development and robust plant growth.",
            features: [
                "Perfect 10-10-10 NPK ratio",
                "Slow-release granular formula",
                "Enhanced with essential secondary nutrients",
                "Long-lasting nutritional impact"
            ],
            benefits: [
                "Balanced growth of roots, stems, leaves, and fruits",
                "Consistent nutrition throughout growing season",
                "Improved drought resistance",
                "Higher yields and better quality produce"
            ],
            specifications: {
                "NPK Ratio": "10-10-10",
                "Weight": "5 kg, 10 kg, 25 kg bags",
                "Application Rate": "2-3 kg per 100 sq. meters",
                "Suitable For": "All crop types and soil conditions"
            }
        }
    },
    {
        id: "compost-accelerator",
        name: "Compost Accelerator",
        category: "organic",
        // price: "$15.99",
        rating: 5,
        reviews: 207,
        image: "image/Products/Compost_Accelerator.jpg",
        description: "Speed up your composting process with our specialized microbial blend.",
        shortDescription: "Accelerates decomposition and enhances compost quality.",
        featured: true,
        new: false,
        details: {
            fullDescription: "Speed up your composting process with our specialized microbial blend. This powerful formula contains a diverse range of beneficial bacteria and fungi that accelerate decomposition, reduce odors, and produce higher quality compost in less time.",
            features: [
                "Diverse blend of beneficial decomposer microorganisms",
                "Activates and accelerates the composting process",
                "Reduces unpleasant odors",
                "Works in both hot and cold composting systems"
            ],
            benefits: [
                "Produces finished compost in half the time",
                "Enhances nutrient content of finished compost",
                "Reduces odors and deters pests",
                "Improves humus formation"
            ],
            specifications: {
                "Formulation": "Dry granular blend",
                "Size": "500g, 1kg packages",
                "Application Rate": "50g per 100kg of compost material",
                "Suitable For": "All compost systems and materials"
            }
        }
    },
    {
        id: "micronutrient-blend",
        name: "Micronutrient Mix",
        category: "micronutrients",
        // price: "$34.99",
        rating: 5,
        reviews: 312,
        image: "image/Products/Micronutrient_Mix.png",
        description: "Complete micronutrient solution with zinc, iron, manganese, copper, boron, and molybdenum.",
        shortDescription: "Complete micronutrient solution with zinc, iron, manganese, copper, boron, and molybdenum. Prevents deficiencies that limit crop productivity and quality.",
        featured: true,
        new: false,
        details: {
            fullDescription: "Complete micronutrient solution with zinc, iron, manganese, copper, boron, and molybdenum. Prevents deficiencies that limit crop productivity and quality. This specialized formula ensures your crops get all the essential trace elements needed for optimal growth, flowering, and fruiting.",
            features: [
                "Complete blend of essential micronutrients",
                "Highly soluble and readily available forms",
                "Balanced formulation prevents antagonistic effects",
                "Can be applied as foliar spray or soil drench"
            ],
            benefits: [
                "Prevents and corrects micronutrient deficiencies",
                "Enhances enzyme function and metabolic processes",
                "Improves flower formation and fruit set",
                "Increases crop resilience to environmental stress"
            ],
            specifications: {
                "Micronutrients": "Zn, Fe, Mn, Cu, B, Mo",
                "Formulation": "Water-soluble powder",
                "Size": "500g, 1kg packages",
                "Application Rate": "1-2g per liter of water",
                "Suitable For": "All crop types, especially high-value crops"
            }
        }
    }
];

// Add new products by simply adding new objects to the array above 