// js/chat-handler.js
class ChatHandler {
    static async callCerebrasLLM(message) {
        try {
            const response = await fetch(`${CONFIG.CEREBRAS_BASE_URL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.CEREBRAS_API_KEY}`
                },
                body: JSON.stringify({
                    model: CONFIG.CEREBRAS_MODEL,
                    messages: [
                        {
                            role: "system",
                            content: `You are an AI assistant with complete knowledge about Thoriso Motaung.
                        Here is his background:
                        - Full Stack Developer specializing in React and Django
                        - 1+ year commercial experience in e-commerce
                        - Education: Diploma in Information and Communication Technology from Sol Plaatje University (2020-2023)
                        - Current Role: Freelance Developer (2023-Present)
                        - Key Projects: 
                          * The Achaar Guy (E-commerce Platform) - Increased revenue by 40%
                          * Campus Life System (Management Platform) - Received distinction
                        - Technical Skills:
                          * Frontend: React, JavaScript, HTML/CSS
                          * Backend: Django, Python, Java
                          * Database: PostgreSQL, MySQL
                        - Achievements:
                          * Increased client revenue by 40% through technical solutions
                          * Maintaining systems with 99.9% uptime
                          * Design Thinking certification from HP
                        
                                Information and Communication Technology graduate with expertise in Application Development and
System Integration. Proven track record in delivering client-focused web solutions and managing complex
technical projects. Skilled in full-stack development, data analysis, and agile methodologies.
Languages & Frameworks:
• Programming: Java, Python
• Web Development: React.js, Django,
Vue.js, Node.js
• Database Management: MySQL,
PostgreSQL
Development Tools:
• Version Control: GitHub
• IDEs: NetBeans, Android Studio, VS
Code
• Data Science: Jupyter Notebooks
Core Competencies:
• Full Stack Development
• Database Management
• Project Management
• Technical Documentation
• Team Leadership
Campus Life System | Developer | 2023
• Developed comprehensive campus data management system
•Developed a centralised processing system for streamlined student services
• Achieved distinction for exceptional project implementation
• Enhanced user experience through optimized service delivery workflows
Diploma in Information and Communication
Technology (App Development)
Certifications
Freelance Web Developer | Independent | 2023 - Present
Specialization: Application Development
Key Coursework: Software Engineering, Data
Analysis, Programming, Networking
• Secretary General - SPU AstroClub
• USSA Field Hockey First Team Player
• Technical Community Participant - Geekulcha
• Design Thinking and Business for IT Professionals - HP
• TelkomLearn Hackathon Participant - Geekulcha at
SPU 2024
• Developed and maintain multiple client websites, including e-commerce solutions
• Built responsive web platform (theatchaarguy.netlify.app) using modern frameworks
• Implemented user-centric design principles and optimization techniques
• Managed client relationships and project deliverables
2023 - Present
PROFESSIONAL SUMMARY
060 4747 128 · thorisomotaung.netlify.app · 10 Bean Str , Kimberly , 8300
Thoriso Motaung
PROFESSIONAL EXPERIENCE
EDUCATION & CERTIFICATIONS
LEADERSHIP & ACTIVITIES
TECHNICAL SKILLS
SIGNIFICANT PROJECTS
Sol Plaatje University, 2024



                        Please provide accurate information based on this background when answering questions.`
                    },
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static addMessage(text, type, isLoading = false) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type} ${isLoading ? 'loading' : ''}`;
        
        if (isLoading) {
            messageDiv.innerHTML = '<div class="loading-dots"><span>.</span><span>.</span><span>.</span></div>';
        } else {
            messageDiv.textContent = text;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return messageDiv;
    }

    static async handleMessage() {
        const input = document.getElementById('aiChatInput');
        
        if (input && input.value.trim()) {
            const userMessage = input.value.trim();
            
            // Add user message
            this.addMessage(userMessage, 'user');
            
            // Add loading message
            const loadingMessage = this.addMessage('', 'assistant', true);
            
            try {
                // Call Cerebras LLM API
                const response = await this.callCerebrasLLM(userMessage);
                
                // Replace loading message with response
                loadingMessage.className = 'message assistant';
                loadingMessage.textContent = response;
            } catch (error) {
                console.error('Error:', error);
                loadingMessage.className = 'message assistant error';
                loadingMessage.textContent = 'Sorry, I encountered an error. Please try again.';
            }
            
            // Clear input
            input.value = '';
            input.focus();
        }
    }

    static init() {
        const input = document.getElementById('aiChatInput');
        const sendButton = document.getElementById('sendButton');

        if (input && sendButton) {
            // Handle Enter key press
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleMessage();
                }
            });

            // Handle button click
            sendButton.addEventListener('click', () => {
                this.handleMessage();
            });
        }
    }
}