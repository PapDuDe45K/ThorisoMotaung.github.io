// data.js
const MENU_DATA = {
    main: {
        title: "Professional Portfolio",
        items: [
            { 
                id: 'profile', 
                icon: '👤', 
                text: 'Professional Summary',
                hrNote: 'Career overview & achievements'
            },
            { 
                id: 'projects', 
                icon: '💼', 
                text: 'Live Projects',
                hrNote: 'Production systems & impact'
            },
            { 
                id: 'skills', 
                icon: '🛠️', 
                text: 'Technical Skills',
                hrNote: 'Tools & technologies'
            },
            { 
                id: 'contact', 
                icon: '📞', 
                text: 'Contact',
                hrNote: 'Professional contact details'
            }
        ]
    },

    profile: {
        name: "Thoriso Motaung",
        role: "Full-Stack Developer",
        tagline: "Building scalable solutions with modern technologies",
        professionalSummary: {
            overview: [
                "Full-Stack Developer with 1 year commercial experience",
                "Specializing in web application development and e-commerce solutions",
                "Successfully managing multiple live production systems",
                "Proven track record of delivering high-impact solutions"
            ],
            achievements: [
                "Increased client revenue by 40% through technical solutions",
                "Maintaining two live production systems with 99.9% uptime",
                "Implemented secure payment systems and inventory management",
                "Received distinction for comprehensive management system development"
            ],
            currentWork: {
                role: "Freelance Developer",
                period: "2023 - Present",
                highlights: [
                    "Leading full-stack development of e-commerce platforms",
                    "Managing client relationships and project timelines",
                    "Implementing secure payment integrations",
                    "Optimizing system performance and user experience"
                ]
            },
            education: {
                degree: "Diploma in Information and Communication Technology",
                specialization: "Application Development",
                institution: "Sol Plaatje University",
                period: "2020 - 2023",
                achievements: [
                    "Distinction in Final Year Project - Campus Life System",
                    "Participant in TelkomLearn Hackathon with Geekulcha at SPU 2024",
                    "Former Secretary General of AstroClub",
                    "USSA Field Hockey First Team Player"
                ]
            },
            certifications: [
                {
                    name: "Design Thinking and Business for IT Professionals",
                    issuer: "HP",
                    date: "2023",
                    topics: ["Design Thinking", "Business Analysis", "IT Strategy"]
                }
            ]
        }
    },

    projects: {
        featured: [
            {
                id: "atchaar-guy",
                name: "The Achaar Guy",
                type: "E-commerce Platform",
                timeline: "2023 - Present",
                role: "Lead Developer",
                tech: ["React", "Django", "PostgreSQL"],
                url: "theatchaarguy.netlify.app",
                metrics: [
                    "40% revenue increase",
                    "500+ transactions processed",
                    "99.9% uptime achievement"
                ],
                responsibilities: [
                    "Full-stack development",
                    "Payment integration",
                    "Database optimization",
                    "UI/UX implementation"
                ]
            },
            {
                id: "campus-life",
                name: "Campus Life System",
                type: "Management Platform",
                timeline: "2023",
                role: "Full-Stack Developer",
                tech: ["Java", "Spring Boot", "MySQL"],
                metrics: [
                    "Distinction grade achievement",
                    "Multi-database integration",
                    "Improved service delivery"
                ],
                responsibilities: [
                    "System architecture",
                    "Database design",
                    "API development",
                    "User authentication"
                ]
            }
        ]
    },

    skills: {
        technical: {
            frontend: [
                { name: "React", level: 4, projects: 2, focus: "State management, hooks" },
                { name: "JavaScript", level: 4, projects: 3, focus: "ES6+, async" },
                { name: "HTML/CSS", level: 4, projects: 3, focus: "Responsive design" }
            ],
            backend: [
                { name: "Django", level: 4, projects: 2, focus: "REST APIs" },
                { name: "Python", level: 4, projects: 2, focus: "Web development" },
                { name: "Java", level: 3, projects: 1, focus: "Spring Boot" }
            ],
            database: [
                { name: "PostgreSQL", level: 3, projects: 2, focus: "Performance" },
                { name: "MySQL", level: 3, projects: 1, focus: "Design" }
            ],
            tools: [
                { name: "Git", level: 4, projects: "All", focus: "Version control" },
                { name: "VS Code", level: 4, projects: "All", focus: "Development" },
                { name: "Docker", level: 2, projects: 1, focus: "Containerization" }
            ]
        },
        soft: [
            "Problem Solving",
            "Team Collaboration",
            "Project Management",
            "Communication"
        ]
    },

    contact: {
        professional: {
            email: "thoriso2motaung@gmail.com",
            phone: "+27 60 4747 128",
            location: "Kimberley, South Africa"
        },
        social: {
            github: {
                url: "https://github.com/PapDuDe45K",
                highlights: ["Project repositories", "Code samples"]
            },
            linkedin: {
                url: "https://www.linkedin.com/in/thorisomotaung/",
                highlights: ["Professional network", "Career updates"]
            }
        },
        availability: {
            status: "Open to opportunities",
            preferredRoles: ["Full-Stack Developer", "Frontend Developer", "Backend Developer"],
            relocation: "Yes"
        }
    }
};

// Helper functions
const DataHelper = {
    getSection(sectionId) {
        return MENU_DATA[sectionId] || null;
    },

    getMenuItems() {
        return MENU_DATA.main.items || [];
    },

    getProjectById(projectId) {
        return MENU_DATA.projects.featured.find(p => p.id === projectId);
    },

    getSkillsByCategory(category) {
        return MENU_DATA.skills.technical[category] || [];
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MENU_DATA, DataHelper };
}