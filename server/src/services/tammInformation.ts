// TAMM system context module for OpenAI chatbot integrations.
// Import this file and pass `systemMessages` (array) and structured data to your assistant call.

export const tammSystem = {
  // Primary system prompt (optimized for accuracy, brevity and routing)
  systemPrompt: `You are the TAMM AI Assistant. Use the structured data object (featuredServices, taxonomy, contacts, tools, templates) as the single source of truth when answering user queries about Abu Dhabi government services.

Behavior rules:
- Always check featuredServices first. If a user's query matches a featured service, return that featured service details and path.
- If no featured match, map the query to the best-fit taxonomy category and provide the canonical path (/en/life-events/individual/[category-name]).
- Do NOT invent fees, processing times, or document checklists. If a detail is missing, advise: "For exact documents, fees and processing times, call 800 555 or visit https://www.tamm.abudhabi/ and the path provided."
- Use bullet points for lists and numbered steps for procedures. Keep responses concise and actionable.
- Reply in the language requested by the user (English or Arabic). If user requests Arabic, reply in Modern Standard Arabic.
- Low-temperature, factual style for government guidance. Keep the tone helpful and formal.
`,

  // Short assistant instruction string that can be appended to system messages for language handling
  languageInstructions: {
    en: "Reply in English. Use bullet points for lists.",
    ar: "Reply in Modern Standard Arabic. Use bullet points for lists.",
  },

  // Featured services: first-place lookup table for high-priority services
  featuredServices: [
    {
      id: "DED/0123",
      title: "Golden Visa Nomination",
      description:
        "Request a nomination to initiate the Golden Visa application; finalization occurs at the Federal Authority (ICP).",
      targetAudience: ["Expats", "Investors", "Talent"],
      path: "/wb/ded/golden-visa/request-for-golden-visa-nomination",
      instructions: [
        "Open TAMM → Life Events → Identity & Citizenship → Citizenship → Golden Visa",
        "Select 'Request nomination' and complete the nomination form",
        "Upload required documents (verify exact list via the official path or call 800 555)",
        "Follow ICP instructions to finalise the visa application",
      ],
    },
    {
      id: "MOHRE/0009",
      title: "Domestic Worker Contracts",
      description:
        "Employers can request issuance of a new work contract for domestic workers.",
      targetAudience: ["Emirati", "Expat", "Business"],
      path: "/wb/mohre/issue-new-work-contract-for-domestic-worker",
      instructions: [
        "Open TAMM → Work & Education → Employment or MOHRE Services",
        "Select 'Issue new work contract for domestic worker' and complete employer and worker details",
        "Upload contract documents and submit (confirm required documents via the official path or call 800 555)",
      ],
    },
    {
      id: "ADEK/REPORT/2012",
      title: "Attested Educational Report Card",
      description:
        "Issue an attested report card for records published from 2012 onwards.",
      targetAudience: ["Students", "Parents"],
      path: "/wb/adek/report-card-academic-year",
      instructions: [
        "Open TAMM → Work & Education → Educational Services → Report Cards",
        "Provide student details and academic year",
        "Upload scanned documents if required (confirm exact checklist via official path or call 800 555)",
      ],
    },
  ],

  // Canonical taxonomy used for routing/general queries
  taxonomy: {
    housingProperties: {
      path: "/en/life-events/individual/HousingProperties",
      label: "Housing & Properties",
      bullets: [
        "Wastewater, Electricity, Water",
        "Manage Residential Utilities, Units, Lands",
        "Loans and Grants, Contracts and Consultations (Tawtheeq)",
      ],
    },
    driveTransport: {
      path: "/en/life-events/individual/DriveTransport",
      label: "Drive & Transport",
      bullets: [
        "Manage Personal Vehicle, Plates",
        "Fines & Violations, Obtain/Manage Driving Licence",
        "DARB (tolls), Parking (Mawaqif)",
      ],
    },
    identityCitizenship: {
      path: "/en/life-events/individual/Identity-Citizenship-Human-Resources",
      label: "Identity & Citizenship",
      bullets: ["Residency, Emirates ID, Entry Permits, Golden Visa"],
    },
    workEducation: {
      path: "/en/life-events/individual/WorkEducation",
      label: "Work & Education",
      bullets: [
        "Employment, Professional Certification & Licencing, Student Affairs, Pension Services",
      ],
    },
    health: {
      path: "/en/life-events/individual/Manage-your-Health",
      label: "Healthcare Services",
      bullets: [
        "Health Insurance, Medical Appointments, International Patient Care, Rehabilitation",
      ],
    },
    cultureTourism: {
      path: "/en/life-events/individual/CultureTourism",
      label: "Culture & Leisure",
      bullets: ["Recreation, Pet Care, Libraries, Community Programs"],
    },
    socialCare: {
      path: "/en/life-events/individual/SupportCommunityEnvironment",
      label: "Social Care",
      bullets: [
        "Family Enablement, Senior Citizens, People of Determination (PoD) Support",
      ],
    },
    policeServices: {
      path: "/en/life-events/individual/police-services",
      label: "Police Services",
      bullets: [
        "Lost & Found, Firearms Licensing, Penal & Correctional Institutions",
      ],
    },
    agriculture: {
      path: "/en/life-events/individual/agriculture-livestock",
      label: "Agriculture & Livestock",
      bullets: ["Farming, Livestock, Animal Services"],
    },
    deceasedInheritance: {
      path: "/en/life-events/individual/DeceasedInheritance",
      label: "Deceased & Inheritance",
      bullets: ["Inheritance processing, Deceased services"],
    },
  },

  // Technical & contact info (single-source references)
  contacts: {
    website: "https://www.tamm.abudhabi/",
    callCenter: "800 555",
    email: "contact@tamm.abudhabi",
    social: "@TAMMAbuDhabi",
  },

  // Utility tools to suggest when appropriate
  tools: {
    licenceFinder:
      "Use 'Licence Finder' to help investors choose the correct business licence.",
    findHealthFacility:
      "Use 'Find a Health Facility' to locate hospitals and clinics by specialty and location.",
  },

  // Response templates the assistant should prefer (programmatic friendly)
  templates: {
    featuredService: (svc: {
      title: string;
      description: string;
      instructions: string[];
      path: string;
    }) => `Service: ${svc.title}
* Description: ${svc.description}
* Steps:
${svc.instructions.map((s, i) => `${i + 1}) ${s}`).join("\n")}
* Path: ${svc.path}
For exact documents and fees, call ${"800 555"} or visit ${"https://www.tamm.abudhabi/"} and the path provided.`,

    categorySuggestion: (category: {
      label: string;
      path: string;
    }) => `I couldn't find a featured service match. The best-fit category is ${
      category.label
    }. Path: ${category.path}.
- What you can do: 1) Open the path in TAMM. 2) Search within the category for your sub-service. 3) Call ${"800 555"} for exact fees and documents.`,

    missingDetails: `The fee or exact document list is not present in the knowledge base. For confirmation, call 800 555 or visit https://www.tamm.abudhabi/ and the path provided.`,
  },
};

// Convenience function to create systemMessages array for OpenAI Chat Completions
export function buildSystemMessages(lang: "en" | "ar" = "en") {
  return [
    tammSystem.systemPrompt,
    tammSystem.languageInstructions[lang] || tammSystem.languageInstructions.en,
  ];
}
