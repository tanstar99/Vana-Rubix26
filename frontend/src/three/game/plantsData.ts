export interface PlantInfo {
    name: string;
    sanskritName: string;
    role: string;
    remedy: string;
    description: string;
}

export const plantsData: Record<string, PlantInfo> = {
    "Tulsi": {
        name: "Tulsi",
        sanskritName: "Vrinda",
        role: "Promotes immunity and respiratory health.",
        remedy: "Chew fresh leaves daily or drink Tulsi tea.",
        description: "Tulsi, also known as Holy Basil, is revered in India for its medicinal properties and spiritual significance."
    },
    "Turmeric": {
        name: "Turmeric",
        sanskritName: "Haridra",
        role: "Anti-inflammatory and antioxidant agent.",
        remedy: "Mix turmeric powder in warm milk (Golden Milk).",
        description: "Turmeric is a flowering plant of the ginger family, the roots of which are used in cooking due to their bright yellow color."
    },
    "Neem": {
        name: "Neem",
        sanskritName: "Nimba",
        role: "Blood purifier and skin protector.",
        remedy: "Apply neem oil on skin infections.",
        description: "Neem is a tree in the mahogany family Meliaceae. It is native to the Indian subcontinent and is known for its pesticidal and insecticidal properties."
    },
    "Amla": {
        name: "Amla",
        sanskritName: "Amalaki",
        role: "High Vitamin C, boosts immunity.",
        remedy: "Eat fresh amla or drink amla juice.",
        description: "Amla, or Indian Gooseberry, is a nutrient-rich fruit known for its high vitamin C content and antioxidant properties."
    },
    "Giloy": {
        name: "Giloy",
        sanskritName: "Guduchi",
        role: "Immune modulator and fever reducer.",
        remedy: "Boil stems in water and drink the decoction.",
        description: "Giloy is a herbaceous vine of the family Menispermaceae indigenous to the tropical areas of India, Myanmar, and Sri Lanka."
    },
    "Ashwagandha": {
        name: "Ashwagandha",
        sanskritName: "Ashwagandha",
        role: "Adaptogen, reduces stress.",
        remedy: "Take ashwagandha powder with warm milk before bed.",
        description: "Ashwagandha is an evergreen shrub that grows in Asia and Africa. It is commonly used for stress."
    },
    "Brahmi": {
        name: "Brahmi",
        sanskritName: "Brahmi",
        role: "Brain tonic, improves memory.",
        remedy: "Consume fresh leaves or powder with ghee.",
        description: "Brahmi has been used by Ayurvedic medical practitioners for centuries for a variety of purposes, including improving memory, reducing anxiety, and treating epilepsy."
    },
    "Ginger": {
        name: "Ginger",
        sanskritName: "Ardraka",
        role: "Digestion aid and anti-inflammatory.",
        remedy: "Drink ginger tea for cold and digestion.",
        description: "Ginger is a flowering plant whose rhizome, ginger root or ginger, is widely used as a spice and a folk medicine."
    },
    "Aloe Vera": {
        name: "Aloe Vera",
        sanskritName: "Kumari",
        role: "Skin health and digestive aid.",
        remedy: "Apply gel on burns or drink juice.",
        description: "Aloe vera is a succulent plant species of the genus Aloe. It is widely distributed, and is considered an invasive species in many world regions."
    }
};
