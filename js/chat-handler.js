// chat-handler.js
class ChatHandler {
  static async handleMessage() {
    const input = document.getElementById("aiChatInput");
    const messagesContainer = document.getElementById("chatMessages");

    if (input && input.value.trim()) {
      const userMessage = input.value.trim();

      // Add user message
      this.addMessage(userMessage, "user");

      try {
        // Call Cerebras LLM API
        const response = await this.callCerebrasLLM(userMessage);

        // Add AI response
        this.addMessage(response, "assistant");
      } catch (error) {
        console.error("Error:", error);
        this.addMessage(
          "Sorry, I encountered an error. Please try again.",
          "assistant"
        );
      }

      // Clear input
      input.value = "";
      input.focus();
    }
  }

  static async callCerebrasLLM(message) {
    // Replace with your actual Cerebras LLM API endpoint and credentials
    const response = await fetch("YOUR_CEREBRAS_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "YOUR_API_KEY",
      },
      body: JSON.stringify({
        message: message,
        context:
          "You are an AI assistant answering questions about Thoriso's work and experience",
      }),
    });

    const data = await response.json();
    return data.response;
  }

  static addMessage(text, type) {
    const messagesContainer = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;

    if (
      type === "assistant" &&
      !text.includes("Sorry, I encountered an error")
    ) {
      messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
    } else {
      messageDiv.textContent = text;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}
