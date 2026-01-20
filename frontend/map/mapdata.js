var simplemaps_countrymap_mapdata = {
  main_settings: {
    //General settings
    width: "responsive", //'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",

    //State defaults
    state_description: "State description",
    state_color: "#E6F2E6",
    state_hover_color: "#A3C293",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "yes",

    //Location defaults
    location_description: "Location description",
    location_url: "",
    location_color: "#E6F2E6",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",

    //Label defaults
    label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: 16,
    label_font: "Arial",
    label_display: "auto",
    label_scale: "yes",
    hide_labels: "no",
    hide_eastern_labels: "no",

    //Zoom settings
    zoom: "yes",
    manual_zoom: "yes",
    back_image: "no",
    initial_back: "no",
    initial_zoom: "-1",
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,

    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",

    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    popups: "detect",
    state_image_url: "",
    state_image_position: "",
    location_image_url: "",
  },
  state_specific: {
    INAN: {
      name: "Andaman and Nicobar",
      description:
        "Tropical island forests support medicinal plants traditionally used in Ayurveda and folk medicine for wound healing, skin infections, and immunity support.",
    },

    INAP: {
      name: "Andhra Pradesh",
      description:
        "Wetlands and forest regions support Ayurvedic herbs like Brahmi and Giloy, used for memory enhancement, immunity building, and metabolic balance.",
    },

    INAR: {
      name: "Arunachal Pradesh",
      description:
        "Dense forest ecosystems nurture medicinal climbers and herbs traditionally used in AYUSH practices for fever control, immunity, and vitality.",
    },

    INAS: {
      name: "Assam",
      description:
        "Humid climate favors Turmeric and Ginger cultivation, widely used in Ayurveda and Siddha for digestion, inflammation control, and respiratory health.",
    },

    INBR: {
      name: "Bihar",
      description:
        "Favorable plains support medicinal climbers like Giloy, extensively used in Ayurveda for immunity enhancement and chronic fever management.",
    },

    INCH: {
      name: "Chandigarh",
      description:
        "Urban herbal gardens promote common AYUSH plants such as Tulsi and Aloe Vera for preventive healthcare and medicinal awareness.",
    },

    INCT: {
      name: "Chhattisgarh",
      description:
        "Forest regions support natural growth of Giloy and other medicinal plants used in tribal medicine and classical Ayurvedic formulations.",
    },

    INDH: {
      name: "Dādra and Nagar Haveli and Damān and Diu",
      description:
        "Warm climate supports Aloe Vera and Neem, valued in AYUSH systems for skin disorders, detoxification, and wound healing.",
    },

    INDL: {
      name: "Delhi",
      description:
        "Urban cultivation focuses on Tulsi, Neem, and Aloe Vera, commonly used in Ayurveda for immunity, respiratory health, and preventive care.",
    },

    INGA: {
      name: "Goa",
      description:
        "Tropical coastal climate supports Neem and Turmeric, used in AYUSH systems for skin care, digestion, and anti-inflammatory treatments.",
    },

    INGJ: {
      name: "Gujarat",
      description:
        "Semi-arid regions favor Aloe Vera and Ashwagandha, important Ayurvedic herbs for skin health, stress relief, and vitality enhancement.",
    },

    INHP: {
      name: "Himachal Pradesh",
      description:
        "Temperate zones support medicinal herbs traditionally used in Ayurveda for respiratory health, digestion, and stress adaptation.",
    },

    INHR: {
      name: "Haryana",
      description:
        "Plains support Neem, Tulsi, and Amla cultivation, widely used in Ayurveda for immunity boosting and preventive healthcare.",
    },

    INJH: {
      name: "Jharkhand",
      description:
        "Forest ecosystems support Giloy and medicinal trees used in AYUSH practices for fever management and immune regulation.",
    },

    INJK: {
      name: "Jammu and Kashmir",
      description:
        "Cool climates support medicinal herbs traditionally used in Ayurveda for respiratory health, rejuvenation, and immunity support.",
    },

    INKA: {
      name: "Karnataka",
      description:
        "Diverse ecosystems support Tulsi, Neem, Amla, Ginger, and Turmeric, forming a strong base for Ayurvedic medicinal use.",
    },

    INKL: {
      name: "Kerala",
      description:
        "High rainfall supports Brahmi, Turmeric, Ginger, and Neem, making Kerala a major center for classical Ayurvedic plant cultivation.",
    },

    INLA: {
      name: "Ladakh",
      description:
        "High-altitude regions support medicinal plants traditionally used for stamina, immunity, and adaptation to extreme climates.",
    },

    INLD: {
      name: "Lakshadweep",
      description:
        "Coastal island conditions support limited medicinal plants used traditionally for skin healing and basic herbal remedies.",
    },

    INMH: {
      name: "Maharashtra",
      description:
        "Deccan plateau supports Tulsi, Amla, and Giloy, widely used in Ayurveda for immunity enhancement and stress management.",
    },

    INML: {
      name: "Meghalaya",
      description:
        "High rainfall regions support medicinal herbs used in Ayurveda for digestion, immunity, and inflammation control.",
    },

    INMN: {
      name: "Manipur",
      description:
        "Wetland and forest ecosystems support medicinal plants used in traditional AYUSH practices for digestion and immune health.",
    },

    INMP: {
      name: "Madhya Pradesh",
      description:
        "A major cultivation region for Ashwagandha, Neem, and Amla, central to Ayurvedic rejuvenation and immunity formulations.",
    },

    INMZ: {
      name: "Mizoram",
      description:
        "Forest-rich terrain supports medicinal climbers and herbs traditionally used for fever control and immunity strengthening.",
    },

    INNL: {
      name: "Nagaland",
      description:
        "Forest ecosystems support medicinal plants used traditionally for wound healing, detoxification, and immune support.",
    },

    INOR: {
      name: "Orissa",
      description:
        "Forests and plains support Turmeric and Neem, used extensively in Ayurveda for inflammation, skin health, and digestion.",
    },

    INPB: {
      name: "Punjab",
      description:
        "Fertile plains support Neem and Amla, commonly used in Ayurveda for blood purification and immunity enhancement.",
    },

    INPY: {
      name: "Puducherry",
      description:
        "Coastal climate supports Aloe Vera, Tulsi, and Neem cultivation for skin care, immunity, and wellness education.",
    },

    INRJ: {
      name: "Rajasthan",
      description:
        "Arid climate favors Ashwagandha and Aloe Vera, important Ayurvedic plants for stress relief, vitality, and skin healing.",
    },

    INSK: {
      name: "Sikkim",
      description:
        "Mountain biodiversity supports medicinal herbs used in Ayurveda for digestion, immunity, and stress adaptation.",
    },

    INTG: {
      name: "Telangana",
      description:
        "Dry plateau conditions support Ashwagandha, Turmeric, and Aloe Vera used for metabolism, immunity, and stress management.",
    },

    INTN: {
      name: "Tamil Nadu",
      description:
        "Diverse climates support Tulsi, Turmeric, Brahmi, and Ginger, key herbs in Siddha and Ayurvedic medicine.",
    },

    INTR: {
      name: "Tripura",
      description:
        "Warm and humid conditions support medicinal plants used in traditional AYUSH systems for digestion and immunity.",
    },

    INUP: {
      name: "Uttar Pradesh",
      description:
        "Gangetic plains support Tulsi and Amla, widely used in Ayurveda for respiratory health, immunity, and rejuvenation.",
    },

    INUT: {
      name: "Uttaranchal",
      description:
        "Himalayan foothills support medicinal herbs used in Ayurveda for immunity, digestion, and respiratory wellness.",
    },

    INWB: {
      name: "West Bengal",
      description:
        "Wetland ecosystems support Brahmi, an important Ayurvedic herb for memory enhancement and nervous system health.",
    },
  },
  locations: {
    0: {
      name: "New Delhi",
      lat: "28.6",
      lng: "77.2",
      description:
        "New Delhi promotes medicinal plant conservation through urban herbal gardens, AYUSH institutions, and cultivated species like Tulsi, Aloe Vera, and Giloy used in traditional healthcare.",
    },
  },
  labels: {
    INAN: {
      name: "Andaman and Nicobar",
      parent_id: "INAN",
    },
    INAP: {
      name: "Andhra Pradesh",
      parent_id: "INAP",
    },
    INAR: {
      name: "Arunachal Pradesh",
      parent_id: "INAR",
    },
    INAS: {
      name: "Assam",
      parent_id: "INAS",
    },
    INBR: {
      name: "Bihar",
      parent_id: "INBR",
    },
    INCH: {
      name: "Chandigarh",
      parent_id: "INCH",
    },
    INCT: {
      name: "Chhattisgarh",
      parent_id: "INCT",
    },
    INDH: {
      name: "Dādra and Nagar Haveli and Damān and Diu",
      parent_id: "INDH",
    },
    INDL: {
      name: "Delhi",
      parent_id: "INDL",
    },
    INGA: {
      name: "Goa",
      parent_id: "INGA",
    },
    INGJ: {
      name: "Gujarat",
      parent_id: "INGJ",
    },
    INHP: {
      name: "Himachal Pradesh",
      parent_id: "INHP",
    },
    INHR: {
      name: "Haryana",
      parent_id: "INHR",
    },
    INJH: {
      name: "Jharkhand",
      parent_id: "INJH",
    },
    INJK: {
      name: "Jammu and Kashmir",
      parent_id: "INJK",
    },
    INKA: {
      name: "Karnataka",
      parent_id: "INKA",
    },
    INKL: {
      name: "Kerala",
      parent_id: "INKL",
    },
    INLA: {
      name: "Ladakh",
      parent_id: "INLA",
    },
    INLD: {
      name: "Lakshadweep",
      parent_id: "INLD",
    },
    INMH: {
      name: "Maharashtra",
      parent_id: "INMH",
    },
    INML: {
      name: "Meghalaya",
      parent_id: "INML",
    },
    INMN: {
      name: "Manipur",
      parent_id: "INMN",
    },
    INMP: {
      name: "Madhya Pradesh",
      parent_id: "INMP",
    },
    INMZ: {
      name: "Mizoram",
      parent_id: "INMZ",
    },
    INNL: {
      name: "Nagaland",
      parent_id: "INNL",
    },
    INOR: {
      name: "Orissa",
      parent_id: "INOR",
    },
    INPB: {
      name: "Punjab",
      parent_id: "INPB",
    },
    INPY: {
      name: "Puducherry",
      parent_id: "INPY",
    },
    INRJ: {
      name: "Rajasthan",
      parent_id: "INRJ",
    },
    INSK: {
      name: "Sikkim",
      parent_id: "INSK",
    },
    INTG: {
      name: "Telangana",
      parent_id: "INTG",
    },
    INTN: {
      name: "Tamil Nadu",
      parent_id: "INTN",
    },
    INTR: {
      name: "Tripura",
      parent_id: "INTR",
    },
    INUP: {
      name: "Uttar Pradesh",
      parent_id: "INUP",
    },
    INUT: {
      name: "Uttaranchal",
      parent_id: "INUT",
    },
    INWB: {
      name: "West Bengal",
      parent_id: "INWB",
    },
  },
  legend: {
    entries: [],
  },
  regions: {},
};