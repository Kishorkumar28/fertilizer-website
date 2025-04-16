// products.js - Data file for all products
const productsData = [

    {
        id: "mentore-amino-no1",
        name: "Mentore Amino’s No-1",
        category: "growth-stimulant",
        rating: 5,
        reviews: 102,
        image: "image/Products/Mentore_Amino.jpg",
        description: "Increases female flowers and stimulates flower buds for better fruit set.",
        shortDescription: "Boosts vegetative growth, flowering, and fruit set.",
        featured: true,
        new: true,
        details: {
            fullDescription: "Mentore Amino’s No-1 enhances flowering by increasing female flowers, stimulating flower bud formation, and improving fruit set. Promotes vegetative growth during critical crop stages.",
            features: [
                "Increases female flower formation",
                "Stimulates flower buds and vegetative growth",
                "Improves fruit set",
                "Fast action formula"
            ],
            benefits: [
                "Improved flowering and productivity",
                "Higher yield potential",
                "Better fruit quality",
                "Supports plant development at key stages"
            ],
            specifications: {
                "Formulation": "Liquid Concentrate",
                "Dosage": "3-5 ml per liter of water",
                "Suitable For": "All flowering and fruiting crops",
                "Size": "250 ml, 500 ml, 1L bottles"
            }
        }
    },
    {
        id: "mentore-green-spark-sl",
        name: "Mentore Green Spark SL",
        category: "plant-nutrition",
        rating: 4,
        reviews: 89,
        image: "image/Products/mentore_spark.jpg",
        description: "Improves nutrient uptake, flowering, and overall plant vigor.",
        shortDescription: "Boosts root growth, flowering, immunity, and shoot development.",
        featured: true,
        new: true,
        details: {
            fullDescription: "Mentore Green Spark SL improves plant vitality by supporting better root and shoot growth. Enhances nutrient absorption, flowering, and disease resistance, making it ideal for boosting overall plant health.",
            features: [
                "Improves nutrient uptake",
                "Enhances root growth",
                "Stimulates shoot and side branch growth",
                "Enhances immunity and flowering"
                
            ],
            benefits: [
                "Stronger plants and better crop yield",
                "Improved flowering and fruit setting",
                "Increased resistance to environmental stress",
                "Better root-to-shoot ratio"
            ],
            specifications: {
                "Formulation": "Liquid",
                "Dosage": "3 ml per liter of water",
                "Suitable For": "All crops during vegetative and flowering stages",
                "Size": "250 ml, 500 ml, 1L"
            }
        }
    },
    {
        id: "mentore-sakthi-gold",
        name: "Mentore Sakthi Gold",
        category: "soil-health",
        rating: 5,
        reviews: 115,
        image: "image/Products/mentore_sakthi_gold.jpg",
        description: "Stimulates root and vegetative growth with pest repellency action.",
        shortDescription: "Boosts yield with new shoot growth and improved root system.",
        featured: true,
        new: false,
        details: {
            fullDescription: "Mentore Sakthi Gold enhances shoot and root system development, repels pests, and supports overall vegetative growth. Ideal for early stage crop establishment and yield enhancement.",
            features: [
                "Stimulates new shoots and flowering",
                "Improves root system",
                "Repellent action",
                "Supports vegetative growth",
                "Yield Increaser",
            ],
            benefits: [
                "Better plant establishment",
                "Reduced pest incidence",
                "Enhanced yield",
                "Strengthened plant structure"
            ],
            specifications: {
                "Formulation": "Granular",
                "Dosage": "20–40 kg per acre",
                "Suitable For": "All crops",
                "Size": "25 kg, 50 kg bags"
            }
        }
    },
    {
        id: "mentore-nutri-gold",
        name: "Mentore Nutri Gold",
        category: "soil-health",
        rating: 5,
        reviews: 98,
        image: "image/Products/Mentore_Nutri_Gold.jpg",
        description: "Soil conditioner enriched with secondary nutrients for improved fruit quality.",
        shortDescription: "Corrects nutrient deficiencies and enhances fruit shine and weight.",
        featured: true,
        new: false,
        details: {
            fullDescription: "Mentore Nutri Gold is a high-quality soil conditioner designed to provide essential secondary nutrients. It addresses issues such as tomato fruit cracking and nutrient deficiencies, improving fruit quality and yield.",
            features: [
                "Corrects secondary nutrient deficiencies",
                "Improves fruit shine and weight",
                "Enhances soil condition",
                "Ideal for fruiting crops"
            ],
            benefits: [
                "Better crop quality and appearance",
                "Improved market value of produce",
                "Healthier plants with balanced nutrition",
                "Reduced fruit cracking"
            ],
            specifications: {
                "Formulation": "Granular Soil Conditioner",
                "Dosage": "50–100 kg per acre",
                "Suitable For": "Tomato and all fruit-bearing crops",
                "Size": "50 kg bag"
            }
        }
    },
    {
        id: "mentore-green-gold",
        name: "Mentore Green Gold",
        category: "plant-nutrition",
        rating: 5,
        reviews: 135,
        image: "image/Products/Mentore_Green_Gold.jpg",
        description: "Boosts root growth, resistance to diseases, and overall plant vitality.",
        shortDescription: "Promotes nutrient uptake, seed filling, and resistance to stress.",
        featured: true,
        new: false,
        details: {
            fullDescription: "Mentore Green Gold is a powerful plant tonic designed to enhance plant vigor and productivity. It stimulates root development, improves grain and seed filling, and boosts resistance to pests, diseases, and climatic stress.",
            features: [
                "Promotes vegetative growth and flowering",
                "Enhances nutrient uptake and root strength",
                "Supports stress tolerance",
                "Increases grain/seed filling",
                "Increases resistance to pests and diseases"
            ],
            benefits: [
                "Stronger and healthier crops",
                "Resilience to adverse climatic conditions",
                "Higher yield and quality",
                "Improved crop lifespan and sustainability"
            ],
            specifications: {
                "Formulation": "Granular",
                "Dosage": "1 kg per acre",
                "Suitable For": "All field crops",
                "Size": "1 kg pouch"
            }
        }
    },
    {
        id: "mentore-peacock-gold",
        name: "Mentore Peacock Gold",
        category: "plant-nutrition",
        rating: 5,
        reviews: 120,
        image: "image/Products/Mentore_Peacock_Gold.jpg",
        description: "Advanced crop tonic for boosting resistance and growth.",
        shortDescription: "Improves flowering, resistance to pests, and nutrient uptake.",
        featured: true,
        new: false,
        details: {
            fullDescription: "Mentore Peacock Gold is a versatile crop booster that stimulates root and vegetative growth, improves grain and seed quality, and builds resistance to pests and environmental stress. Ideal for all types of crops aiming for enhanced quality and resilience.",
            features: [
                "Promotes root and shoot development",
                "Enhances nutrient absorption",
                "Stimulates flowering",
                "Improves stress and pest resistance",
                "Increases climatic stress tolerance"
            ],
            benefits: [
                "Healthy and resilient crops",
                "Boosted productivity",
                "Protection against environmental damage",
                "Optimized plant vitality"
            ],
            specifications: {
                "Formulation": "Granular",
                "Dosage": "1 kg per acre",
                "Suitable For": "All grains, vegetables, and commercial crops",
                "Size": "1 kg pack"
            }
        }
    }
    
    
];

// Add new products by simply adding new objects to the array above 