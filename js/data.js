/**
 * CENTRALIZED PORTFOLIO DATA
 * Single-Source of Truth for Chitte Manoj Reddy's Portfolio
 * Real certificates, exact dates, links, and factual copy.
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Chitte Manoj Reddy",
    displayName: "MANOJ REDDY",
    headline: "HI, I'M MANOJ REDDY.",
    subhead: "AI & DATA ANALYTICS PROFESSIONAL",
    tagline: "Building intelligent solutions through AI, data, and automation.",
    primaryRole: "AI & Data Analytics Professional",
    avatar: "assets/manoj-profile.jpg",
    statement: "I work at the intersection of AI, data, and intelligent automation.",
    summary: [
      "Results-oriented AI & Data Analytics Professional with experience in AI Agent Development, Generative AI, SQL, Power BI, Microsoft Copilot Studio, Power Automate, Data Validation, and Application Testing.",
      "Skilled in automating business processes, analyzing complex datasets, and delivering data-driven insights.",
      "Strong problem-solving, analytical, and collaboration skills with a passion for innovation and continuous learning."
    ]
  },

  social: {
    linkedin: "https://www.linkedin.com/in/manoj-reddy-chitte-9aa91134b",
    github: "https://github.com/manoj2525-dev",
    email: "manojreddy2525@gmail.com",
    phone: "+917386431962",
    phoneDisplay: "+91 7386431962",
    whatsappNumber: "", // Set to phone number when enabled
    whatsappMessage: "Hi Manoj, I visited your portfolio and would like to connect regarding an opportunity/project.",
    emailSubject: "Portfolio / Career Opportunity – Manoj Reddy",
    emailBodyTemplate: "Hi Manoj,\n\nI came across your portfolio and would like to connect regarding an opportunity/project.\n\nRegards,",
    resumeUrl: "assets/Chitte_Manoj_Reddy_Resume.pdf"
  },

  skills: [
    {
      category: "AI & MACHINE LEARNING",
      items: ["Generative AI", "Large Language Models (LLM)", "Prompt Engineering", "Machine Learning", "AI Agents"]
    },
    {
      category: "PROGRAMMING",
      items: ["Python", "SQL"]
    },
    {
      category: "DATA & BUSINESS INTELLIGENCE",
      items: ["Power BI", "Excel", "Pandas", "Data Analysis", "Data Validation", "Reporting"]
    },
    {
      category: "AUTOMATION",
      items: ["Microsoft Copilot Studio", "Power Automate", "Workflow Automation"]
    },
    {
      category: "WEB DEVELOPMENT",
      items: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Django", "REST API", "FastAPI"]
    },
    {
      category: "DATABASE & CLOUD",
      items: ["Oracle DB", "MySQL", "GCP", "Cloud Computing"]
    },
    {
      category: "TOOLS",
      items: ["VS Code", "Jupyter Notebook", "GitHub", "Microsoft Office"]
    }
  ],

  experience: [
    {
      id: "exp-agents",
      num: "01",
      company: "Lumen Technologies",
      location: "Bangalore, India",
      role: "AI & Data Analytics",
      title: "AI AGENT DEVELOPMENT",
      shortDesc: "Built 8 AI Agents for Enterprise Workflow Automation using Copilot Studio and Power Automate.",
      date: "03/2026 – 04/2026",
      details: [
        "Designed and deployed 8 AI agents using Copilot Studio and Power Automate.",
        "Automated manual workflows across critical business processes.",
        "Reduced task effort by 1–5 hours per task.",
        "Automated incident response and decision-making workflows.",
        "Cut resolution time by 1–3 hours per incident.",
        "Saved 2–4 hours monthly across key operational processes.",
        "Improved productivity, risk visibility, and cost efficiency.",
        "Drove up to 10% in potential operational savings."
      ],
      technologies: ["Copilot Studio", "Power Automate", "Microsoft 365", "AI Agents", "Workflow Automation"]
    },
    {
      id: "exp-nps",
      num: "02",
      company: "Lumen Technologies",
      location: "Bangalore, India",
      role: "AI & Data Analytics",
      title: "NPS DATA ANALYSIS USING LLM",
      shortDesc: "Customer Feedback Intelligence & Analytics across 12K+ NPS records.",
      date: "03/2026 – 05/2026",
      details: [
        "Analyzed 12K+ NPS customer feedback records.",
        "Identified key satisfaction drivers and month-over-month trends.",
        "Developed an interactive NPS dashboard.",
        "Performed root cause analysis on customer friction points.",
        "Used LLM-based customer feedback summarization.",
        "Automated insight generation and reporting.",
        "Significantly reduced manual reporting effort."
      ],
      technologies: ["SQL", "Power BI", "Excel", "Python", "Pandas", "Data Analytics", "Reporting"]
    },
    {
      id: "exp-dblink",
      num: "03",
      company: "Lumen Technologies",
      location: "Bangalore, India",
      role: "AI & Data Analytics",
      title: "DB-LINK PRODUCTION",
      shortDesc: "Oracle Database Link Connectivity & Integration Analysis.",
      date: "03/2026 – 04/2026",
      details: [
        "Conducted comprehensive Oracle DB-Link analysis.",
        "Improved cross-database accessibility and integration reliability.",
        "Identified database dependencies and data flow bottlenecks.",
        "Reduced troubleshooting effort and improved system stability.",
        "Delivered actionable recommendations for database performance and connectivity monitoring."
      ],
      technologies: ["Oracle", "Python", "DB-Link Analysis"]
    },
    {
      id: "exp-validation",
      num: "04",
      company: "Lumen Technologies",
      location: "Bangalore, India",
      role: "AI & Data Analytics",
      title: "DATA VALIDATION",
      shortDesc: "Oracle–GCP Data Validation Framework reducing errors by 80%.",
      date: "07/2026 – 08/2026",
      details: [
        "Developed an automated Oracle-GCP Data Validation Framework.",
        "Reduced manual validation effort by 5 hours per comparison cycle.",
        "Implemented automated key discovery and dynamic column mapping.",
        "Implemented row-level validation routines.",
        "Improved data accuracy and reduced reconciliation errors by 80%.",
        "Accelerated data migration verification.",
        "Improved delivery speed, reliability, and data quality."
      ],
      technologies: ["Oracle", "GCP", "Python", "JSON", "FastAPI"]
    }
  ],

  projects: [
    {
      id: "tims",
      num: "PROJECT 01",
      title: "TELECOM INVENTORY MANAGEMENT SYSTEM",
      shortTitle: "TIMS",
      date: "08/2025",
      description: "Built a web-based inventory management system to track and update telecom stock efficiently.",
      features: [
        "Product management",
        "Stock management",
        "CRUD operations",
        "Authentication",
        "REST API integration"
      ],
      impact: "Improved stock tracking accuracy by 30% compared to manual methods.",
      technology: ["React.js", "Node.js", "MySQL", "REST APIs", "Tailwind CSS"],
      githubUrl: null,
      liveDemoUrl: null,
      overview: "A specialized inventory tracking and stock management system designed to replace error-prone manual spreadsheets in telecom equipment logistics.",
      problem: "Manual spreadsheet tracking caused stock discrepancy, unmonitored equipment movement, and delayed procurement cycles across distributed field locations.",
      solution: "Engineered a centralized relational web system with React, Node.js, and MySQL that enforces schema validation, user authentication, and real-time stock mutation tracking via REST APIs.",
      futureRoadmap: [
        "Automated QR code scanning support for mobile warehouse operations",
        "Predictive re-ordering notifications based on seasonal burn rates"
      ]
    },
    {
      id: "agriculture-voice-bot",
      num: "PROJECT 02",
      title: "AGRICULTURE VOICE BOT INTEGRATED WITH CROP PREDICTION",
      shortTitle: "Agriculture Voice Bot",
      date: "01/2026 – 02/2026",
      description: "Developed a Telugu voice-enabled application that predicts suitable crops using Machine Learning.",
      features: [
        "Telugu voice interaction",
        "Speech-to-Text",
        "Machine Learning",
        "NLP",
        "Text-to-Speech",
        "Data preprocessing"
      ],
      impact: "Potentially reducing crop selection time by 60% and farmer query time by 50%.",
      technology: ["Python", "Machine Learning", "NLP", "Speech-to-Text", "Text-to-Speech", "Data Preprocessing", "HTML", "CSS", "JavaScript", "Django"],
      githubUrl: null,
      liveDemoUrl: null,
      overview: "A regional voice-interactive application enabling Telugu-speaking farmers to obtain AI-powered crop recommendations without language or literacy barriers.",
      problem: "Most agricultural advice systems rely on English text forms, creating significant accessibility barriers for regional farming communities.",
      solution: "Developed an end-to-end voice application using Speech-to-Text for Telugu voice input, NLP entity extraction for soil and weather conditions, ML classification models for crop selection, and Text-to-Speech audio response in Telugu.",
      futureRoadmap: [
        "Dialect adaptation for regional Telugu variations",
        "Integration with real-time localized weather telemetry APIs"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology in Computer Science Engineering – Data Science",
      institution: "Narasimha Reddy Engineering College",
      period: "2022 – 2026"
    },
    {
      degree: "Intermediate",
      institution: "Sri Sai Vikas Junior College",
      period: "2020 – 2022"
    },
    {
      degree: "Secondary School Certificate",
      institution: "Om Sai Vikas Vidyaniketan",
      period: "2019 – 2020"
    }
  ],

  certifications: [
    {
      id: "cert-tata",
      title: "Tata Forage",
      credentialName: "Data Visualisation: Empowering Business with Effective Insights",
      organization: "Tata Group & Forage",
      date: "June 7, 2025",
      badge: "Certificate of Completion",
      image: "assets/cert-tata-forage.png"
    },
    {
      id: "cert-databricks",
      title: "Databricks Academy",
      credentialName: "Databricks Fundamentals Accreditation",
      organization: "Databricks Academy",
      date: "September 2, 2026",
      badge: "Accreditation",
      image: "assets/cert-databricks.png"
    },
    {
      id: "cert-lumen",
      title: "Lumen Technologies",
      credentialName: "Basic Level of the AI Academy Learning Journey",
      organization: "India Talent Development Team, Lumen",
      date: "July 2026",
      badge: "AI Academy Milestone",
      image: "assets/cert-lumen.png"
    },
    {
      id: "cert-powerbi",
      title: "OfficeMaster",
      credentialName: "PowerBI Workshop — AI-Powered Interactive Dashboards",
      organization: "OfficeMaster",
      date: "August 31, 2025",
      badge: "Verified Workshop",
      image: "assets/cert-powerbi-officemaster.png"
    },
    {
      id: "cert-infosys",
      title: "Infosys Springboard",
      credentialName: "Basics of Python Course Completion Certificate",
      organization: "Infosys Limited",
      date: "February 10, 2025",
      badge: "Verified Certificate",
      image: "assets/cert-infosys-python.png"
    },
    {
      id: "cert-ybi",
      title: "YBI Foundation",
      credentialName: "Data Science and Machine Learning Internship Certificate",
      organization: "YBI Foundation (ISO 9001:2015 Certified)",
      date: "July 17, 2025",
      badge: "Verified Internship",
      image: "assets/cert-ybi-foundation.png"
    },
    {
      id: "cert-ignite",
      title: "IGNITE-2K25",
      credentialName: "National Level Project Expo — Predicting Disease",
      organization: "Narsimha Reddy Engineering College",
      date: "February 21, 2025",
      badge: "Certificate of Appreciation",
      image: "assets/cert-ignite-2k25.png"
    }
  ]
};

window.PORTFOLIO_DATA = PORTFOLIO_DATA;
