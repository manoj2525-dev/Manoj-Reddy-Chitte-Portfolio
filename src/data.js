/**
 * PORTFOLIO DATA — manoj-portfolio-3d
 * No dates on experience. About stats included.
 */

window.PD = {
  name: "Chitte Manoj Reddy",
  displayName: "MANOJ REDDY",
  title: "AI & DATA ANALYTICS PROFESSIONAL",
  tagline: "Building intelligent solutions through AI, data, and automation.",
  statement: "I work at the intersection of <em>AI</em>, <em>data</em>, and <em>intelligent automation</em>.",
  bio: [
    "I build AI-driven systems that turn scattered data into clear, actionable decisions. My work spans AI agent development, generative AI, and LLM-based analysis, backed by strong fundamentals in SQL, Power BI, Microsoft Copilot Studio, and Power Automate.",
    "Skilled in automating business processes, analysing complex datasets, and delivering data-driven insights that improve operational efficiency.",
    "I approach problems analytically and enjoy the handoff between technical build and business impact — translating a messy dataset or a repetitive workflow into something reliable, measurable, and easy for others to use."
  ],
  stats: [
    { num: 8,    suffix: "",  label: "AI Agents Built" },
    { num: 4,    suffix: "",  label: "Dashboards Shipped" },
    { num: 8,    suffix: "",  label: "Certifications" },
    { num: 20,   suffix: "+", label: "Tech Stack" }
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/manoj-reddy-chitte-9aa91134b",
    github:   "https://github.com/manoj2525-dev",
    email:    "manojreddy2525@gmail.com",
    phone:    "+91 7386431962",
    resume:   "public/assets/Chitte_Manoj_Reddy_Resume.pdf"
  },
  skills: [
    { category: "AI & Machine Learning", items: ["Generative AI","Large Language Models","Prompt Engineering","Machine Learning","AI Agents"] },
    { category: "Programming",           items: ["Python","SQL"] },
    { category: "Data & BI",             items: ["Power BI","Excel","Pandas","Data Analysis","Data Validation","Reporting"] },
    { category: "Automation",            items: ["Microsoft Copilot Studio","Power Automate","Workflow Automation"] },
    { category: "Web Development",       items: ["HTML","CSS","JavaScript","React.js","Node.js","Django","REST API","FastAPI"] },
    { category: "Database & Cloud",      items: ["Oracle DB","MySQL","GCP","Cloud Computing"] },
    { category: "Tools",                 items: ["VS Code","Jupyter Notebook","GitHub","Microsoft Office"] }
  ],
  experience: [
    {
      id: "exp-agents", num: "01",
      company: "Lumen Technologies", location: "Bangalore, India", role: "AI & Data Analytics",
      title: "AI AGENT DEVELOPMENT",
      shortDesc: "Built 8 AI Agents for enterprise workflow automation using Copilot Studio and Power Automate.",
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
      technologies: ["Copilot Studio","Power Automate","Microsoft 365","AI Agents","Workflow Automation"]
    },
    {
      id: "exp-nps", num: "02",
      company: "Lumen Technologies", location: "Bangalore, India", role: "AI & Data Analytics",
      title: "NPS DATA ANALYSIS USING LLM",
      shortDesc: "Customer feedback intelligence & analytics across 12K+ NPS records.",
      details: [
        "Analysed 12K+ NPS customer feedback records.",
        "Identified key satisfaction drivers and month-over-month trends.",
        "Developed an interactive NPS dashboard.",
        "Performed root cause analysis on customer friction points.",
        "Used LLM-based customer feedback summarisation.",
        "Automated insight generation and reporting.",
        "Significantly reduced manual reporting effort."
      ],
      technologies: ["SQL","Power BI","Excel","Python","Pandas","Data Analytics","Reporting"]
    },
    {
      id: "exp-dblink", num: "03",
      company: "Lumen Technologies", location: "Bangalore, India", role: "AI & Data Analytics",
      title: "DB-LINK PRODUCTION",
      shortDesc: "Oracle database link connectivity & integration analysis.",
      details: [
        "Conducted comprehensive Oracle DB-Link analysis.",
        "Improved cross-database accessibility and integration reliability.",
        "Identified database dependencies and data flow bottlenecks.",
        "Reduced troubleshooting effort and improved system stability.",
        "Delivered actionable recommendations for database performance and connectivity monitoring."
      ],
      technologies: ["Oracle","Python","DB-Link Analysis"]
    },
    {
      id: "exp-validation", num: "04",
      company: "Lumen Technologies", location: "Bangalore, India", role: "AI & Data Analytics",
      title: "DATA VALIDATION",
      shortDesc: "Oracle–GCP data validation framework reducing reconciliation errors by 80%.",
      details: [
        "Developed an automated Oracle-GCP Data Validation Framework.",
        "Reduced manual validation effort by 5 hours per comparison cycle.",
        "Implemented automated key discovery and dynamic column mapping.",
        "Implemented row-level validation routines.",
        "Improved data accuracy and reduced reconciliation errors by 80%.",
        "Accelerated data migration verification.",
        "Improved delivery speed, reliability, and data quality."
      ],
      technologies: ["Oracle","GCP","Python","JSON","FastAPI"]
    }
  ],
  projects: [
    {
      id: "tims", num: "01",
      title: "Telecom Inventory Management System",
      shortTitle: "TIMS",
      date: "08/2025",
      desc: "A web-based inventory system to track and update telecom stock efficiently — replacing error-prone manual spreadsheets with a centralised relational application.",
      impact: "Improved stock tracking accuracy by 30% compared to manual methods.",
      tech: ["React.js","Node.js","MySQL","REST APIs","Tailwind CSS"],
      githubUrl: null, liveDemoUrl: null
    },
    {
      id: "agri-voice", num: "02",
      title: "Agriculture Voice Bot with Crop Prediction",
      shortTitle: "Agri Voice Bot",
      date: "01–02/2026",
      desc: "Telugu voice-enabled application predicting suitable crops using ML — enabling regional farmers to get AI-powered advice without language or literacy barriers.",
      impact: "Potentially reducing crop selection time by 60% and farmer query time by 50%.",
      tech: ["Python","Machine Learning","NLP","Speech-to-Text","Text-to-Speech","Django"],
      githubUrl: null, liveDemoUrl: null
    }
  ],
  education: [
    { degree: "B.Tech — Computer Science Engineering (Data Science)", institution: "Narasimha Reddy Engineering College", period: "2022 – 2026" },
    { degree: "Intermediate", institution: "Sri Sai Vikas Junior College", period: "2020 – 2022" },
    { degree: "Secondary School Certificate", institution: "Om Sai Vikas Vidyaniketan", period: "2019 – 2020" }
  ],
  certifications: [
    { id:"cert-lumen-web", title:"Lumen Technologies", name:"HTML5 with JavaScript & CSS3: Advanced HTML5 & CSS3",          org:"Lumen Technologies",                             date:"March 1, 2026",       badge:"completion",   badgeLabel:"Certificate of Completion", img:"public/assets/cert-lumen-html-js-css.png" },
    { id:"cert-tata",    title:"Tata Forage",        name:"Data Visualisation: Empowering Business with Effective Insights", org:"Tata Group & Forage",                            date:"June 7, 2025",       badge:"completion",   badgeLabel:"Certificate of Completion", img:"public/assets/cert-tata-forage.png" },
    { id:"cert-databricks", title:"Databricks",      name:"Databricks Fundamentals Accreditation",                          org:"Databricks Academy",                             date:"September 2, 2026",  badge:"accreditation", badgeLabel:"Accreditation",             img:"public/assets/cert-databricks.png" },
    { id:"cert-lumen",   title:"Lumen AI Academy",   name:"Basic Level of the AI Academy Learning Journey",                 org:"India Talent Development Team, Lumen",           date:"July 2026",          badge:"milestone",    badgeLabel:"AI Academy Milestone",      img:"public/assets/cert-lumen.png" },
    { id:"cert-powerbi", title:"OfficeMaster",        name:"PowerBI Workshop — AI-Powered Interactive Dashboards",          org:"OfficeMaster",                                   date:"August 31, 2025",    badge:"workshop",     badgeLabel:"Verified Workshop",         img:"public/assets/cert-powerbi-officemaster.png" },
    { id:"cert-infosys", title:"Infosys Springboard", name:"Basics of Python Course Completion",                            org:"Infosys Limited",                                date:"February 10, 2025",  badge:"verified",     badgeLabel:"Verified Certificate",      img:"public/assets/cert-infosys-python.png" },
    { id:"cert-ybi",     title:"YBI Foundation",      name:"Data Science and Machine Learning Internship Certificate",       org:"YBI Foundation (ISO 9001:2015)",                  date:"July 17, 2025",      badge:"internship",   badgeLabel:"Verified Internship",       img:"public/assets/cert-ybi-foundation.png" },
    { id:"cert-ignite",  title:"IGNITE-2K25",          name:"National Level Project Expo — Predicting Disease",              org:"Narsimha Reddy Engineering College",              date:"February 21, 2025",  badge:"appreciation", badgeLabel:"Certificate of Appreciation",img:"public/assets/cert-ignite-2k25.png" }
  ],
  marqueeItems: ["Generative AI","LLMs","Power BI","Python","SQL","Copilot Studio","Power Automate","AI Agents","Data Analytics","Oracle","GCP","FastAPI"]
};
