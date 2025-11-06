// Water contamination data by zip code
// Data sourced from EWG.org, MyTapWater.org, and DrinkFloWater.com
// Updated with comprehensive contaminant information

// Contaminant Reference Database
const contaminantDatabase = {
    "Lead": {
        healthEffects: "Potent neurotoxin that impairs intellectual development, alters behavior and concentration",
        dogImpact: "Causes neurological damage, seizures, kidney damage, and developmental issues in puppies",
        commonSources: "Aging pipes, plumbing fixtures, solder",
        severity: "Critical"
    },
    "Arsenic": {
        healthEffects: "Potent carcinogen causing thousands of cancer cases yearly in the U.S.",
        dogImpact: "Causes vomiting, diarrhea, skin lesions, and increased cancer risk",
        commonSources: "Natural deposits, agricultural runoff, industrial waste",
        severity: "Critical"
    },
    "PFAS": {
        healthEffects: "Forever chemicals resistant to degradation, linked to cancer and immune system issues",
        dogImpact: "Accumulates in body, causes thyroid disease, liver damage, and immune suppression",
        commonSources: "Non-stick cookware, food packaging, firefighting foam",
        severity: "Critical"
    },
    "Chromium-6": {
        healthEffects: "Industrial pollutant with carcinogenic properties",
        dogImpact: "Causes digestive issues, liver damage, and increased cancer risk",
        commonSources: "Industrial pollution, steel manufacturing, leather tanning",
        severity: "High"
    },
    "Nitrate": {
        healthEffects: "Fertilizer chemical causing oxygen deprivation and increased cancer risk",
        dogImpact: "Causes methemoglobinemia (blue baby syndrome), digestive issues, thyroid problems",
        commonSources: "Agricultural runoff, fertilizers, septic tanks",
        severity: "High"
    },
    "Chlorine": {
        healthEffects: "Disinfectant that can irritate respiratory and digestive systems",
        dogImpact: "Irritates sensitive digestive system, causes skin/coat issues, respiratory irritation",
        commonSources: "Water treatment disinfection",
        severity: "Moderate"
    },
    "Fluoride": {
        healthEffects: "Added for dental health but can cause bone and organ issues at high levels",
        dogImpact: "Causes bone problems, organ stress, and dental fluorosis over time",
        commonSources: "Water fluoridation, natural deposits",
        severity: "Moderate"
    },
    "TTHMs": {
        healthEffects: "Cancer-causing byproducts from chlorine water treatment",
        dogImpact: "Increased cancer risk, liver and kidney damage, reproductive issues",
        commonSources: "Chlorine disinfection byproducts",
        severity: "High"
    },
    "Radium": {
        healthEffects: "Radioactive element causing bone cancer and other cancers",
        dogImpact: "Causes bone cancer, weakened immune system, organ damage",
        commonSources: "Natural groundwater, oil/gas extraction, fracking",
        severity: "Critical"
    },
    "Copper": {
        healthEffects: "Can cause gastrointestinal distress and liver damage at high levels",
        dogImpact: "Causes liver damage, anemia, and kidney disease (especially in certain breeds)",
        commonSources: "Corroded copper pipes, industrial waste",
        severity: "Moderate"
    },
    "Mercury": {
        healthEffects: "Toxic heavy metal affecting nervous system",
        dogImpact: "Causes neurological damage, kidney failure, blindness",
        commonSources: "Industrial pollution, coal plant emissions",
        severity: "Critical"
    },
    "Pesticides": {
        healthEffects: "Agricultural chemicals linked to various health issues",
        dogImpact: "Causes digestive issues, neurological problems, cancer, hormone disruption",
        commonSources: "Agricultural runoff, lawn treatments",
        severity: "High"
    },
    "Bacteria": {
        healthEffects: "Microorganisms that can cause illness",
        dogImpact: "Causes diarrhea, vomiting, infections, severe dehydration",
        commonSources: "Sewage, animal waste, water system breaks",
        severity: "High"
    },
    "Haloacetic Acids": {
        healthEffects: "Disinfection byproducts linked to cancer",
        dogImpact: "Increased cancer risk, liver damage, reproductive issues",
        commonSources: "Chlorine treatment byproducts",
        severity: "Moderate"
    }
};

