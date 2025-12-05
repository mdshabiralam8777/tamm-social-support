export const tammInformation = `
TAMM is the unified digital platform and official app for Abu Dhabi government services, designed to provide a single point of access to a wide array of digital services for citizens, residents, business owners, and visitors. The platform supports Abu Dhabi's digital transformation efforts, making government interactions more convenient and efficient.

Key aspects of TAMM Abu Dhabi government services include:

Comprehensive Service Offering: TAMM provides over 1000 smart government services from various entities, including Abu Dhabi Police, Abu Dhabi Municipality, the Department of Health, and the Department of Economic Development.

Diverse Service Categories: Users can perform a multitude of tasks such as paying bills (e.g., ADNOC, Etisalat, traffic fines, parking), booking medical appointments, managing housing and UAE residency services, applying for work permits and business licenses, and accessing information on entertainment and tourism. It also facilitates services like managing birth and death certificates, requesting treatment abroad, and initiating Golden Visa applications.

Advanced Technology: The platform leverages artificial intelligence, powered by Microsoft Azure OpenAI Service and G42 Compass 2.0, to offer personalized, real-time guidance through its TAMM AI Assistant.

Enhanced User Experience: The goal of TAMM is to simplify interactions with the government, reducing the need for physical visits to government offices and improving the overall quality of life for users. The name "TAMM" itself means "consider it done" in Arabic, reflecting its commitment to service delivery.

CORE INFORMATION FOR USERS:

1. Platform Access:
   - Official Website: https://www.tamm.abudhabi/
   - Mobile App: Available on iOS App Store and Google Play Store
   - UAE Pass Integration: Required for secure login and digital signature
   - Language Support: Arabic and English interfaces

2. OFFICIAL SERVICE CATEGORIES FROM TAMM API:

   AGRICULTURE & LIVESTOCK:
   - Main Services: Farms, Livestock and Animals
   - Subcategories: Farming, Agriculture, Livestock
   - Path: /en/life-events/individual/agriculture-livestock
   - Available for: Individual and Business users

   HOUSING & PROPERTIES:
   - Main Services: Houses, Lands and Real Estate
   - Subcategories: Wastewater, Electricity, Water, Units, Lands, Manage Residential Utilities, Loans and Grants, Contracts and Consultations
   - Path: /en/life-events/individual/HousingProperties
   - Available for: Individual users (some services for Business)
   - Key Utilities: Electricity, Water, Wastewater management

   IDENTITY & CITIZENSHIP:
   - Main Services: Residency, Identity, Entry Permit, and Work
   - Subcategories: Citizenship, Residency, Identification Documents
   - Path: /en/life-events/individual/Identity-Citizenship-Human-Resources
   - Available for: Individual users
   - Key Services: Golden Visa, Residence permits, ID document management

   POLICE SERVICES:
   - Main Services: Firearm Licencing and Penal and Correctional Institutions
   - Subcategories: Lost & Found, Penal & Correctional Institutions, Firearms Licencing
   - Path: /en/life-events/individual/police-services
   - Available for: Individual users

   DRIVE & TRANSPORT:
   - Main Services: Vehicles, Traffic and Driving Services
   - Subcategories: Manage Personal Vehicle, Fines & Violations, Obtain Driving Licence, DARB, Plates, Manage Driving Licence, Parking
   - Path: /en/life-events/individual/DriveTransport
   - Available for: Individual users (some for Business)
   - Key Services: Traffic fines payment, Driving license applications, Vehicle registration

   WORK & EDUCATION:
   - Main Services: Work, Education, and Training
   - Subcategories: Active Members, Retirement and Pension, Employment, Professional Certification & Licencing, Workshops & Training, Student Affairs, Beneficiaries, General Services, Pensioners, Pension Guidelines, Educational Institutions
   - Path: /en/life-events/individual/WorkEducation
   - Available for: Individual users (some for Business)
   - Key Services: Work permits, Professional certifications, Pension management

   HEALTHCARE SERVICES:
   - Main Services: Health Insurance, Licensing, and Facilities
   - Subcategories: Rehabilitation, Health Insurance, Healthcare Directory, International Patient Care, Family Health
   - Path: /en/life-events/individual/Manage-your-Health
   - Available for: Individual users (some for Business)
   - Key Services: Health insurance management, Medical appointments, International patient care

   CULTURE & LEISURE:
   - Main Services: Tourism, Culture and Diversity
   - Subcategories: Recreation, Pet Care, Leisure, Community, Islamic Affairs, Libraries, Culture Workshops
   - Path: /en/life-events/individual/CultureTourism
   - Available for: Individual users

   SOCIAL CARE:
   - Main Services: Support Environmental Affairs and Society Services
   - Subcategories: Preparing for Marriage, Family Enablement, Social Support, Senior Citizens, PoD Support, Minors Support
   - Path: /en/life-events/individual/SupportCommunityEnvironment
   - Available for: Individual users

   DECEASED & INHERITANCE:
   - Main Services: Legislation and Inheritance-related Services
   - Subcategories: Inheritance, Deceased
   - Path: /en/life-events/individual/DeceasedInheritance
   - Available for: Individual and Business users

3. Service Navigation Guidance:
   - Each category has a specific path in the format: /en/life-events/individual/[category-name]
   - Some services support both Individual and Business users (marked as "Individual|Business")
   - Mobile-specific banners and icons are available for most categories
   - The platform uses a consistent ID system for all services and subcategories

4. Contact Information:
   - Main Call Center: 800 555
   - Email Support: contact@tamm.abudhabi
   - Social Media: @TAMMAbuDhabi on Twitter, Instagram, Facebook
   - Physical Centers: TAMM service centers across Abu Dhabi, Al Ain, and Al Dhafra

5. Common User Scenarios with Path References:
   - "I need to pay a traffic fine" → Drive & Transport / Fines & Violations
   - "How do I renew my residence visa?" → Identity & Citizenship / Residency
   - "I want to apply for a business license" → Work & Education / Professional Certification
   - "My electricity bill payment" → Housing & Properties / Electricity
   - "Book a medical appointment" → Healthcare Services / Healthcare Directory
   - "Apply for Golden Visa" → Identity & Citizenship / Citizenship

6. Technical Features:
   - Secure payment gateway integration
   - Document upload and storage
   - Real-time application tracking
   - Digital signature capability
   - Push notifications for updates
   - Biometric authentication support
   - RESTful API structure with consistent JSON responses

7. Target User Groups:
   - UAE Citizens: Access all government services
   - Residents: Visa, healthcare, utility services
   - Business Owners: Licensing, permits, employee management
   - Visitors: Tourism information, temporary permits
   - Government Employees: Internal service management
`;
