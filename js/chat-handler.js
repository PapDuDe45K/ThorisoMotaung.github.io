class ChatHandler {
    static init() {
        this.setupEventListeners();
    }

    static setupEventListeners() {
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

    static handleMessage() {
        const input = document.getElementById('aiChatInput');
        const messagesContainer = document.getElementById('chatMessages');
        
        if (input && input.value.trim()) {
            // Add user message
            this.addMessage(input.value, 'user');
            
            // Simulate AI response
            this.simulateResponse(input.value);
            
            // Clear input
            input.value = '';
            input.focus();
        }
    }

    static addMessage(text, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    static async simulateResponse(query) {
        // Add typing indicator
        this.addMessage('...', 'assistant typing');
        
        // Simulate thinking time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Remove typing indicator
        const typingMessage = document.querySelector('.typing');
        if (typingMessage) {
            typingMessage.remove();
        }

        // Add AI response
        const response = this.generateResponse(query);
        this.addMessage(response, 'assistant');
    }

    static generateResponse(query) {
        // Simple response generation - replace with actual AI integration
        const responses = [
            "I specialize in React and Django development.",
            "I have experience building e-commerce solutions.",
            "I focus on creating scalable and maintainable code.",
            "Let me tell you more about my technical skills.",
            "I've worked on several production systems with high uptime.",
            "My approach combines modern tech with reliable architecture."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}