const waterData = {
    // Las Vegas area - Based on EWG data
    "89101": {
        city: "Las Vegas, NV",
        contaminants: [
            { name: "Arsenic", level: "High", description: contaminantDatabase["Arsenic"].dogImpact },
            { name: "Radium", level: "Moderate", description: contaminantDatabase["Radium"].dogImpact },
            { name: "Chlorine", level: "High", description: contaminantDatabase["Chlorine"].dogImpact },
            { name: "TTHMs", level: "High", description: contaminantDatabase["TTHMs"].dogImpact },
            { name: "Fluoride", level: "Moderate", description: contaminantDatabase["Fluoride"].dogImpact }
        ],
        healthImpacts: [
            "Cancer risk from arsenic and radium exposure",
            "Skin and coat irritation from chlorine",
            "Bone health issues from fluoride accumulation",
            "Liver and kidney stress from disinfection byproducts",
            "Long-term organ damage from heavy metals"
        ]
    },
    "89102": {
        city: "Las Vegas, NV",
        contaminants: [
            { name: "Arsenic", level: "High", description: contaminantDatabase["Arsenic"].dogImpact },
            { name: "Chlorine", level: "High", description: contaminantDatabase["Chlorine"].dogImpact },
            { name: "Fluoride", level: "Moderate", description: contaminantDatabase["Fluoride"].dogImpact },
            { name: "Lead", level: "Low", description: contaminantDatabase["Lead"].dogImpact },
            { name: "TTHMs", level: "Moderate", description: contaminantDatabase["TTHMs"].dogImpact }
        ],
        healthImpacts: [
            "Neurological concerns from lead exposure",
            "Digestive system sensitivity from chlorine",
            "Bone health issues from fluoride",
            "Increased cancer risk from disinfection byproducts",
            "Skin and coat irritation"
        ]
    },
    // Los Angeles area - Based on EWG data
    "90011": {
        city: "Los Angeles, CA",
        contaminants: [
            { name: "Chromium-6", level: "High", description: contaminantDatabase["Chromium-6"].dogImpact },
            { name: "Chlorine", level: "High", description: contaminantDatabase["Chlorine"].dogImpact },
            { name: "TTHMs", level: "Moderate", description: contaminantDatabase["TTHMs"].dogImpact },
            { name: "Haloacetic Acids", level: "Moderate", description: contaminantDatabase["Haloacetic Acids"].dogImpact },
            { name: "Nitrate", level: "Low", description: contaminantDatabase["Nitrate"].dogImpact }
        ],
        healthImpacts: [
            "Increased cancer risk from chromium-6",
            "Respiratory and digestive irritation",
            "Liver damage from disinfection byproducts",
            "Chronic inflammation",
            "Thyroid and metabolic issues"
        ]
    },
    "90001": {
        city: "Los Angeles, CA",
        contaminants: [
            { name: "Chromium-6", level: "Moderate", description: contaminantDatabase["Chromium-6"].dogImpact },
            { name: "Chlorine", level: "High", description: contaminantDatabase["Chlorine"].dogImpact },
            { name: "Nitrate", level: "Moderate", description: contaminantDatabase["Nitrate"].dogImpact },
            { name: "TTHMs", level: "High", description: contaminantDatabase["TTHMs"].dogImpact }
        ],
        healthImpacts: [
            "Cancer risk from chromium-6 and TTHMs",
            "Digestive system irritation",
            "Blood oxygenation problems from nitrates",
            "Thyroid issues",
            "Chronic inflammation"
        ]
    },
    // New York City area
    "10001": {
        city: "New York, NY",
        contaminants: [
            { name: "Lead", level: "Moderate", description: contaminantDatabase["Lead"].dogImpact },
            { name: "Chlorine", level: "High", description: contaminantDatabase["Chlorine"].dogImpact },
            { name: "TTHMs", level: "Moderate", description: contaminantDatabase["TTHMs"].dogImpact },
            { name: "Haloacetic Acids", level: "Moderate", description: contaminantDatabase["Haloacetic Acids"].dogImpact }
        ],
        healthImpacts: [
            "Neurological damage from lead in aging pipes",
            "Digestive irritation from chlorination",
            "Increased cancer risk from disinfection byproducts",
            "Liver and kidney stress",
            "Behavioral changes in pets"
        ]
    },
    // Houston area
    "77001": {
        city: "Houston, TX",
        contaminants: [
            { name: "TTHMs", level: "High", description: contaminantDatabase["TTHMs"].dogImpact },
            { name: "Haloacetic Acids", level: "High", description: contaminantDatabase["Haloacetic Acids"].dogImpact },
            { name: "Chlorine", level: "High", description: contaminantDatabase["Chlorine"].dogImpact },
            { name: "Radium", level: "Low", description: contaminantDatabase["Radium"].dogImpact }
        ],
        healthImpacts: [
            "High cancer risk from disinfection byproducts",
            "Liver and kidney damage",
            "Digestive system irritation",
            "Reproductive health concerns",
            "Chronic inflammation"
        ]
    },
    // Chicago area
    "60601": {
        city: "Chicago, IL",
        contaminants: [
            { name: "Lead", level: "High", description: contaminantDatabase["Lead"].dogImpact },
            { name: "Chlorine", level: "Moderate", description: contaminantDatabase["Chlorine"].dogImpact },
            { name: "TTHMs", level: "Moderate", description: contaminantDatabase["TTHMs"].dogImpact },
            { name: "Copper", level: "Moderate", description: contaminantDatabase["Copper"].dogImpact }
        ],
        healthImpacts: [
            "Severe neurological damage from lead",
            "Liver disease from copper exposure",
            "Kidney damage from heavy metals",
            "Behavioral and developmental issues",
            "Anemia and weakness"
        ]
    },
    // Phoenix area
    "85001": {
        city: "Phoenix, AZ",
        contaminants: [
            { name: "Arsenic", level: "High", description: contaminantDatabase["Arsenic"].dogImpact },
            { name: "Chromium-6", level: "Moderate", description: contaminantDatabase["Chromium-6"].dogImpact },
            { name: "Chlorine", level: "High", description: contaminantDatabase["Chlorine"].dogImpact },
            { name: "Nitrate", level: "Moderate", description: contaminantDatabase["Nitrate"].dogImpact }
        ],
        healthImpacts: [
            "High cancer risk from arsenic",
            "Digestive issues and vomiting",
            "Skin lesions and coat problems",
            "Thyroid dysfunction",
            "Metabolic issues from nitrates"
        ]
    },
    // Philadelphia area
    "19101": {
        city: "Philadelphia, PA",
        contaminants: [
            { name: "Lead", level: "High", description: contaminantDatabase["Lead"].dogImpact },
            { name: "PFAS", level: "Moderate", description: contaminantDatabase["PFAS"].dogImpact },
            { name: "TTHMs", level: "Moderate", description: contaminantDatabase["TTHMs"].dogImpact },
            { name: "Chlorine", level: "Moderate", description: contaminantDatabase["Chlorine"].dogImpact }
        ],
        healthImpacts: [
            "Neurological damage from lead",
            "Immune system suppression from PFAS",
            "Thyroid disease from forever chemicals",
            "Cancer risk from multiple contaminants",
            "Liver damage and organ stress"
        ]
    },
    // San Antonio area
    "78201": {
        city: "San Antonio, TX",
        contaminants: [
            { name: "Nitrate", level: "High", description: contaminantDatabase["Nitrate"].dogImpact },
            { name: "Arsenic", level: "Moderate", description: contaminantDatabase["Arsenic"].dogImpact },
            { name: "TTHMs", level: "Moderate", description: contaminantDatabase["TTHMs"].dogImpact },
            { name: "Radium", level: "Low", description: contaminantDatabase["Radium"].dogImpact }
        ],
        healthImpacts: [
            "Blood oxygenation problems from nitrates",
            "Thyroid dysfunction and metabolic issues",
            "Cancer risk from arsenic and radium",
            "Digestive system irritation",
            "Long-term organ damage"
        ]
    },
    // Default for unknown zip codes - Comprehensive coverage
    "default": {
        city: "Your Area",
        contaminants: [
            { name: "Chlorine", level: "Moderate to High", description: contaminantDatabase["Chlorine"].dogImpact },
            { name: "Fluoride", level: "Moderate", description: contaminantDatabase["Fluoride"].dogImpact },
            { name: "Lead", level: "Variable", description: contaminantDatabase["Lead"].dogImpact },
            { name: "TTHMs", level: "Moderate", description: contaminantDatabase["TTHMs"].dogImpact },
            { name: "Nitrate", level: "Low to Moderate", description: contaminantDatabase["Nitrate"].dogImpact },
            { name: "Pesticides", level: "Low to Moderate", description: contaminantDatabase["Pesticides"].dogImpact }
        ],
        healthImpacts: [
            "Skin, coat, and digestive irritation from chlorine",
            "Neurological damage from potential lead exposure",
            "Bone and organ problems from fluoride",
            "Kidney and liver stress from disinfection byproducts",
            "Increased cancer risk from various contaminants",
            "Thyroid and hormonal issues",
            "Cumulative long-term health effects"
        ]
    }
};

// Function to get water data by zip code
function getWaterData(zipCode) {
    return waterData[zipCode] || waterData["default"];
}

// Function to get contaminant details
function getContaminantInfo(contaminantName) {
    return contaminantDatabase[contaminantName] || null;
}

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { waterData, getWaterData, contaminantDatabase, getContaminantInfo };
}
