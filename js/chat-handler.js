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
                            content: "You are an AI assistant answering questions about Thoriso's work and experience as a Full Stack Developer specializing in React and Django."
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