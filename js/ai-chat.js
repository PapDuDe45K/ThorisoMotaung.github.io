// ai-chat.js
class AIChat {
    static async handleQuery(query) {
        const chatMessages = document.getElementById('chatMessages');
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.textContent = query;
        chatMessages.appendChild(userMessage);
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-message ai typing';
        typingIndicator.textContent = 'Thinking...';
        chatMessages.appendChild(typingIndicator);
        
        try {
            // Here you would integrate with Cerebras LLM
            // For now, we'll simulate a response
            await this.simulateTyping();
            
            // Remove typing indicator
            typingIndicator.remove();
            
            // Add AI response
            const aiMessage = document.createElement('div');
            aiMessage.className = 'chat-message ai';
            aiMessage.textContent = this.generateResponse(query);
            chatMessages.appendChild(aiMessage);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
        } catch (error) {
            console.error('AI Chat Error:', error);
            typingIndicator.textContent = 'Sorry, I could not process your request.';
        }
    }

    static async simulateTyping() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    static generateResponse(query) {
        // Simple response generation - replace with actual Cerebras LLM integration
        const responses = [
            "I specialize in React and Django development.",
            "I have experience building e-commerce solutions.",
            "I focus on creating scalable and maintainable code.",
            "Let me tell you more about my technical skills."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    static init() {
        const input = document.getElementById('aiChatInput');
        if (input) {
            input.addEventListener('keypress', async (e) => {
                if (e.key === 'Enter' && input.value.trim()) {
                    const query = input.value.trim();
                    input.value = '';
                    await this.handleQuery(query);
                }
            });
        }
    }
}